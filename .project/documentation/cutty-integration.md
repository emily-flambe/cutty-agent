# Cutty Agent Integration Guide

## Overview

This document provides the complete integration guide for connecting the main Cutty application (list-cutter) with the Cutty Agent service as a POC chatbot. The agent provides WebSocket-based chat with session isolation.

## Current Status

- **Agent Repository**: `github.com/emily-flambe/cutty-agent`
- **Production URL**: `https://cutty-agent.emilycogsdill.com`
- **AI Model**: Anthropic Claude 3.5 Sonnet
- **Architecture**: WebSocket with Cloudflare Agents SDK
- **Session Management**: Isolated sessions per browser tab
- **Tools Implemented**: 
  - `getSupportedStates` - Returns 8 supported US states
  - `explainFeature` - Explains Cutty features (requires confirmation)

## Key Architecture Differences

### Cutty App (Current)
- **Chat UI**: Existing `ChatBot.jsx` component
- **Current Backend**: External AI service at `https://ai.emilycogsdill.com`
- **API Pattern**: `/api/v1/{domain}/{action}`
- **Tech Stack**: React + MUI + Cloudflare Workers

### Cutty Agent (This Repo)
- **Protocol**: WebSocket (not REST)
- **Endpoints**: `/agents/chat/{sessionId}` 
- **Session Isolation**: Each tab = separate conversation
- **Streaming**: Real-time responses via Cloudflare Agents SDK

## Phase 1: Simple Chatbot POC Integration

### Step 1: Backend Proxy Setup

Create WebSocket proxy in Cutty app backend to forward requests to agent.

In `app/cloudflare/workers/src/api/agent.js`:

```javascript
import { Hono } from 'hono';

const agent = new Hono();

// Proxy WebSocket connections to the agent service
agent.get('/chat/:sessionId', async (c) => {
  const { sessionId } = c.req.param();
  const agentUrl = c.env.CUTTY_AGENT_URL || 'https://cutty-agent.emilycogsdill.com';
  
  // Check for WebSocket upgrade
  const upgradeHeader = c.req.header('Upgrade');
  if (upgradeHeader !== 'websocket') {
    return c.json({ error: 'Expected WebSocket connection' }, 400);
  }
  
  // Forward the WebSocket connection to agent
  const url = new URL(`/agents/chat/${sessionId}`, agentUrl);
  return fetch(url, c.req.raw);
});

// Get message history endpoint
agent.get('/chat/:sessionId/messages', async (c) => {
  const { sessionId } = c.req.param();
  const agentUrl = c.env.CUTTY_AGENT_URL || 'https://cutty-agent.emilycogsdill.com';
  
  const response = await fetch(`${agentUrl}/agents/chat/${sessionId}/get-messages`);
  return c.json(await response.json());
});

// Health check
agent.get('/health', async (c) => {
  const agentUrl = c.env.CUTTY_AGENT_URL || 'https://cutty-agent.emilycogsdill.com';
  
  try {
    const response = await fetch(`${agentUrl}/check-api-key`);
    const data = await response.json();
    
    return c.json({
      status: data.success ? 'healthy' : 'unhealthy',
      agent: 'cutty-agent',
      apiKeyConfigured: data.success
    });
  } catch (error) {
    return c.json({ status: 'error', message: 'Agent unreachable' }, 503);
  }
});

export default agent;
```

Mount the routes in `app/cloudflare/workers/src/index.js`:
```javascript
import agent from './api/agent.js';
// ... other imports

app.route('/api/v1/agent', agent);
```

### Step 2: Environment Configuration

Add to `.dev.vars` in Cutty app:
```bash
# Agent service configuration
CUTTY_AGENT_URL=https://cutty-agent.emilycogsdill.com
CUTTY_AGENT_ENABLED=true
```

For production (Cloudflare dashboard):
```bash
# Same URL for all environments
CUTTY_AGENT_URL=https://cutty-agent.emilycogsdill.com
CUTTY_AGENT_ENABLED=true
```

### Step 3: Create WebSocket Hook

Create `app/frontend/src/hooks/useAgentChat.js`:

```javascript
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAgentChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  
  // Generate unique session ID per tab
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('cutty-chat-session');
    if (existing) return existing;
    
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('cutty-chat-session', id);
    return id;
  });

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
    const wsUrl = `${protocol}//${new URL(baseUrl).host}/api/v1/agent/chat/${sessionId}`;

    console.log('Connecting to agent:', wsUrl);
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('Connected to Cutty Agent');
      setIsConnected(true);
      loadMessageHistory();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleAgentMessage(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      wsRef.current = null;
      
      // Auto-reconnect after 3 seconds
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectTimeoutRef.current = null;
          connect();
        }, 3000);
      }
    };

    wsRef.current = ws;
  }, [sessionId]);

  const loadMessageHistory = async () => {
    try {
      const response = await fetch(`/api/v1/agent/chat/${sessionId}/messages`);
      if (response.ok) {
        const history = await response.json();
        setMessages(history);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const handleAgentMessage = (data) => {
    const message = {
      id: Date.now(),
      role: 'assistant',
      content: data.content || '',
      timestamp: new Date().toISOString(),
      ...data
    };
    
    setMessages(prev => [...prev, message]);
    setIsLoading(false);
  };

  const sendMessage = useCallback((content) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      return;
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Send to agent with context
    wsRef.current.send(JSON.stringify({
      message: content,
      context: {
        user: user?.email,
        page: window.location.pathname
      }
    }));
  }, [user]);

  useEffect(() => {
    connect();
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    messages,
    sendMessage,
    isConnected,
    isLoading,
    sessionId
  };
};
```

### Step 4: Update ChatBot Component

Replace the existing ChatBot with WebSocket version:

```jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { useAgentChat } from '../hooks/useAgentChat';
import cuttyAvatar from '../assets/cutty-avatar.png';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const {
    messages,
    sendMessage,
    isConnected,
    isLoading,
    sessionId
  } = useAgentChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && isConnected) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Only show chat if agent is enabled
  if (import.meta.env.VITE_CUTTY_AGENT_ENABLED !== 'true') {
    return null;
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        <ChatIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { height: '80vh', display: 'flex', flexDirection: 'column' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={cuttyAvatar} alt="Cutty" sx={{ width: 40, height: 40 }} />
          <Box flex={1}>
            <Typography variant="h6">Chat with Cutty</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={isConnected ? 'Connected' : 'Connecting...'}
                size="small"
                color={isConnected ? 'success' : 'default'}
                variant={isConnected ? 'filled' : 'outlined'}
              />
              {import.meta.env.DEV && (
                <Typography variant="caption" color="text.secondary">
                  Session: {sessionId.slice(-8)}
                </Typography>
              )}
            </Box>
          </Box>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
            {messages.length === 0 && (
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Welcome to Cutty Chat! 🦑
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  I can help you understand the Cutty app and answer questions about:
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                  <Chip label="Supported states for data generation" size="small" />
                  <Chip label="How to use app features" size="small" />
                  <Chip label="List generation and management" size="small" />
                </Box>
              </Paper>
            )}

            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                {message.role === 'assistant' && (
                  <Avatar 
                    src={cuttyAvatar} 
                    sx={{ width: 32, height: 32, mr: 1 }} 
                  />
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: message.role === 'user' ? 'primary.main' : 'grey.100',
                    color: message.role === 'user' ? 'white' : 'text.primary'
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 1,
                      opacity: 0.7,
                      color: message.role === 'user' ? 'inherit' : 'text.secondary'
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            ))}

            {isLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={cuttyAvatar} sx={{ width: 32, height: 32, mr: 1 }} />
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <CircularProgress size={20} />
                </Paper>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={isConnected ? "Type your message..." : "Connecting to agent..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected}
              multiline
              maxRows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!input.trim() || !isConnected}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
```

### Step 5: Add Frontend Environment Variable

Add to `app/frontend/.env`:
```bash
VITE_CUTTY_AGENT_ENABLED=true
```

## Testing the POC Integration

### 1. Start the Cutty App

```bash
# The agent is already deployed to production
# No need to run it locally

# Start Cutty App  
cd ~/Documents/GitHub/list-cutter/worktrees/cutty-agent
npm run dev
# Frontend on http://localhost:5173
# Backend on http://localhost:8787
```

### 2. Verify Connection

1. Open browser DevTools Network tab
2. Look for WebSocket connection to `/api/v1/agent/chat/{sessionId}`
3. Status should be 101 (Switching Protocols)
4. Console should show "Connected to Cutty Agent"

### 3. Test Chat Functionality

Try these messages:
- "What states do you support?" → Should list 8 states
- "Explain list generation" → Should show confirmation dialog
- "Hello" → General response

### 4. Test Session Isolation

1. Open app in two browser tabs
2. Send different messages in each
3. Verify conversations stay separate
4. Check session IDs are different in DevTools

## Troubleshooting

### WebSocket Connection Fails

```javascript
// Check agent is deployed and running
curl https://cutty-agent.emilycogsdill.com/check-api-key
// Should return: {"success":true}

// Check proxy is working (from Cutty backend)
curl http://localhost:8787/api/v1/agent/health
// Should return agent health status
```

### Common Issues & Fixes

1. **"WebSocket connection failed"**
   - Check agent is deployed: `curl https://cutty-agent.emilycogsdill.com/check-api-key`
   - Verify CUTTY_AGENT_URL in .dev.vars is correct
   - Check for WSS/HTTPS protocol mismatch

2. **Messages not appearing**
   - Check browser console for errors
   - Verify WebSocket onmessage handler
   - Ensure message format is JSON

3. **"Connecting..." stuck**
   - Agent deployment may be down
   - WebSocket upgrade may be blocked by proxy
   - Check browser supports WebSocket

## Phase 2: Future Enhancements (After POC Success)

### 1. Add Action Tools

Create tools that return structured actions for the Cutty app:

```javascript
// In agent's tools.ts
export const fillPatientForm = tool({
  description: "Pre-fill the patient generation form",
  parameters: z.object({
    state: z.enum(["CA", "FL", "GA", "IL", "NY", "OH", "PA", "TX"]),
    count: z.number().min(1).max(1000),
    ageRange: z.object({
      min: z.number(),
      max: z.number()
    }).optional()
  }),
  execute: async (params) => {
    return {
      type: 'action',
      action: 'FILL_PATIENT_FORM',
      data: params,
      message: `I'll fill out the form with ${params.count} patients for ${params.state}.`
    };
  }
});
```

### 2. Handle Actions in Frontend

```javascript
// In handleAgentMessage
if (data.type === 'action') {
  handleAgentAction(data.action, data.data);
} else {
  // Regular message handling
}

