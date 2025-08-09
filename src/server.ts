import { anthropic } from "@ai-sdk/anthropic";
import { routeAgentRequest, type Schedule } from "agents";
import { ModeDetector } from "./agent/modeDetector";
import { SIMPLE_CHAT_PROMPT, AGENT_SYSTEM_PROMPT } from "./agent/prompts";
import { 
  type EnhancedMessage, 
  type ResponseMetadata, 
  type LegacyMessage,
  MessageTransform,
  validateMessage,
  generateMessageId 
} from "./websocket/protocol";

import { AIChatAgent } from "agents/ai-chat-agent";
import { unstable_getSchedulePrompt } from "agents/schedule";
import {
  createDataStreamResponse,
  generateId,
  type StreamTextOnFinishCallback,
  streamText,
  type ToolSet,
} from "ai";
import type { Connection, WSMessage } from "partyserver";
import { globalSessionManager } from "./global-session-manager";
import { SessionStateManager } from "./session-state";
import { executions, tools } from "./tools";
import { processToolCalls } from "./utils";

// import { env } from "cloudflare:workers";

const model = anthropic("claude-3-5-sonnet-20241022");
const simpleModel = anthropic("claude-3-haiku-20240307"); // Fast, cost-effective model for simple chat

/**
 * Chat Agent implementation that handles real-time AI chat interactions
 * Supports hybrid mode: simple chat (fast/cheap) and agent mode (full tools)
 */
export class Chat extends AIChatAgent<Env> {
  private sessionStateManager!: SessionStateManager;
  /**
   * Private method to handle simple chat mode
   * Uses a fast model without tools for conversational responses
   */
  private async handleSimpleChat(
    userMessage: string,
    modeAnalysis?: { confidence: number; reason: string }
  ): Promise<{ content: string; metadata: ResponseMetadata }> {
    console.log('[Simple Mode] Processing message with fast model');
    const startTime = Date.now();
    
    const result = await streamText({
      model: simpleModel,
      messages: [
        {
          role: 'system',
          content: SIMPLE_CHAT_PROMPT
        },
        {
          role: 'user', 
          content: userMessage
        }
      ],
      maxTokens: 200 // Keep responses concise
    });

    // Convert streaming result to text
    let content = '';
    for await (const delta of result.textStream) {
      content += delta;
    }

    const endTime = Date.now();

    return {
      content,
      metadata: {
        mode: 'simple',
        confidence: modeAnalysis?.confidence || 0.9,
        modelUsed: 'claude-3-haiku-20240307',
        tokensUsed: result.usage?.totalTokens || 0,
        latency: endTime - startTime,
        reason: modeAnalysis?.reason || 'Simple chat mode selected'
      }
    };
  }

