# Integration Gaps & Solutions

## Current Limitations

The chat agent currently cannot take actions in the Cutty app because:

1. **No Action Tools**: Current tools only return information
2. **No Callback Mechanism**: Agent can't trigger actions in the main app
3. **No Form Integration**: Can't fill out the synthetic data generation form

## Proposed Solutions

### Solution 1: Action-Based Tools

Add tools that return structured actions for the Cutty app to execute:

```typescript
// In tools.ts
export const generatePatientList = tool({
  description: "Generate a synthetic patient list with specified parameters",
  parameters: z.object({
    state: z.enum(["CA", "FL", "GA", "IL", "NY", "OH", "PA", "TX"]),
    count: z.number().min(1).max(1000),
    ageRange: z.object({
      min: z.number().min(0),
      max: z.number().max(120)
    }).optional(),
    conditions: z.array(z.string()).optional()
  }),
  // Returns an action descriptor instead of executing directly
  execute: async (params) => {
    return {
      action: "GENERATE_PATIENT_LIST",
      params: params,
      message: `I'll generate ${params.count} patients for ${params.state}. The main app will now fill out the form for you.`
    };
  }
});
```

### Solution 2: WebSocket Action Messages

The agent sends special action messages that the Cutty app interprets:

```typescript
// Agent sends:
{
  "type": "action",
  "action": "FILL_FORM",
  "target": "patient-generation-form",
  "data": {
    "state": "CA",
    "patientCount": 100,
    "ageMin": 18,
    "ageMax": 65
  }
}
```

### Solution 3: Callback URLs

The Cutty app provides callback endpoints:

```typescript
// When connecting to agent
const ws = new WebSocket(`ws://agent/chat/${sessionId}?callback=${encodeURIComponent(callbackUrl)}`);

// Agent can then POST actions to the callback
POST https://cutty-app.com/api/agent-actions
{
  "sessionId": "session-123",
  "action": "fillForm",
  "data": { ... }
}
```

## Recommended Implementation

### For the Agent (this repo):

1. **Create Action Tools**:
```typescript
// New action tools
- fillPatientGenerationForm
- exportPatientList  
- navigateToPage
- triggerDataRefresh
```

2. **Modify Tool Response Format**:
```typescript
interface ToolResponse {
  // Display message for chat
  message: string;
  
  // Action for the main app
  action?: {
    type: string;
    target: string;
    data: any;
  };
}
```

### For the Cutty App:

1. **WebSocket Message Handler**:
```typescript
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  if (message.type === 'action') {
    handleAgentAction(message.action);
  } else {
    // Regular chat message
    displayMessage(message);
  }
};

function handleAgentAction(action) {
  switch(action.type) {
    case 'FILL_FORM':
      fillFormWithData(action.target, action.data);
      break;
    case 'NAVIGATE':
      router.push(action.target);
      break;
    // etc.
  }
}
```

2. **Form Integration**:
```typescript
function fillFormWithData(formId, data) {
  const form = document.getElementById(formId);
  
  // Fill form fields
  form.state.value = data.state;
  form.patientCount.value = data.patientCount;
  
  // Trigger React/Vue updates if needed
  form.dispatchEvent(new Event('input', { bubbles: true }));
}
```

## Example Flow

1. User: "Generate 50 patients in California aged 25-40"
2. Agent: Invokes `generatePatientList` tool
3. Agent sends action message via WebSocket
4. Cutty app receives action and:
   - Navigates to patient generation page
   - Fills out the form fields
   - Shows confirmation to user
5. User can review and submit the pre-filled form

## Security Considerations

1. **Action Validation**: Cutty app must validate all actions
2. **Permission Checks**: Ensure user has permission for requested actions
3. **Rate Limiting**: Prevent abuse of automated actions
4. **Action Confirmation**: Consider requiring user confirmation for certain actions