# Test Commands for Cutty Agent Hybrid Mode

This document provides comprehensive testing commands for the Cutty Agent's hybrid mode functionality, which automatically switches between simple chat mode (fast/cheap) and agent mode (full tool access) based on user intent.

## Local Setup Instructions

### 1. Environment Setup

Create a `.dev.vars` file in the project root with your API keys:

```bash
# .dev.vars (do not commit this file)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
# Or directly:
wrangler dev --local --port 8789
```

The server will start at `http://localhost:8789`

### 4. Verify Setup

Check if the API key is properly configured:

```bash
curl http://localhost:8789/check-api-key
```

Expected response:
```json
{"success": true}
```

## WebSocket Connection Testing

### Basic WebSocket Connection

Use `wscat` (install with `npm install -g wscat`) to test WebSocket functionality:

```bash
# Install wscat if not available
npm install -g wscat

# Connect to the WebSocket endpoint
wscat -c "ws://localhost:8789/agents/chat/test-session"
```

### Connection with Session ID

```bash
# Connect with specific session ID
wscat -c "ws://localhost:8789/agents/chat/my-test-session"
```

## Simple Chat Mode Tests

These queries should be handled by the fast Haiku model without tool execution:

### 1. Basic Greetings

```bash
# Connect to WebSocket and send:
{"message": "Hello"}
```

Expected response format:
```json
{
  "type": "simple_response",
  "content": "Hello! I'm Cutty the Cuttlefish, your brave little helper! How can I assist you today?",
  "metadata": {
    "mode": "simple",
    "modelUsed": "claude-3-haiku-20240307",
    "confidence": 0.9,
    "reason": "No action triggers detected - using conversational mode"
  }
}
```

### 2. Information Queries

```bash
# What is a CSV file?
{"message": "What is a CSV file?"}

# How do I manage lists?
{"message": "How do I manage lists?"}

# Tell me about data processing
{"message": "Tell me about data processing"}

# What features does this app have?
{"message": "What features does this app have?"}
```

### 3. Weather and General Questions

```bash
# General knowledge question
{"message": "What's the weather like today?"}

# Explanation request
{"message": "Can you explain what data formats are?"}
```

## Agent Mode Tests

These queries should trigger tool execution using the Claude Sonnet model:

### 1. Data Generation Requests

```bash
# Generate synthetic data
{"message": "Generate sample data for me"}

# Create CSV file
{"message": "Create a CSV with 100 rows"}

# Make test data
{"message": "Make some fake data for testing"}
```

Expected response should include tool execution and download link.

### 2. File Operations

```bash
# Download request
{"message": "Download the file I just made"}

# Export data
{"message": "Export my data as CSV"}

# Save file
{"message": "Save this as a file"}
```

### 3. Geographic Data Queries

```bash
# List states
{"message": "What states are supported?"}

# Supported regions
{"message": "Which regions can I use?"}

# Geographic data
{"message": "List all available countries"}
```

### 4. Tool-Specific Requests

```bash
# Explicit tool usage
{"message": "Use the data generation tool"}

# Process data
{"message": "Calculate statistics for my data"}

# Analyze information
{"message": "Analyze this data set"}
```

## Mode Override Testing

Force specific modes using explicit hints:

### 1. Force Simple Mode

```bash
# Force simple mode even with agent triggers
{"message": "[simple] generate data for me"}

# Should respond in simple mode explaining limitations
{"message": "[simple] create a CSV file"}
```

### 2. Force Agent Mode

```bash
# Force agent mode for simple queries
{"message": "[agent] hello there"}

# Should activate agent mode unnecessarily
{"message": "[agent] what is a list?"}
```

## HTTP REST API Testing (if available)

### POST Request to Agent Endpoint

```bash
curl -X POST http://localhost:8789/agents/chat/test-session \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Generate sample data",
        "id": "test-msg-1",
        "createdAt": "'$(date -u +%Y-%m-%dT%H:%M:%S.000Z)'"
      }
    ]
  }'
```

## Expected Response Patterns