  /**
   * Handles WebSocket messages from the frontend
   * Overrides the default onMessage to support custom message format with enhanced protocol
   */
  async onMessage(connection: Connection, message: WSMessage): Promise<void> {
    if (typeof message === "string") {
      let data: any;
      try {
        data = JSON.parse(message);
      } catch (_error) {
        console.error("Failed to parse WebSocket message:", _error);
        return;
      }

      // Convert legacy message format to enhanced format if needed
      let enhancedMessage: EnhancedMessage;
      
      if (validateMessage(data)) {
        // Already in enhanced format or valid legacy format
        enhancedMessage = data.id ? data : MessageTransform.fromLegacy(data);
      } else if (data.message) {
        // Legacy format - convert to enhanced
        enhancedMessage = MessageTransform.fromLegacy({ 
          message: data.message, 
          context: data.context 
        });
      } else {
        console.error("Invalid message format:", data);
        return;
      }

      console.log(
        `[WebSocket] Received ${enhancedMessage.id ? 'enhanced' : 'legacy'} message: ${enhancedMessage.content}`
      );
      console.log(`[WebSocket] Context:`, enhancedMessage.context);
      
      // Check for mode hints in the message
      const { cleanContent, preferredMode, forceMode } = MessageTransform.extractModeHints(
        enhancedMessage.content
      );
      
      // Update message with clean content and mode hints
      if (cleanContent !== enhancedMessage.content) {
        enhancedMessage.content = cleanContent;
        enhancedMessage.preferredMode = preferredMode;
        enhancedMessage.forceMode = forceMode;
      }
      
      // Detect mode for this message (unless forced)
      let modeAnalysis;
      if (enhancedMessage.forceMode && enhancedMessage.preferredMode !== 'auto') {
        modeAnalysis = {
          mode: enhancedMessage.preferredMode as 'simple' | 'agent',
          confidence: 1.0,
          reason: `Forced ${enhancedMessage.preferredMode} mode via explicit hint`
        };
      } else {
        modeAnalysis = ModeDetector.analyzeIntent(enhancedMessage.content);
      }
      
      console.log(`[Mode Detection] ${modeAnalysis.mode} mode (confidence: ${modeAnalysis.confidence}) - ${modeAnalysis.reason}`);
      
      // Handle simple chat mode directly for better performance
      if (modeAnalysis.mode === 'simple') {
        console.log('[WebSocket] Using simple chat mode - bypassing agent flow');
        try {
          const response = await this.handleSimpleChat(enhancedMessage.content, modeAnalysis);
          
          // Send enhanced response back to frontend
          const responseMessage = {
            type: 'simple_response',
            id: generateMessageId(),
            timestamp: Date.now(),
            content: response.content,
            responseMetadata: response.metadata
          };
          
          connection.send(JSON.stringify(responseMessage));
          return;
        } catch (error) {
          console.error('[Simple Mode] Error:', error);
          // Fall back to agent mode on error
          console.log('[WebSocket] Falling back to agent mode due to error');
          
          // Send mode switch notification
          const modeSwitchMessage = {
            type: 'mode_switch',
            id: generateMessageId(),
            timestamp: Date.now(),
            data: {
              from: 'simple',
              to: 'agent',
              reason: 'Simple mode error - falling back to agent mode',
              error: {
                type: 'simple_mode_failure',
                message: error instanceof Error ? error.message : 'Unknown error',
                fallbackUsed: true
              }
            }
          };
          
          connection.send(JSON.stringify(modeSwitchMessage));
        }
      }

      // Agent mode - convert to agent format with enhanced metadata
      const messageId = generateId();
      const agentMessage = {
        id: messageId,
        init: {
          body: JSON.stringify({
            messages: [
              ...this.messages,
              {
                content: enhancedMessage.content,
                createdAt: new Date(),
                id: generateId(),
                metadata: {
                  ...enhancedMessage.context,
                  // Add mode analysis metadata
                  detectedMode: modeAnalysis.mode,
                  modeConfidence: modeAnalysis.confidence,
                  modeReason: modeAnalysis.reason,
                  enhancedProtocol: true,
                  originalId: enhancedMessage.id
                },
                role: "user",
              },
            ],
          }),
          method: "POST",
        },
        type: "cf_agent_use_chat_request",
      };

      console.log(
        `[WebSocket] Converting to agent format with ID: ${messageId} (mode: ${modeAnalysis.mode})`
      );

      // Call the parent's onMessage with the converted format
      return super.onMessage(connection, JSON.stringify(agentMessage));
    }

    // For non-string messages, delegate to parent
    return super.onMessage(connection, message);
  }

  /**
   * Handles incoming chat messages and manages the response stream
   * @param onFinish - Callback function executed when streaming completes
   */

