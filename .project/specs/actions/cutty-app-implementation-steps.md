# Cutty App Implementation Steps for Agent Actions

## Overview

Steps required in the main Cutty application (~/Documents/GitHub/list-cutter) to enable the chat agent to perform synthetic data generation actions.

## Required Backend Changes

### 1. WebSocket Proxy Enhancement

**Location**: `cloudflare/workers/src/api/agent.js`

- Ensure WebSocket proxy properly forwards all messages between frontend and agent
- Add session ID validation
- Handle connection errors gracefully

### 2. CORS Configuration

**Location**: `cloudflare/workers/src/middleware/cors.js`

Add the agent domain to allowed origins:

```javascript
allowedOrigins.push(
  "https://cutty-agent.emilycogsdill.com",
  "https://cutty-agent.emily-cogsdill.workers.dev"
);
```

### 3. Synthetic Data API Endpoints

**Location**: `cloudflare/workers/src/api/synthetic-data.js`

Ensure these endpoints are implemented and accessible:

- `GET /api/v1/synthetic-data/supported-states`
- `POST /api/v1/synthetic-data/generate`
- `GET /api/v1/synthetic-data/download/{fileId}`

### 4. Anonymous File Access

**Location**: `cloudflare/workers/src/api/synthetic-data.js`

- Implement temporary file storage for anonymous users
- Add file cleanup after 24 hours
- Ensure download links work without authentication

## Required Frontend Changes

### 1. ChatBot Component Updates

**Location**: `src/components/chat/ChatBot.jsx`

- Handle tool confirmation responses from agent
- Display download links when synthetic data is generated
- Show generation progress indicators

### 2. WebSocket Message Handling

**Location**: `src/components/chat/ChatBot.jsx`

Add handlers for new message types:

- Tool execution requests
- Download link messages
- Error messages from failed generations

### 3. UI Enhancements

**Location**: `src/components/chat/ChatBot.jsx`

- Add visual indicators for pending tool executions
- Style download links appropriately
- Add file size and record count display

## Testing Requirements

### 1. End-to-End Testing

- Test synthetic data generation through chat
- Verify download functionality
- Test error cases (invalid states, network failures)

### 2. Session Isolation

- Verify each browser tab maintains separate conversation
- Test that generated files are tied to correct session

### 3. Performance Testing

- Test with various record counts (1-1000)
- Verify response times are acceptable
- Monitor memory usage for large generations

## Deployment Steps

1. Deploy backend changes first
2. Test API endpoints independently
3. Deploy frontend changes
4. Test full integration with agent
5. Monitor error logs for first 24 hours

## Security Considerations

1. **Rate Limiting**: Implement per-session rate limits for synthetic data generation
2. **File Size Limits**: Cap maximum records at 1000 for anonymous users
3. **Input Validation**: Validate all parameters before passing to generation service
4. **CORS**: Ensure only authorized domains can access APIs

## Rollback Plan

If issues occur:

1. Revert frontend to disconnect agent integration
2. Keep backend APIs active (they're isolated)
3. Debug issues offline
4. Re-deploy with fixes
