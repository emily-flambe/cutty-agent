# API Agreements

## Overview

The Cutty Agent uses the Cloudflare Agents SDK to provide AI chat capabilities via WebSocket connections. Each chat session is isolated using unique session IDs embedded in the URL path.

## Base URL

- Development: `http://localhost:8789`
- Production: `https://cutty-agent.emilycogsdill.com`

## Authentication

Currently no authentication required. API key validation is handled server-side via the `ANTHROPIC_API_KEY` environment variable.

## Chat API Endpoints

### WebSocket: `/agents/chat/{sessionId}`

**Purpose**: Establish real-time bidirectional chat communication

**Protocol**: WebSocket (ws://) or Secure WebSocket (wss://)

**URL Parameters**:
- `sessionId` (required): Unique session identifier (e.g., `session-1753321096402-i1x6y789r`)

**Connection Example**:
```javascript
const ws = new WebSocket('ws://localhost:8789/agents/chat/session-123-abc');
```

**Message Format**: 
The Cloudflare Agents SDK handles message serialization. Messages are sent as JSON-encoded data streams with automatic handling of:
- Text responses
- Tool invocations
- Tool results
- Error messages

**Session Isolation**: Each `sessionId` connects to its own Durable Object instance (`Chat:{sessionId}`), ensuring complete conversation isolation.

### GET `/agents/chat/{sessionId}/get-messages`

**Purpose**: Retrieve chat message history for a specific session

**URL Parameters**:
- `sessionId` (required): The session identifier

**Response**: JSON array of messages for the session

```json
[
  {
    "id": "msg-123",
    "role": "user",
    "content": "Hello",
    "createdAt": "2025-01-24T10:00:00Z"
  },
  {
    "id": "msg-124", 
    "role": "assistant",
    "content": "Hello! I'm Cutty the Cuttlefish...",
    "createdAt": "2025-01-24T10:00:01Z"
  }
]
```

### GET `/check-api-key`

**Purpose**: Verify that the Anthropic API key is configured

**Response**:

```json
{
  "success": true  // or false if not configured
}
```

## Available Tools

The agent has access to the following tools that can be invoked during conversations:

### getSupportedStates

**Description**: Returns list of US states supported for synthetic data generation

**Parameters**: None (empty object `{}`)

**Execution**: Immediate (no confirmation required)

**Returns**:

```typescript
{
  success: boolean;
  states: string[];     // Array of state codes: ["CA", "FL", "GA", "IL", "NY", "OH", "PA", "TX"]
  count: number;        // Total count of supported states (currently 8)
  message: string;      // Human-readable message
}
```

**Example Response**:
```json
{
  "success": true,
  "states": ["CA", "FL", "GA", "IL", "NY", "OH", "PA", "TX"],
  "count": 8,
  "message": "I can help generate data for 8 US states: CA, FL, GA, IL, NY, OH, PA, TX"
}
```

### explainFeature

**Description**: Provides detailed explanation of a Cutty app feature

**Parameters**:

```typescript
{
  feature: string; // Name of the feature to explain
}
```

**Execution**: Requires user confirmation before execution (human-in-the-loop)

**Returns** (after confirmation):

```typescript
{
  feature: string;           // The feature name that was explained
  explanation: string;       // Detailed explanation of the feature
  relatedFeatures: string[]; // Array of related feature names
}
```

**Supported Features**:
- "list generation"
- "data export" 
- "team collaboration"
- "api access"

## Session Management

### Session ID Format
- Pattern: `session-{timestamp}-{random}`
- Example: `session-1753321096402-i1x6y789r`
- Storage: Client should use `sessionStorage` or similar for tab-specific sessions

### Session Lifecycle
1. Client generates session ID on first load
2. Session ID is included in all API calls via URL path
3. Each session maintains independent conversation history
4. Sessions persist in Durable Objects until explicitly cleared

### Best Practices
- Generate session ID once per tab/window
- Store in `sessionStorage` for tab isolation
- Include session ID in all agent API calls
- Consider implementing session expiration for production

## Integration Examples

### JavaScript/TypeScript Integration

```typescript
// Generate session ID
const generateSessionId = () => {
  const existing = sessionStorage.getItem('cutty-session-id');
  if (existing) return existing;
  
  const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('cutty-session-id', id);
  return id;
};

// Connect to agent
const sessionId = generateSessionId();
const ws = new WebSocket(`ws://localhost:8789/agents/chat/${sessionId}`);

// Handle messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Process agent responses
};

// Send message
ws.send(JSON.stringify({
  message: "What states do you support?",
  // Additional metadata as needed
}));
```

## Error Handling

The Cloudflare Agents SDK handles errors internally and returns them through the WebSocket connection. Common scenarios:

- **Invalid session**: Agent creates new session automatically
- **Connection lost**: Client should implement reconnection logic
- **Tool errors**: Returned as error messages in the chat stream
- **API key missing**: Check via `/check-api-key` before connecting

## Environment Configuration

Required environment variables (set in `.dev.vars` for local development):

```
ANTHROPIC_API_KEY=your-api-key-here
```

Optional configuration:
- `ENABLE_TOOLS`: Enable/disable tool usage
- `DEBUG_MODE`: Enable debug logging
- `ALLOWED_ORIGINS`: CORS allowed origins (if implemented)

## Notes

- The agent uses Cloudflare Durable Objects for state persistence
- Each session is completely isolated from others
- The WebSocket connection handles streaming responses automatically
- Tool confirmations are handled through the Agents SDK UI components
