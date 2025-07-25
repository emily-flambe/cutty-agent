# Cutty Agent Implementation Details

## Overview

Cutty Agent is a proof-of-concept AI assistant built on Cloudflare's Agents SDK, designed to replace Workers AI with enhanced conversational capabilities. The agent uses Anthropic's Claude 3.5 Sonnet model and supports tool execution with streaming responses.

## Architecture

### Core Components

1. **Agent Worker** (`src/server.ts`)
   - Handles HTTP routing and CORS
   - Manages Durable Object instances
   - Routes WebSocket connections to agent instances

2. **Chat Agent Class** (extends `AIChatAgent`)
   - Maintains conversation state in Durable Objects
   - Processes messages through Agents SDK
   - Executes tool calls
   - Streams responses back to clients

3. **Tool System** (`src/tools.ts`)
   - `getSupportedStates`: Returns list of US states for data generation
   - `explainFeature`: Explains Cutty app features (requires confirmation)
   - `generateSyntheticData`: Generates synthetic patient data (requires confirmation)
   - `createDownloadLink`: Creates download links for generated data files
   - `getSyntheticDataStatus`: Checks generation status

## WebSocket Communication Protocol

### Issue: Frontend-Agent Message Format Mismatch

The Cloudflare Agents SDK expects WebSocket messages in a specific format, which differs from what the frontend currently sends.

#### Current Frontend Format (INCORRECT)

```json
{
  "message": "user's message text",
  "context": {
    "user": "user@email.com",
    "page": "/current/path"
  }
}
```

#### Required Agent Format (CORRECT)

```json
{
  "type": "cf_agent_use_chat_request",
  "id": "unique-request-id",
  "init": {
    "method": "POST",
    "body": "{\"messages\": [{\"id\": \"msg-id\", \"role\": \"user\", \"content\": \"user message\", \"createdAt\": \"ISO-8601-timestamp\", \"metadata\": {...}}]}"
  }
}
```

### Response Format

The agent responds with streaming messages:

```json
{
  "type": "cf_agent_use_chat_response",
  "id": "request-id",
  "body": "encoded-streaming-data",
  "done": false
}
```

The `body` field contains encoded data in formats like:

- `0:"text content"` - Text deltas
- `f:{"messageId":"..."}` - Message metadata
- `9:{"toolCallId":"...","toolName":"...","args":{}}` - Tool calls
- `e:{"finishReason":"stop","usage":{...}}` - Completion data

### Solution Attempted

We attempted to override the `onMessage` method in the Chat class to transform frontend messages to the expected format:

```typescript
async onMessage(connection: Connection, message: WSMessage): Promise<void> {
  if (typeof message === "string") {
    const data = JSON.parse(message);

    // Transform frontend format to agent format
    if (data.message) {
      const agentMessage = {
        type: "cf_agent_use_chat_request",
        id: generateId(),
        init: {
          method: "POST",
          body: JSON.stringify({
            messages: [
              ...this.messages,
              {
                id: generateId(),
                role: "user",
                content: data.message,
                createdAt: new Date(),
                metadata: data.context || {}
              }
            ]
          })
        }
      };

      return super.onMessage(connection, JSON.stringify(agentMessage));
    }
  }
}
```

**Result**: This approach didn't work because the Agents SDK doesn't support overriding the WebSocket message handler in this way.

### Recommended Solution

Update the frontend (list-cutter repo) to send messages in the correct format. See `frontend-websocket-fix.md` for detailed implementation instructions.

## Session Isolation

The agent implements session isolation by rewriting WebSocket paths:

- Frontend connects to: `/agents/chat/default?sessionId=[id]`
- Agent rewrites to: `/agents/chat/[sessionId]`

This ensures each user session has its own Durable Object instance with isolated conversation history.

## Tool Execution Flow

1. User sends a message that triggers tool use
2. Agent identifies required tool and parameters
3. For tools requiring confirmation:
   - Agent sends tool call information to frontend
   - Frontend displays confirmation UI
   - User approves/rejects
   - Frontend sends confirmation back
4. Agent executes approved tools
5. Results are streamed back to frontend

## Environment Variables

Required in `.dev.vars` for local development:

```
ANTHROPIC_API_KEY=your-api-key
```

## Deployment

- Local development: `npm run dev` (port 8789)
- Production: `npm run deploy`
- Logs: `npm run logs`

## Known Issues

1. **WebSocket Message Format**: Frontend must be updated to send messages in the correct format
2. **Tool Confirmation Flow**: Not yet implemented in frontend
3. **Session Persistence**: Conversations are stored in Durable Objects but not persisted long-term

## Testing

Use the provided test scripts to verify WebSocket connectivity:

- Direct agent format test: Shows the agent works correctly with proper message format
- Frontend format test: Demonstrates the current incompatibility

## Next Steps

1. Update frontend to use correct WebSocket message format
2. Implement tool confirmation UI in frontend
3. Add persistent storage for conversation history
4. Enhance error handling and recovery
5. Add authentication and authorization