const handleAgentAction = (action, data) => {
  switch (action) {
    case 'FILL_PATIENT_FORM':
      navigate('/generate');
      setTimeout(() => {
        fillForm(data);
      }, 500);
      break;
    // More actions...
  }
};
```

### 3. Add Authentication

```javascript
// Pass JWT token in WebSocket connection
const wsUrl = `${protocol}//${host}/api/v1/agent/chat/${sessionId}?token=${authToken}`;

// Validate in backend proxy
const token = c.req.query('token');
if (!validateJWT(token)) {
  return c.json({ error: 'Unauthorized' }, 401);
}
```

### 4. Persist Chat History

```javascript
// Store in Cloudflare KV or D1
await c.env.CHAT_HISTORY.put(
  `chat:${sessionId}`,
  JSON.stringify(messages),
  { expirationTtl: 86400 } // 24 hours
);
```

## Security Considerations

1. **Session IDs**: Generated client-side, not guessable
2. **WebSocket**: Upgrade through backend proxy only
3. **Rate Limiting**: Apply at API gateway level
4. **Content**: Sanitize all displayed messages
5. **Actions**: Validate all actions before execution

## Success Metrics for POC

- [ ] Chat connects within 2 seconds
- [ ] Messages have < 200ms latency  
- [ ] Auto-reconnection works
- [ ] Session isolation verified
- [ ] Tools execute correctly
- [ ] No errors in 24-hour test

## Deployment Checklist

### Development ✓
- [ ] Agent deployed to `https://cutty-agent.emilycogsdill.com`
- [ ] Cutty backend proxies WebSocket to production agent
- [ ] Frontend connects successfully
- [ ] Sessions are isolated per tab
- [ ] Tools work as expected

### Production Deployment
- [ ] Agent already deployed and running
- [ ] Set CUTTY_AGENT_URL in production env
- [ ] WSS protocol handled automatically
- [ ] Configure monitoring (Cloudflare Analytics)
- [ ] Set up error tracking (Sentry)

## Key Takeaways

1. **POC First**: Simple chat proves the integration works
2. **WebSocket Proxy**: Backend handles routing to agent
3. **Session Isolation**: Each tab gets its own conversation
4. **Feature Flag**: Easy to enable/disable with env var
5. **Future Ready**: Architecture supports adding actions later

---

This guide provides everything needed to integrate the Cutty Agent as a simple chatbot POC. Start with basic chat, validate it works, then enhance with actions.

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