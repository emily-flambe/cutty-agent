# Hybrid Mode Testing Guide

## Overview

This guide provides comprehensive instructions for testing the Cutty Agent Hybrid Mode implementation, which supports both Simple Chat (fast, lightweight) and Agent Mode (full tool capabilities).

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm test src/agent/modeDetector.test.ts
npm test src/hybrid-mode.integration.test.ts

# Run with coverage
npm test -- --coverage
```

### 3. Start Development Server
```bash
# Ensure environment variables are set
cp .dev.vars.example .dev.vars
# Edit .dev.vars and add your ANTHROPIC_API_KEY

# Start the server
npm run dev
```

## Test Coverage

### Unit Tests

#### Mode Detection Tests (`src/agent/modeDetector.test.ts`)
Tests the pattern-based mode detection logic:

- **Simple Mode Detection**: Conversational queries
- **Agent Mode Detection**: Action-oriented queries
- **Explicit Mode Hints**: `[simple]` and `[agent]` overrides
- **Confidence Scoring**: Accuracy of confidence calculations
- **Edge Cases**: Empty strings, special characters, long inputs

```bash
npm test src/agent/modeDetector.test.ts
```

### Integration Tests

#### Hybrid Mode Integration (`src/hybrid-mode.integration.test.ts`)
Tests end-to-end hybrid mode functionality:

- **WebSocket Protocol**: Message handling and format conversion
- **Mode Switching**: Seamless transitions between modes
- **Tool Execution**: Agent mode tool capabilities
- **Error Handling**: Fallback mechanisms
- **Performance**: Latency requirements

```bash
npm test src/hybrid-mode.integration.test.ts
```

## Manual Testing

### WebSocket Client Testing

Use this HTML file to test WebSocket interactions:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cutty Agent Hybrid Mode Tester</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .chat-box { border: 1px solid #ccc; height: 400px; overflow-y: auto; padding: 10px; margin-bottom: 10px; }
        .message { margin: 10px 0; padding: 5px; border-radius: 5px; }
        .user { background: #e3f2fd; text-align: right; }
        .assistant { background: #f5f5f5; }
        .metadata { font-size: 0.8em; color: #666; margin-top: 5px; }
        .controls { display: flex; gap: 10px; margin-bottom: 10px; }
        button { padding: 5px 10px; cursor: pointer; }
        input[type="text"] { flex: 1; padding: 5px; }
        .mode-indicator { padding: 5px; border-radius: 3px; font-size: 0.9em; }
        .simple-mode { background: #c8e6c9; }
        .agent-mode { background: #fff3cd; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Cutty Agent Hybrid Mode Tester</h1>
        
        <div class="controls">
            <button onclick="connect()">Connect</button>
            <button onclick="disconnect()">Disconnect</button>
            <span id="status">Disconnected</span>
        </div>
        
        <div class="chat-box" id="chatBox"></div>
        
        <div class="controls">
            <input type="text" id="messageInput" placeholder="Type a message..." onkeypress="if(event.key==='Enter') sendMessage()">
            <button onclick="sendMessage()">Send</button>
            <select id="modeOverride">
                <option value="">Auto Detect</option>
                <option value="[simple]">Force Simple</option>
                <option value="[agent]">Force Agent</option>
            </select>
        </div>
        
        <h3>Test Scenarios</h3>
        <button onclick="testSimple()">Test Simple Chat</button>
        <button onclick="testAgent()">Test Agent Mode</button>
        <button onclick="testModeSwitch()">Test Mode Switch</button>
        <button onclick="testError()">Test Error Handling</button>
    </div>

    <script>
        let ws = null;
        const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        function connect() {
            ws = new WebSocket(`ws://localhost:8789/agents/chat/${sessionId}`);
            
            ws.onopen = () => {
                document.getElementById('status').textContent = 'Connected';
                addMessage('System', 'Connected to Cutty Agent');
            };
            
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Received:', data);
                
                if (data.type === 'simple_response') {
                    addMessage('Assistant', data.content, data.responseMetadata);
                } else if (data.type === 'mode_switch') {
                    addMessage('System', `Mode switched from ${data.data.from} to ${data.data.to}: ${data.data.reason}`);
                } else if (data.content) {
                    addMessage('Assistant', data.content, data.metadata);
                }
            };
            
            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                addMessage('System', 'Connection error');
            };
            
            ws.onclose = () => {
                document.getElementById('status').textContent = 'Disconnected';
                addMessage('System', 'Disconnected from Cutty Agent');
            };
        }
        
        function disconnect() {
            if (ws) {
                ws.close();
                ws = null;
            }
        }
        
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const modeOverride = document.getElementById('modeOverride').value;
            const message = modeOverride + ' ' + input.value;
            
            if (ws && ws.readyState === WebSocket.OPEN) {
                const payload = {
                    message: message.trim(),
                    context: {
                        timestamp: Date.now(),
                        sessionId: sessionId
                    }
                };
                
                ws.send(JSON.stringify(payload));
                addMessage('User', input.value);
                input.value = '';
            } else {
                alert('Not connected to server');
            }
        }
        
        function addMessage(sender, content, metadata) {
            const chatBox = document.getElementById('chatBox');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender.toLowerCase()}`;
            
            let metadataHtml = '';
            if (metadata) {
                const modeClass = metadata.mode === 'simple' ? 'simple-mode' : 'agent-mode';
                metadataHtml = `<div class="metadata">
                    <span class="mode-indicator ${modeClass}">Mode: ${metadata.mode}</span>
                    Confidence: ${metadata.confidence || 'N/A'} | 
                    Model: ${metadata.modelUsed || 'N/A'} | 
                    Latency: ${metadata.latency || 'N/A'}ms
                </div>`;
            }
            
            messageDiv.innerHTML = `<strong>${sender}:</strong> ${content}${metadataHtml}`;
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        
        // Test Scenarios
        function testSimple() {
            document.getElementById('messageInput').value = "What is a CSV file?";
            sendMessage();
        }
        
        function testAgent() {
            document.getElementById('messageInput').value = "Generate a CSV with sample data";
            sendMessage();
        }
        
        function testModeSwitch() {
            const tests = [
                "Hello, how are you?",
                "Generate 50 rows of test data",
                "Thanks for the help!"
            ];
            
            tests.forEach((test, index) => {
                setTimeout(() => {
                    document.getElementById('messageInput').value = test;
                    sendMessage();
                }, index * 2000);
            });
        }
        
        function testError() {
            document.getElementById('messageInput').value = "[simple] {{TRIGGER_ERROR}}";
            sendMessage();
        }
    </script>
</body>
</html>
```

