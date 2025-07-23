# Cutty Agent Integration Guide

## Overview

This document provides the integration specifications for connecting the main Cutty application (list-cutter) with the Cutty Agent service. The agent is deployed as a separate Cloudflare Worker service and communicates with the Cutty frontend via HTTP/SSE.

## Current Status

- **Agent Repository**: `github.com/emily-flambe/cutty-agent`
- **Agent Deployment**: Ready for deployment to `cutty-agent.emily-cogsdill.workers.dev`
- **Development URL**: `http://localhost:8789` (Wrangler dev server)
- **AI Model**: Anthropic Claude 3.5 Sonnet
- **Tools Implemented**: 
  - `getSupportedStates` - Returns supported US states for data generation
  - `explainFeature` - Explains Cutty app features (requires confirmation)

## Integration Points

### 1. Environment Configuration

Add the following to the main Cutty app's environment variables:

#### Development (.dev.vars)
```env
# Enable agent integration
AGENT_ENABLED=true

# Agent service URL (single worker for PoC)
AGENT_URL=http://localhost:8789
```

#### Frontend Environment (.env)
```env
VITE_AGENT_ENABLED=true
VITE_AGENT_URL=http://localhost:8789
```

### 2. Frontend Integration

Update `app/frontend/src/components/ChatBot.jsx`:

```javascript
// Add at the top of the component
const chatEndpoint = import.meta.env.VITE_AGENT_ENABLED === 'true'
  ? `${import.meta.env.VITE_AGENT_URL}/api/chat`
  : '/api/v1/chat';

// Update the fetch call to use chatEndpoint
const response = await fetch(chatEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Include auth token if available
    ...(authToken && { 'Authorization': `Bearer ${authToken}` })
  },
  body: JSON.stringify({ message: userMessage }),
});
```

### 3. API Endpoints

The agent provides the following endpoints:

#### Health Check
```
GET /health
Response: {
  "status": "healthy",
  "agent": "CuttyAgent",
  "version": "0.1.0",
  "timestamp": "2025-01-23T02:42:01.674Z"
}
```

#### API Key Check
```
GET /check-api-key
Response: {
  "success": true
}
```

#### Chat Endpoint
```
POST /api/chat
Content-Type: application/json

Request: {
  "message": "What states do you support?",
  "sessionId": "optional-session-id"
}

Response: Server-Sent Events stream
```

### 4. Tool Integration

The agent implements tools that can be triggered by user messages:

#### getSupportedStates Tool
- **Trigger**: "What states do you support?"
- **Response**: Lists CA, FL, GA, IL, NY, OH, PA, TX
- **Auto-executes**: No confirmation required

#### explainFeature Tool
- **Trigger**: "Explain [feature name]"
- **Features**: list generation, data export, team collaboration, api access
- **Requires confirmation**: Yes (UI will show confirmation dialog)

### 5. CORS Configuration

The agent is configured to accept requests from:
- `http://localhost:8789` (local development)
- `http://localhost:5173` (Vite frontend dev server)
- `https://cutty-dev.emilycogsdill.com` (staging)
- `https://cutty.emilycogsdill.com` (production)

CORS is handled in the agent's middleware, no changes needed in the main app.

## Single Environment Note

This proof of concept uses a single deployment environment (cutty-agent) without separate dev/staging/prod configurations to keep things simple. The worker runs on port 8789 locally and deploys directly to the production URL.

## Implementation Steps

### Phase 1: Local Development Integration (Week 1)

1. **Main App Setup**:
   ```bash
   # In list-cutter repository
   echo "AGENT_ENABLED=true" >> .dev.vars
   echo "AGENT_URL=http://localhost:8789" >> .dev.vars
   echo "VITE_AGENT_ENABLED=true" >> .env
   echo "VITE_AGENT_URL=http://localhost:8789" >> .env
   ```

2. **Update ChatBot Component**:
   - Modify endpoint selection logic (3 lines)
   - Add conditional headers for auth token
   - No other changes required

