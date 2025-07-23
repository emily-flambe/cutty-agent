# API Agreements

## Chat API

### POST /api/chat

**Purpose**: Send a message to the AI agent and receive a streaming response

**Request**:

```typescript
{
  message: string;        // User's message
  sessionId?: string;     // Optional session ID for conversation continuity
}
```

**Response**: Server-Sent Events stream

```
data: {"type":"message","content":"Hello! I'm Cutty..."}
data: {"type":"tool_call","tool":"getSupportedStates","args":{}}
data: {"type":"tool_result","result":{"success":true,"states":[...]}}
data: {"type":"done"}
```

**Headers**:

- `Content-Type: text/event-stream`
- CORS headers for allowed origins

### GET /health

**Purpose**: Check agent service health

**Response**:

```json
{
  "status": "healthy",
  "agent": "CuttyAgent",
  "version": "0.1.0",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Tool Contracts

### getSupportedStates

**Description**: Returns list of US states supported for synthetic data generation

**Parameters**: None

**Returns**:

```typescript
{
  success: boolean;
  states: string[];     // Array of state codes (e.g., ["CA", "TX"])
  count: number;        // Total count of supported states
  message: string;      // Human-readable message
}
```

### explainFeature (Requires Confirmation)

**Description**: Provides detailed explanation of a Cutty app feature

**Parameters**:

```typescript
{
  feature: string; // Name of the feature to explain
}
```

**Returns**: Confirmation required before execution

## CORS Policy

**Allowed Origins**:

- `http://localhost:5173` (local development)
- `https://cutty-dev.emilycogsdill.com` (staging)
- `https://cutty.emilycogsdill.com` (production)

**Allowed Methods**: GET, POST, OPTIONS

**Allowed Headers**: Content-Type, Authorization

## Error Responses

**Format**:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "status": 400
  }
}
```

**Common Error Codes**:

- `INVALID_REQUEST`: Malformed request data
- `AGENT_ERROR`: Agent processing error
- `TOOL_ERROR`: Tool execution failed
- `RATE_LIMITED`: Too many requests
