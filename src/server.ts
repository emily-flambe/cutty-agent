import { anthropic } from "@ai-sdk/anthropic";
import { routeAgentRequest, type Schedule } from "agents";

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
import { CUTTY_APP_KNOWLEDGE, TOOL_USAGE_GUIDELINES } from "./knowledge/cutty-knowledge";

// import { env } from "cloudflare:workers";

const model = anthropic("claude-3-5-sonnet-20241022");

/**
 * Chat Agent implementation that handles real-time AI chat interactions
 */
export class Chat extends AIChatAgent<Env> {
  private sessionStateManager!: SessionStateManager;
  /**
   * Handles WebSocket messages from the frontend
   * Overrides the default onMessage to support custom message format
   */
  async onMessage(connection: Connection, message: WSMessage): Promise<void> {
    if (typeof message === "string") {
      let data: { message?: string; context?: any };
      try {
        data = JSON.parse(message);
      } catch (_error) {
        console.error("Failed to parse WebSocket message:", _error);
        return;
      }

      // Handle the frontend's message format
      if (data.message) {
        console.log(
          `[WebSocket] Received message from frontend: ${data.message}`
        );
        console.log(`[WebSocket] Context:`, data.context);

        // Convert frontend format to agent format
        const messageId = generateId();
        const agentMessage = {
          id: messageId,
          init: {
            body: JSON.stringify({
              messages: [
                ...this.messages,
                {
                  content: data.message,
                  createdAt: new Date(),
                  id: generateId(),
                  metadata: data.context || {},
                  role: "user",
                },
              ],
            }),
            method: "POST",
          },
          type: "cf_agent_use_chat_request",
        };

        console.log(
          `[WebSocket] Converting to agent format with ID: ${messageId}`
        );

        // Call the parent's onMessage with the converted format
        return super.onMessage(connection, JSON.stringify(agentMessage));
      }

      // For other message types, delegate to parent
      console.log(`[WebSocket] Delegating message to parent handler:`, data);
      return super.onMessage(connection, message);
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
            onFinish(
              args as Parameters<StreamTextOnFinishCallback<ToolSet>>[0]
            );
            // await this.mcp.closeConnection(mcpConnection.id);
          },
          system: `You are Cutty the Cuttlefish! Your brave little helper, ready to cut through any data confusion!

Keep responses short (1-2 sentences) but maintain an upbeat, friendly attitude. You're their best friend who will never abandon them!

IMPORTANT: NEVER mention patients, healthcare, medical, or health-related terms. You work with synthetic data records only.

## YOUR KNOWLEDGE BASE
${CUTTY_APP_KNOWLEDGE}

## TOOL USAGE GUIDELINES
${TOOL_USAGE_GUIDELINES}

## CRITICAL INSTRUCTION - READ FIRST
DO NOT use the explainFeature tool for general questions! You have comprehensive knowledge about Cutty built into your system. Only use tools when the user explicitly asks for an ACTION.

## RESPONSE STYLE
- Answer questions directly from your knowledge base WITHOUT using tools
- Only use tools for ACTIONS: generate, create, download, or when explicitly listing supported states
- Keep explanations concise (1-2 sentences) unless the user asks for more detail
- Be conversational and friendly

## WHEN TO USE TOOLS
✅ USE TOOLS ONLY FOR:
- "Generate [data]" → generateSyntheticData
- "Create [rows]" → generateSyntheticData  
- "Download [file]" → appropriate download tool
- "List supported states" → getSupportedStates (optional, you know them)

❌ DO NOT USE TOOLS FOR:
- "What is Cutty?" → Answer from knowledge
- "What is a CSV?" → Answer from knowledge
- "How does X work?" → Answer from knowledge
- "Explain [feature]" → Answer from knowledge
- Any general questions → Answer from knowledge

## CRITICAL TOOL RULES
- When you call generateSyntheticData, ALWAYS share the download link
- The explainFeature tool is DEPRECATED - use your knowledge instead

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
