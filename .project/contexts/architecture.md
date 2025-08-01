# Cutty Agent Architecture

## System Overview

Cutty Agent is built on Cloudflare's edge computing platform using the Agents SDK, which provides a framework for building conversational AI applications with tool execution capabilities.

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│  Cutty Frontend │────▶│  Cloudflare Edge │────▶│   OpenAI API   │
│   (React App)   │◀────│  (Agent Worker)  │◀────│    (GPT-4o)    │
└─────────────────┘     └──────────────────┘     └────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │ Durable Objects  │
                        │ (State Storage)  │
                        └──────────────────┘
```

## Core Components

### 1. Agent Worker (src/server.ts)

- Main entry point for all requests
- Handles HTTP routing and CORS
- Manages Durable Object instances
- Streams responses back to client

### 2. Chat Agent (Durable Object)

- Maintains conversation state
- Processes messages through Agents SDK
- Executes tool calls
- Manages streaming responses

### 3. Tool System (src/tools.ts)

- Defines available actions
- Implements tool execution logic
- Handles confirmation flow for sensitive actions

### 4. Middleware (src/middleware.ts)

- CORS header management
- Request/response processing
- Error handling

## Request Flow

1. **Client Request**: Frontend sends POST to `/api/chat`
2. **CORS Validation**: Middleware checks origin
3. **DO Routing**: Worker routes to appropriate Durable Object
4. **Message Processing**: Agent SDK processes with Claude 3.5 Sonnet
5. **Tool Execution**: If needed, executes defined tools
6. **Stream Response**: Sends back streaming SSE response

## State Management

- **Conversation History**: Stored in Durable Object memory
- **Session Persistence**: Maintained across requests via DO ID
- **Tool State**: Tracked within conversation context

## Integration Points

### With Cutty Frontend

- RESTful API endpoints
- Server-Sent Events for streaming
- CORS headers for cross-origin requests

### With Main Cutty App

- Health check endpoint for monitoring
- Potential future: Direct API calls to Cutty backend
- Shared authentication (future enhancement)

## Deployment Architecture

- **Single Environment**: This PoC uses one deployment environment
- **Local Development**: Wrangler dev server on port 8789
- **Deployed URL**: cutty-agent.emily-cogsdill.workers.dev

## Security Considerations

- API key management via environment variables
- CORS restrictions to allowed origins
- Tool execution requires explicit definitions
- No direct database access (PoC limitation)