Save this as `test-client.html` and open in your browser after starting the dev server.

## Performance Testing

### Load Testing Script

```javascript
// load-test.js
const WebSocket = require('ws');

async function loadTest() {
    const numClients = 10;
    const messagesPerClient = 5;
    const clients = [];
    
    // Test messages
    const testMessages = [
        "What is CSV?",
        "How do I use Cutty?",
        "Generate sample data",
        "Download my file",
        "List supported states"
    ];
    
    // Create clients
    for (let i = 0; i < numClients; i++) {
        const sessionId = `load-test-${i}-${Date.now()}`;
        const ws = new WebSocket(`ws://localhost:8789/agents/chat/${sessionId}`);
        
        ws.on('open', () => {
            console.log(`Client ${i} connected`);
            
            // Send messages
            for (let j = 0; j < messagesPerClient; j++) {
                setTimeout(() => {
                    const message = testMessages[j % testMessages.length];
                    ws.send(JSON.stringify({
                        message: message,
                        context: { clientId: i, messageId: j }
                    }));
                }, j * 1000);
            }
        });
        
        ws.on('message', (data) => {
            const response = JSON.parse(data);
            console.log(`Client ${i} received response in ${response.responseMetadata?.latency}ms`);
        });
        
        clients.push(ws);
    }
    
    // Cleanup after test
    setTimeout(() => {
        clients.forEach(ws => ws.close());
        console.log('Load test complete');
    }, (messagesPerClient + 2) * 1000);
}