3. **Test Local Integration**:
   ```bash
   # Terminal 1: Run agent
   cd cutty-agent && npm start
   
   # Terminal 2: Run main app
   cd list-cutter && make dev
   ```

### Phase 2: Deployed Agent Testing (Week 2)

1. **Deploy Agent**:
   ```bash
   cd cutty-agent
   npm run deploy
   # Creates: https://cutty-agent.emily-cogsdill.workers.dev
   ```

2. **Update Main App Config**:
   ```env
   AGENT_URL=https://cutty-agent.emily-cogsdill.workers.dev
   VITE_AGENT_URL=https://cutty-agent.emily-cogsdill.workers.dev
   ```

3. **Test Production-like Setup**:
   - Verify CORS works with deployed agent
   - Test tool execution across services
   - Monitor response times

### Phase 3: Feature Flag Rollout (Week 3)

1. **Add Feature Toggle UI** (optional):
   ```javascript
   // In settings or admin panel
   const toggleAgent = () => {
     localStorage.setItem('useAgent', !useAgent);
     window.location.reload();
   };
   ```

2. **Gradual Rollout**:
   - Start with internal testing
   - Enable for beta users
   - Full rollout after validation

## Testing Checklist

### Basic Connectivity
- [ ] Agent health check returns 200 OK
- [ ] Chat messages reach agent
- [ ] Responses display in UI
- [ ] No CORS errors in console

### Tool Execution
- [ ] "What states do you support?" triggers tool
- [ ] Tool response displays correctly
- [ ] Confirmation UI works for explainFeature
- [ ] Tool errors handled gracefully

### Integration Points
- [ ] Environment variables load correctly
- [ ] Feature flag enables/disables agent
- [ ] Fallback to Workers AI works
- [ ] Auth token passed through (if implemented)

## Monitoring & Debugging

### Agent Logs
```bash
# View real-time logs
cd cutty-agent
npm run logs  # Single environment logs
```

### Debug Mode
The agent includes debug logging that shows:
- Incoming requests
- Tool execution
- Response streaming
- Error details

### Common Issues

1. **CORS Errors**:
   - Check agent is running
   - Verify URL in environment variables
   - Ensure origin is in allowed list

2. **Connection Timeouts**:
   - Check Anthropic API key is set
   - Verify agent deployment status
   - Check network connectivity

3. **Tool Not Executing**:
   - Verify exact trigger phrase
   - Check tool registration in agent
   - Review agent logs for errors

## Performance Considerations

- **Cold Starts**: First request may take 2-3s
- **Streaming**: Responses stream in real-time
- **Tool Execution**: Adds <500ms latency
- **Durable Objects**: Maintain conversation state

## Security Notes

- Agent accepts any origin in development
- Production should validate auth tokens
- No sensitive data stored in PoC
- Tool execution is read-only

## Future Enhancements

Once PoC is validated:

1. **Authentication Integration**:
   - Pass JWT tokens from main app
   - Validate user context in agent
   - Scope tools to user permissions

2. **Additional Tools**:
   - List management actions
   - Data export triggers
   - Report generation
   - User preferences

3. **Persistence**:
   - Conversation history
   - User preferences
   - Tool execution logs

4. **Advanced Features**:
   - Multi-turn conversations
   - Context awareness
   - Proactive suggestions
   - Batch operations

## Rollback Plan

If agent integration fails:

1. Set `AGENT_ENABLED=false`
2. Restart main application
3. Falls back to Workers AI automatically
4. No data migration needed
5. Agent can be shut down independently

## Success Metrics

- [ ] 99%+ uptime over 24 hours
- [ ] <2s response time (first token)
- [ ] Zero impact on existing features
- [ ] Successful tool execution rate >95%
- [ ] No increase in error rates

## Contact & Support

- **Agent Repository**: github.com/emily-flambe/cutty-agent
- **Main App Repository**: github.com/emilycogsdill/list-cutter
- **Documentation**: This file and agent README.md
- **Issues**: Create in respective repositories