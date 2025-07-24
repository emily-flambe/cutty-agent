# Cutty App Integration Guide

## Quick Start

### 1. Basic Chat Integration

```typescript
// In your Cutty app's ChatBot component
import { useState, useEffect } from 'react';

function ChatBot() {
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('cutty-chat-session');
    if (existing) return existing;
    
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('cutty-chat-session', id);
    return id;
  });
  
  const [ws, setWs] = useState(null);
  
  useEffect(() => {
    const agentUrl = import.meta.env.VITE_AGENT_URL || 'http://localhost:8789';
    const websocket = new WebSocket(`${agentUrl.replace('http', 'ws')}/agents/chat/${sessionId}`);
    
    websocket.onmessage = handleAgentMessage;
    setWs(websocket);
    
    return () => websocket.close();
  }, [sessionId]);
  
  const handleAgentMessage = (event) => {
    const data = JSON.parse(event.data);
    // Handle different message types
    
    if (data.type === 'action') {
      executeAction(data.action);
    } else {
      // Display chat message
      addMessageToChat(data);
    }
  };
  
  // ... rest of component
}
```

### 2. Implementing Action Handlers

```typescript
const executeAction = (action) => {
  switch (action.type) {
    case 'FILL_PATIENT_FORM':
      fillPatientGenerationForm(action.data);
      break;
      
    case 'NAVIGATE':
      router.push(action.target);
      break;
      
    case 'EXPORT_DATA':
      triggerDataExport(action.params);
      break;
      
    default:
      console.warn('Unknown action type:', action.type);
  }
};

const fillPatientGenerationForm = (data) => {
  // Navigate to form if not already there
  if (router.pathname !== '/generate-patients') {
    router.push('/generate-patients');
  }
  
  // Wait for navigation then fill form
  setTimeout(() => {
    const form = document.getElementById('patient-generation-form');
    if (form) {
      // Update form values
      updateFormField(form, 'state', data.state);
      updateFormField(form, 'count', data.count);
      updateFormField(form, 'ageMin', data.ageRange?.min);
      updateFormField(form, 'ageMax', data.ageRange?.max);
      
      // Highlight the form
      form.classList.add('agent-filled');
      
      // Show confirmation message
      showNotification('Form filled by Cutty Agent. Please review and submit.');
    }
  }, 500);
};
```

### 3. Sending Messages to Agent

```typescript
const sendMessage = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      message: message,
      context: {
        currentPage: router.pathname,
        userRole: user.role,
        // Any other context that might help the agent
      }
    }));
  }
};
```

## Advanced Integration

### Enable Agent to See App State

```typescript
// Provide context about current app state
const getAppContext = () => ({
  currentPage: router.pathname,
  hasUnsavedChanges: formIsDirty,
  activePatients: patientList.length,
  userPermissions: user.permissions,
});

// Include context in messages
ws.send(JSON.stringify({
  message: userMessage,
  context: getAppContext()
}));
```

### Handle Tool Confirmations

```typescript
// When agent needs confirmation for an action
const handleToolConfirmation = (toolCall) => {
  const confirmed = window.confirm(
    `Cutty wants to ${toolCall.description}. Allow?`
  );
  
  ws.send(JSON.stringify({
    type: 'tool-confirmation',
    toolCallId: toolCall.id,
    confirmed: confirmed
  }));
};
```

### Error Handling

```typescript
ws.onerror = (error) => {
  console.error('Agent connection error:', error);
  showNotification('Lost connection to Cutty Agent', 'error');
};

ws.onclose = () => {
  // Attempt reconnection
  setTimeout(() => {
    reconnectToAgent();
  }, 3000);
};
```

## Example User Flows

### Flow 1: Form Filling
1. User: "Generate 100 patients in Texas aged 30-50"
2. Agent parses intent and parameters
3. Agent sends action: `{ type: 'FILL_PATIENT_FORM', data: { state: 'TX', count: 100, ... } }`
4. Cutty app navigates to form and fills fields
5. User reviews and clicks submit

### Flow 2: Data Export
1. User: "Export the current patient list as CSV"
2. Agent sends action: `{ type: 'EXPORT_DATA', params: { format: 'csv' } }`
3. Cutty app triggers download

### Flow 3: Information Query
1. User: "What states are supported?"
2. Agent uses `getSupportedStates` tool
3. Returns chat message with list (no action needed)

## Testing the Integration

1. Start the agent: `npm run dev` (in cutty-agent repo)
2. Set environment variable: `VITE_AGENT_URL=http://localhost:8789`
3. Test connection: Check browser console for WebSocket connection
4. Test chat: Send a simple message
5. Test actions: Try "Generate 10 patients in California"

## Security Best Practices

1. **Validate All Actions**: Never blindly execute agent actions
2. **Check Permissions**: Ensure user can perform requested action
3. **Sanitize Data**: Clean all data before using in forms
4. **Rate Limit**: Prevent rapid automated actions
5. **Audit Trail**: Log all agent-initiated actions

## Troubleshooting

### Connection Issues
- Check agent is running on correct port
- Verify CORS headers if needed
- Check browser console for WebSocket errors

### Actions Not Working
- Verify action handler is implemented
- Check action type matches exactly
- Ensure form/element IDs are correct
- Check browser console for errors

### Session Issues
- Clear sessionStorage to reset session
- Check for session ID in WebSocket URL
- Verify each tab has unique session ID