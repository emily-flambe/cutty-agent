# Integrating Cutty Agent with Main App

## Environment Variables

Add to main app's `.dev.vars`:

```
AGENT_ENABLED=true
AGENT_URL=http://localhost:8789
```

## Frontend Changes

In `ChatBot.jsx`, update the API endpoint:

```javascript
const chatEndpoint =
  import.meta.env.VITE_AGENT_ENABLED === "true"
    ? import.meta.env.VITE_AGENT_URL + "/api/chat"
    : "/api/v1/chat";
```

## Testing Integration

1. Run agent: `npm run dev` (in cutty-agent repo)
2. Run main app: `make dev` (in list-cutter repo)
3. Open chat and test communication