loadTest();
```

Run with: `node load-test.js`

## Mode Detection Testing

### Test Query Examples

#### Simple Mode Queries (Expected: simple)
```javascript
const simpleQueries = [
    "Hello!",
    "What is a CSV file?",
    "How does Cutty work?",
    "Tell me about data management",
    "What's the weather like?",
    "Thank you for your help",
    "Can you explain lists?",
    "What time is it?"
];
```

#### Agent Mode Queries (Expected: agent)
```javascript
const agentQueries = [
    "Generate sample data for me",
    "Create a CSV with 100 rows",
    "Download the file",
    "Export my data",
    "What states are supported?",
    "List available countries",
    "Calculate the total",
    "Fetch data from the API",
    "Run the data analysis tool"
];
```

#### Mode Override Queries
```javascript
const overrideQueries = [
    "[simple] generate data",  // Forces simple mode
    "[agent] hello",           // Forces agent mode
    "[SIMPLE] create CSV",      // Case insensitive
    "[Agent] what is CSV?"     // Case insensitive
];
```

## Debugging

### Enable Debug Logging

Set environment variables:
```bash
export DEBUG_MODE=true
export LOG_LEVEL=debug
```

### Common Issues and Solutions

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Mode detection incorrect | Pattern not matching | Check AGENT_TRIGGERS patterns |
| High latency in simple mode | Model loading | Ensure Haiku model is cached |
| WebSocket connection fails | Server not running | Check `npm run dev` output |
| Tools not executing | Agent mode not triggered | Add explicit [agent] hint |
| Fallback not working | Error handling issue | Check console logs |

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Hybrid Mode Tests

on:
  push:
    branches: [main, feature/hybrid-*]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run unit tests
        run: npm test -- --run
        
      - name: Run integration tests
        run: npm test src/hybrid-mode.integration.test.ts -- --run
        
      - name: Generate coverage report
        run: npm test -- --coverage
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
```

## Monitoring

### Key Metrics to Track

1. **Mode Distribution**
   - Percentage of simple vs agent mode usage
   - Mode switch frequency

2. **Performance Metrics**
   - Simple mode response time (target: <500ms)
   - Agent mode response time (target: <2s)
   - Token usage per mode

3. **Error Rates**
   - Fallback frequency
   - Mode detection failures
   - Tool execution errors

### Logging Examples

```javascript
// Add to your monitoring system
console.log(JSON.stringify({
    type: 'mode_detection',
    mode: detectedMode,
    confidence: confidence,
    query: userQuery,
    timestamp: Date.now()
}));

console.log(JSON.stringify({
    type: 'performance',
    mode: responseMode,
    latency: endTime - startTime,
    tokens: tokenCount,
    timestamp: Date.now()
}));
```

## Troubleshooting

### Debug Mode Detection

```bash
# Test mode detection directly
node -e "
const { ModeDetector } = require('./src/agent/modeDetector');
console.log(ModeDetector.analyzeIntent('Generate sample data'));
console.log(ModeDetector.analyzeIntent('Hello, how are you?'));
"
```

### Verify WebSocket Connection

```bash
# Test WebSocket endpoint
wscat -c ws://localhost:8789/agents/chat/test-session
```

### Check Server Health

```bash
curl http://localhost:8789/check-api-key
```

## Best Practices

1. **Always test both modes** after making changes
2. **Monitor mode detection accuracy** in production
3. **Set appropriate timeouts** for each mode
4. **Use explicit mode hints** for critical operations
5. **Log mode decisions** for analysis
6. **Test edge cases** and error scenarios
7. **Benchmark performance** regularly
8. **Keep patterns updated** based on user queries

## Support

For issues or questions:
- Check server logs: `npm run logs`
- Review test output: `npm test -- --verbose`
- File issues: [GitHub Issues](https://github.com/emily-flambe/cutty-agent/issues)

---

**Last Updated**: 2025-01-09
**Version**: 1.0.0
**Status**: Ready for Testing