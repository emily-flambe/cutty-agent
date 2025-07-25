# Session Isolation Implementation

This document describes the session isolation implementation for the Cutty Agent, allowing multiple independent chat sessions.

## Overview

Each browser tab or instance gets its own isolated chat session, preventing conversations from bleeding between different users or tabs.

## Implementation Details

### 1. Client-Side Session ID Generation

- Each browser tab generates a unique session ID on mount
- Format: `session-{timestamp}-{random-string}`
- Session ID is stored in React state (not localStorage) to ensure tab isolation

### 2. Request Interception

- Client intercepts all fetch requests to `/api/agent/*` endpoints
- Automatically appends `sessionId` query parameter to these requests
- No changes needed to the agents SDK usage

### 3. Server-Side Routing

- Server extracts session ID from query parameters or headers
- For agent API calls, creates a session-specific Durable Object environment
- Each session ID maps to its own Durable Object instance

### 4. Durable Object Isolation

- Session ID is prefixed to all Durable Object IDs
- Format: `{sessionId}-{original-id}`
- Ensures complete data isolation between sessions

## Usage

### For Development

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open multiple browser tabs/windows
3. Each tab will have its own isolated chat session

### For Testing

Use the provided test file:

```bash
open test-session-isolation.html
```

This opens two chat instances side-by-side for easy testing.

## API

### Query Parameters

- `sessionId`: Unique identifier for the chat session

### Headers (Alternative)

- `X-Session-Id`: Can be used instead of query parameter

## Benefits

1. **True Isolation**: Each session has its own Durable Object instance
2. **No Cross-Talk**: Messages in one tab don't appear in others
3. **Persistence**: Each session maintains its own history
4. **Scalability**: Can handle unlimited concurrent sessions

## Debugging

Enable debug mode in the chat UI to see:

- Current session ID (last 8 characters)
- Full message objects including metadata

Server logs show:

- `[Session Isolation] Request to {path} with session ID: {id}`

## Future Improvements

1. Session expiration and cleanup
2. Session sharing via URL
3. Session management UI
4. Analytics per session