  async onChatMessage(
    onFinish: StreamTextOnFinishCallback<ToolSet>,
    _options?: { abortSignal?: AbortSignal }
  ) {
    // Initialize session state manager if not already done
    if (!this.sessionStateManager) {
      // Extract session ID from the first message metadata or generate a new one
      const sessionId =
        (this.messages[0] as any)?.metadata?.sessionId || generateId();
      this.sessionStateManager = new SessionStateManager(sessionId);
    }

    // Set the current session for tool executions
    const sessionId = this.sessionStateManager.getState().sessionId;
    globalSessionManager.setCurrentSession(sessionId);

    // const mcpConnection = await this.mcp.connect(
    //   "https://path-to-mcp-server/sse"
    // );

    // Collect all tools, including MCP tools
    const allTools = {
      ...tools,
      ...this.mcp.unstable_getAITools(),
    };

    // Create a streaming response that handles both text and tool outputs
    const dataStreamResponse = createDataStreamResponse({
      execute: async (dataStream) => {
        // Process any pending tool calls from previous messages
        // This handles human-in-the-loop confirmations for tools
        const processedMessages = await processToolCalls({
          dataStream,
          executions,
          messages: this.messages,
          tools: allTools,
        });

        // Stream the AI response using Claude
        const result = streamText({
          maxSteps: 10,
          messages: processedMessages,
          model,
          onError: (error) => {
            console.error("Error while streaming:", error);
          },
          onFinish: async (args) => {
            // Add response metadata for agent mode
            const enhancedArgs = {
              ...args,
              responseMetadata: {
                mode: 'agent' as const,
                confidence: 1.0,
                modelUsed: 'claude-3-5-sonnet-20241022',
                tokensUsed: args.usage?.totalTokens || 0,
                toolsUsed: args.toolCalls?.map(call => call.toolName) || [],
                reason: 'Agent mode - full tool capabilities enabled'
              } satisfies ResponseMetadata
            };
            
            onFinish(
              enhancedArgs as Parameters<StreamTextOnFinishCallback<ToolSet>>[0]
            );
            // await this.mcp.closeConnection(mcpConnection.id);
          },
          system: `${AGENT_SYSTEM_PROMPT}

${unstable_getSchedulePrompt({ date: new Date() })}
`,
          tools: allTools,
        });

        // Merge the AI response stream with tool execution outputs
        result.mergeIntoDataStream(dataStream);
      },
    });

    return dataStreamResponse;
  }
  async executeTask(description: string, _task: Schedule<string>) {
    await this.saveMessages([
      ...this.messages,
      {
        content: `Running scheduled task: ${description}`,
        createdAt: new Date(),
        id: generateId(),
        role: "user",
      },
    ]);
  }
}

/**
 * Worker entry point that routes incoming requests to the appropriate handler
 */
export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/check-api-key") {
      const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
      return Response.json({
        success: hasAnthropicKey,
      });
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error(
        "ANTHROPIC_API_KEY is not set, don't forget to set it locally in .dev.vars, and use `wrangler secret bulk .dev.vars` to upload it to production"
      );
    }

    // Extract session ID from URL or headers
    const sessionId =
      url.searchParams.get("sessionId") ||
      request.headers.get("X-Session-Id") ||
      "default-session";

    console.log(
      `[Session Isolation] Request to ${url.pathname} with session ID: ${sessionId}`
    );

    // For all agent routes, we need to handle session-specific routing
    if (url.pathname.startsWith("/agents/")) {
      // Parse the agent path to extract the agent name and ID
      const pathParts = url.pathname.split("/");
      // Format: /agents/{agentName}/{id}/...
      if (pathParts.length >= 4) {
        // const agentName = pathParts[2]; // e.g., "chat"
        const originalId = pathParts[3]; // e.g., "default"

        // Replace the ID in the path with session-specific ID
        if (originalId === "default") {
          pathParts[3] = sessionId;
          const newPath = pathParts.join("/");

          // Create a new request with the modified path
          const modifiedUrl = new URL(request.url);
          modifiedUrl.pathname = newPath;

          console.log(
            `[Session Isolation] Rewriting path from ${url.pathname} to ${newPath}`
          );

          const modifiedRequest = new Request(modifiedUrl.toString(), request);

          return (
            (await routeAgentRequest(modifiedRequest, env)) ||
            new Response("Not found", { status: 404 })
          );
        }
      }
    }

    return (
      // Route the request to our agent or return 404 if not found
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
