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
import { executions, tools } from "./tools";
import { processToolCalls } from "./utils";

// import { env } from "cloudflare:workers";

const model = anthropic("claude-3-5-sonnet-20241022");

/**
 * Chat Agent implementation that handles real-time AI chat interactions
 */
export class Chat extends AIChatAgent<Env> {
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

      // Log unknown message types for debugging
      console.log(`[WebSocket] Unknown message type received:`, data);

      // For other message types, delegate to parent
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
          system: `You are Cutty the Cuttlefish, a friendly AI assistant for the Cutty app.
You help users understand the app and can execute certain actions on their behalf.

Your personality:
- You're a cheerful cuttlefish who loves organizing data
- You use ocean-related metaphors occasionally (but don't overdo it)
- You're professional but friendly

Currently, you can:
- Answer questions about the Cutty app
- List the states supported for synthetic data generation (via tool)
- Help users understand app features

Always be helpful and clear in your responses.

${unstable_getSchedulePrompt({ date: new Date() })}

If the user asks to schedule a task, use the schedule tool to schedule the task.
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
