# Frontend WebSocket Message Format Fix

## Issue

The Cutty Agent is showing "Unknown Event" errors and not responding to messages because the frontend is sending messages in an incorrect format.

## Current Frontend Format (INCORRECT)

```json
{
  "message": "user's message text",
  "context": {
    "user": "user@email.com",
    "page": "/current/path"
  }
}
```

## Required Format (CORRECT)

The Cloudflare Agents SDK expects WebSocket messages in this specific format:

```json
{
  "type": "cf_agent_use_chat_request",
  "id": "unique-message-id",
  "init": {
    "method": "POST",
    "body": "{\"messages\": [{\"id\": \"msg-id\", \"role\": \"user\", \"content\": \"user message\", \"createdAt\": \"2025-07-24T04:01:06.121Z\", \"metadata\": {\"user\": \"user@email.com\", \"page\": \"/current/path\"}}]}"
  }
}
```

## Implementation Steps

### 1. Find the WebSocket message sending code

Look for where messages are sent via WebSocket, likely in a chat component or service. It might look like:

```javascript
ws.send(
  JSON.stringify({
    message: userInput,
    context: { user: currentUser, page: currentPath },
  })
);
```

### 2. Update to the correct format

Replace with:

```javascript
// Generate unique IDs
const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Create the message in the expected format
const agentMessage = {
  type: "cf_agent_use_chat_request",
  id: requestId,
  init: {
    method: "POST",
    body: JSON.stringify({
      messages: [
        ...existingMessages, // Include previous messages if maintaining conversation history
        {
          id: messageId,
          role: "user",
          content: userInput,
          createdAt: new Date().toISOString(),
          metadata: {
            user: currentUser,
            page: currentPath,
          },
        },
      ],
    }),
  },
};

ws.send(JSON.stringify(agentMessage));
```

### 3. Handle the response format

The agent will respond with messages in this format:

```json
{
  "body": "encoded-content",
  "done": false,
  "id": "request-id",
  "type": "cf_agent_use_chat_response"
}
```

The `body` field contains encoded streaming data. Parse it like:

```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "cf_agent_use_chat_response") {
    // The body contains encoded streaming data
    // Format: "0:\"text content\"\n" or "f:{\"messageId\":\"...\"}\n"
    const body = data.body;

    // Parse different types of streaming data
    if (body.startsWith("0:")) {
      // Text delta - extract and display the text
      const textContent = JSON.parse(body.slice(2).trim());
      // Append to chat display
    } else if (body.startsWith("f:")) {
      // Message metadata
      const metadata = JSON.parse(body.slice(2).trim());
      // Handle message ID, etc.
    } else if (body.startsWith("e:")) {
      // Completion data
      const completion = JSON.parse(body.slice(2).trim());
      // Handle finish reason, usage stats, etc.
    }

    if (data.done === true) {
      // Message is complete
    }
  }
};
```

### 4. Maintain conversation history

The `messages` array should include the full conversation history, not just the latest message. Store previous messages and include them in each request.

### 5. Test the changes

1. Open browser dev tools to monitor WebSocket messages
2. Send a test message like "What states are supported for synthetic data generation?"
3. Verify the message is sent in the correct format
4. Confirm you receive streaming responses from the agent

## Example Full Implementation

```javascript
class CuttyAgentClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.messages = []; // Conversation history
    this.currentResponse = "";

    this.ws.onmessage = this.handleMessage.bind(this);
  }

  sendMessage(userInput, context) {
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Add user message to history
    const userMessage = {
      id: messageId,
      role: "user",
      content: userInput,
      createdAt: new Date().toISOString(),
      metadata: context,
    };

    this.messages.push(userMessage);

    // Send in agent format
    const agentMessage = {
      type: "cf_agent_use_chat_request",
      id: requestId,
      init: {
        method: "POST",
        body: JSON.stringify({
          messages: this.messages,
        }),
      },
    };

    this.ws.send(JSON.stringify(agentMessage));
  }

  handleMessage(event) {
    try {
      const data = JSON.parse(event.data);

      if (data.type === "cf_agent_use_chat_response" && data.body) {
        this.parseStreamingResponse(data.body, data.done);
      }
    } catch (e) {
      console.error("Failed to parse WebSocket message:", e);
    }
  }

  parseStreamingResponse(body, isDone) {
    // Handle different streaming data types
    if (body.startsWith("0:")) {
      // Text content
      const text = JSON.parse(body.slice(2).trim());
      this.currentResponse += text;
      this.onTextUpdate?.(this.currentResponse);
    } else if (body.startsWith("f:")) {
      // New message started
      const metadata = JSON.parse(body.slice(2).trim());
      if (metadata.messageId) {
        this.currentMessageId = metadata.messageId;
      }
    } else if (body.startsWith("e:") && this.currentResponse) {
      // Message complete - add to history
      const assistantMessage = {
        id: this.currentMessageId || `msg-${Date.now()}`,
        role: "assistant",
        content: this.currentResponse,
        createdAt: new Date().toISOString(),
      };
      this.messages.push(assistantMessage);
      this.currentResponse = "";
    }

    if (isDone) {
      this.onComplete?.();
    }
  }
}
```

## Verification

After implementing, you should see:

1. No more "Unknown Event" errors in the agent logs
2. The agent responds with streaming text
3. Tool executions work (e.g., getSupportedStates)
4. Conversation history is maintained

## Notes

- The `body` field in the init object must be a stringified JSON, not a regular object
- Message IDs should be unique
- The `createdAt` field should be in ISO 8601 format
- Context/metadata can be stored in the message's `metadata` field
- The agent expects the full conversation history in the `messages` array
