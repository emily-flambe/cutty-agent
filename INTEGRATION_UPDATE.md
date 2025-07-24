# Session Isolation Impact on Cutty Integration

## Overview
The session isolation implementation changes how the main Cutty app needs to integrate with the agent. Each user/tab now requires a unique session ID.

## Key Changes Required

### 1. Session ID Generation in Main App
The main Cutty app needs to generate and manage session IDs:

```javascript
// In the main app's ChatBot component
const [sessionId] = useState(() => {
  const existingId = window.sessionStorage.getItem('cutty-chat-session-id');
  if (existingId) return existingId;
  
  const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  window.sessionStorage.setItem('cutty-chat-session-id', id);
  return id;
});
```

### 2. Updated API Endpoints
Instead of using static endpoints, the main app must include session IDs:

```javascript
// OLD (shared session)
const chatEndpoint = import.meta.env.VITE_AGENT_URL + "/api/chat";

// NEW (isolated sessions)
const chatEndpoint = import.meta.env.VITE_AGENT_URL + `/agents/chat/${sessionId}`;
```

### 3. WebSocket Connections
WebSocket connections must also include the session ID:

```javascript
// WebSocket URL must include session ID
const wsUrl = `${agentUrl}/agents/chat/${sessionId}`;
```

## Benefits for Cutty App

1. **Multi-User Support**: Multiple users can use the chat simultaneously without interference
2. **Tab Isolation**: Users can have different conversations in different browser tabs
3. **Privacy**: Each user's conversation is completely isolated
4. **Scalability**: Can handle unlimited concurrent users

## Migration Steps

1. Update the ChatBot component to generate session IDs
2. Modify all agent API calls to include the session ID in the URL
3. Update WebSocket connections to use session-specific endpoints
4. Test with multiple users/tabs to ensure isolation

## Considerations

1. **Session Persistence**: Using `sessionStorage` means sessions are lost when tabs close
   - Consider `localStorage` for persistence across tabs
   - Or implement server-side session management

2. **Session Cleanup**: Old sessions will accumulate in Durable Objects
   - May need periodic cleanup mechanism
   - Consider session expiration

3. **User Authentication**: If Cutty has user auth, could tie sessions to user IDs:
   ```javascript
   const sessionId = `user-${userId}-session-${timestamp}`;
   ```

4. **Analytics**: Session IDs enable better usage analytics and debugging

## Testing Integration

1. Start agent with session isolation: `npm run dev`
2. Update main app with session ID support
3. Open multiple tabs of Cutty app
4. Verify each tab has independent chat history
5. Check server logs for different session IDs per tab