### Simple Mode Response
- Fast response time (< 1 second)
- Uses Haiku model
- No tool executions
- Conversational tone
- Limited token usage

### Agent Mode Response  
- Longer response time (1-3 seconds)
- Uses Sonnet model
- May include tool executions
- Action-oriented responses
- Higher token usage
- Download links when applicable

## Performance Testing

### Latency Comparison

```bash
# Time simple mode responses
time wscat -c "ws://localhost:8789/agents/chat/perf-test" -x '{"message":"Hello"}'

# Time agent mode responses  
time wscat -c "ws://localhost:8789/agents/chat/perf-test" -x '{"message":"Generate data"}'
```

### Concurrent Connections

```bash
# Test multiple simultaneous connections
for i in {1..5}; do
  wscat -c "ws://localhost:8789/agents/chat/session-$i" &
done
```

## Debugging and Monitoring

### Enable Debug Logging

Check the console output of your development server for detailed logging:

- Mode detection decisions
- Confidence scores
- Reasoning for mode selection
- Tool execution logs
- Performance metrics

### Log Analysis Patterns

Look for these log patterns:

```
[Mode Detection] simple mode (confidence: 0.9) - No action triggers detected
[WebSocket] Using simple chat mode - bypassing agent flow
[Simple Mode] Processing message with fast model
```

vs.

```
[Mode Detection] agent mode (confidence: 0.8) - Detected action intent: 2 trigger patterns
[WebSocket] Converting to agent format with ID: xyz
```

## Error Scenarios

### API Key Issues

```bash
# Test without API key configured
curl http://localhost:8789/check-api-key
# Should return: {"success": false}
```

### Malformed Messages

```bash
# Invalid JSON
{"invalid": json}

# Missing message field
{"context": "test"}

# Empty message
{"message": ""}
```

## Integration Testing Workflow

### Complete Test Sequence

1. **Setup**: Start server and verify API key
2. **Connection**: Establish WebSocket connection
3. **Simple Mode**: Test conversational queries
4. **Agent Mode**: Test tool-triggering queries  
5. **Mode Override**: Test explicit mode hints
6. **Performance**: Compare response times
7. **Error Handling**: Test edge cases

### Sample Test Script

```bash
#!/bin/bash
# complete-test.sh

echo "Testing Cutty Agent Hybrid Mode..."

# 1. Check API key
echo "1. Checking API key..."
curl -s http://localhost:8789/check-api-key

# 2. Test simple mode (using a separate script or tool)
echo "2. Testing simple mode..."
# wscat commands would go here

# 3. Test agent mode
echo "3. Testing agent mode..."
# agent mode tests

# 4. Performance comparison
echo "4. Performance testing..."
# timing tests

echo "Test complete!"
```

## Troubleshooting

### Common Issues

1. **WebSocket connection fails**
   - Check server is running on port 8789
   - Verify no firewall blocking connections

2. **API key errors**
   - Ensure `.dev.vars` file exists with valid `ANTHROPIC_API_KEY`
   - Restart server after adding API key

3. **Mode detection not working**
   - Check console logs for detection reasoning
   - Verify trigger patterns in `modeDetector.ts`

4. **Tool execution fails**
   - Check agent mode is properly activated
   - Verify all required dependencies are installed

### Debug Commands

```bash
# Check server status
curl http://localhost:8789/

# View server logs
# (check terminal where `npm run dev` is running)

# Test basic connectivity
ping localhost

# Check port availability
netstat -an | grep 8789
```

## Success Criteria

For a successful test of hybrid mode functionality:

- ✅ Simple queries respond in < 1 second with simple mode
- ✅ Agent queries properly trigger tool execution  
- ✅ Mode detection accuracy > 90%
- ✅ WebSocket connections stable
- ✅ Mode overrides work correctly
- ✅ Download links generated for file operations
- ✅ No breaking changes to existing functionality
- ✅ Cost reduction visible in simple mode usage
- ✅ Proper error handling and fallbacks

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-01-09  
**Tested Against**: Cutty Agent v0.1.0  
**Author**: Development Team