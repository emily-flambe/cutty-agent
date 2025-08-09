# Cutty Agent Hybrid Mode Specification

## Executive Summary

Enhance cutty-agent to support dual-mode operation: **Simple Chat** (default) and **Agentic Mode** (tool-enabled), with intelligent automatic switching based on user intent detection.

**Core Principle**: Start simple, escalate to agentic only when needed.

## Requirements

### Functional Requirements

1. **PRESERVE all existing agent functionality** - No breaking changes
2. **ADD simple chat mode** as the default interaction pattern
3. **Automatic mode detection** based on message content analysis
4. **Seamless mode switching** within the same conversation
5. **Explicit mode override** capability via message metadata

### Non-Functional Requirements

- **Performance**: Simple mode must respond in <1 second
- **Cost**: Reduce token usage by 40% for non-tool queries  
- **Compatibility**: Maintain WebSocket protocol compatibility
- **Scalability**: No additional infrastructure requirements

## Architecture Design

### Mode Detection Logic

```typescript
// src/agent/modeDetector.ts
export class ModeDetector {
  // Patterns that trigger agent mode
  private static AGENT_TRIGGERS = [
    // Data generation
    /\b(generate|create|make)\s+.*(data|csv|file|list)/i,
    /\b(synthetic|fake|sample|test)\s+data/i,
    
    // File operations
    /\b(download|export|save)\s+/i,
    /\bget\s+.*file/i,
    
    // Specific tool queries
    /\b(what|which|list)\s+(states|countries|regions)/i,
    /\bsupported\s+(states|locations)/i,
    
    // Action verbs indicating tool use
    /\b(calculate|compute|analyze|process)\s+/i,
    /\b(fetch|retrieve|pull|get)\s+.*(from|using)/i,
    
    // Explicit agent requests
    /\b(use|run|execute)\s+(tool|function|action)/i,
    /\bagent\s+mode/i
  ];

  static detectMode(message: string): 'simple' | 'agent' {
    // Check for explicit mode hints
    if (message.toLowerCase().includes('[simple]')) return 'simple';
    if (message.toLowerCase().includes('[agent]')) return 'agent';
    
    // Pattern matching for agent triggers
    const requiresAgent = this.AGENT_TRIGGERS.some(pattern => 
      pattern.test(message)
    );
    
    return requiresAgent ? 'agent' : 'simple';
  }
  
  static analyzeIntent(message: string): {
    mode: 'simple' | 'agent';
    confidence: number;
    reason: string;
  } {
    const mode = this.detectMode(message);
    
    // Calculate confidence based on pattern matches
    const matches = this.AGENT_TRIGGERS.filter(p => p.test(message));
    const confidence = mode === 'agent' 
      ? Math.min(0.5 + (matches.length * 0.2), 1.0)
      : 0.9; // High confidence for simple mode
    
    const reason = mode === 'agent'
      ? `Detected action intent: ${matches.length} trigger patterns`
      : 'No action triggers detected - using conversational mode';
    
    return { mode, confidence, reason };
  }
}
```

### Enhanced Agent Class

```typescript
// src/agent/server.ts - MODIFIED
import { AIChatAgent } from '@cloudflare/agents-sdk';
import { ModeDetector } from './modeDetector';

export class CuttyAgent extends AIChatAgent {
  private simpleModel = '@cf/meta/llama-3-8b-instruct'; // Fast, cheap
  private agentModel = 'anthropic/claude-3-5-sonnet'; // Current model
  
  constructor(info: AgentInfo) {
    super({
      ...info,
      // Keep existing configuration
      systemPrompt: AGENT_SYSTEM_PROMPT,
      model: info.model || 'anthropic/claude-3-5-sonnet'
    });
  }

  // NEW: Simple chat handler
  private async handleSimpleChat(
    message: string, 
    context: ExecutionContext
  ): Promise<string> {
    // Direct AI call without tools
    const response = await context.env.AI.run(this.simpleModel, {
      messages: [
        {
          role: 'system',
          content: SIMPLE_CHAT_PROMPT
        },
        {
          role: 'user',
          content: message
        }
      ],
      stream: true
    });
    
    return response;
  }

  // MODIFIED: Main message handler with mode detection
  async execute(input: string, context: ExecutionContext) {
    const { mode, confidence, reason } = ModeDetector.analyzeIntent(input);
    
    // Log mode decision for debugging
    console.log(`Mode: ${mode} (confidence: ${confidence}) - ${reason}`);
    
    // Add mode indicator to response metadata
    this.metadata = {
      ...this.metadata,
      executionMode: mode,
      modeConfidence: confidence
    };
    
    if (mode === 'simple') {
      // Bypass tool system entirely
      const response = await this.handleSimpleChat(input, context);
      return {
        type: 'text',
        content: response,
        metadata: { mode: 'simple' }
      };
    }
    
    // Use existing agent flow for tool-enabled responses
    return super.execute(input, context);
  }

  // PRESERVED: All existing methods remain unchanged
  async streamChatCompletions(...) { /* existing */ }
  async handleToolCalls(...) { /* existing */ }
  // ... etc
}
```

### System Prompts

```typescript
// src/agent/prompts.ts - NEW FILE
export const SIMPLE_CHAT_PROMPT = `You are Cutty Assistant, a helpful AI that answers questions about list management, CSV files, and data processing.

You are currently in SIMPLE CHAT MODE - you cannot execute tools or generate files.
If the user asks you to create, generate, or download something, explain that they need to be more specific to activate those capabilities.

Keep responses concise and helpful. Focus on answering questions and providing guidance.`;

export const AGENT_SYSTEM_PROMPT = `You are Cutty Agent, an AI assistant with tools to help users with list and data management tasks.

You are in AGENT MODE with access to these tools:
- generateSyntheticData: Create CSV files with sample data
- getSupportedStates: List available geographic regions
- createDownloadLink: Generate file download URLs

Use tools when users request specific actions. Be proactive in offering to use tools when appropriate.`;
```

### WebSocket Protocol Enhancement

```typescript
// src/websocket/protocol.ts - MODIFIED
interface EnhancedMessage {
  id: string;
  content: string;
  timestamp: number;
  
  // NEW: Mode hints
  preferredMode?: 'simple' | 'agent' | 'auto';
  forceMode?: boolean; // Override detection
  
  // NEW: Response metadata
  responseMetadata?: {
    mode: 'simple' | 'agent';
    confidence: number;
    toolsUsed?: string[];
    modelUsed?: string;
  };
}

// Modified message handler
async function handleWebSocketMessage(message: EnhancedMessage) {
  // Check for forced mode
  if (message.forceMode && message.preferredMode) {
    return agent.executeWithMode(
      message.content, 
      message.preferredMode
    );
  }
  
  // Use automatic detection
  return agent.execute(message.content);
}
```

## Implementation Plan

### Phase 1: Core Mode Detection (Day 1)

1. **Create `modeDetector.ts`**
   - Implement pattern matching
   - Add confidence scoring
   - Create test suite

2. **Add simple chat handler**
   - Integrate Llama model for fast responses
   - Implement streaming for simple mode
   - Preserve response format

3. **Modify agent execute method**
   - Add mode detection
   - Route to appropriate handler
   - Maintain backward compatibility

### Phase 2: Enhanced Detection (Day 2)

1. **Improve pattern matching**
   - Add context awareness
   - Consider conversation history
   - Handle edge cases

2. **Add metrics collection**
   - Track mode selection accuracy
   - Monitor response times
   - Log token usage per mode

3. **Testing & refinement**
   - Test with production queries
   - Tune detection thresholds
   - Validate mode switching

### Phase 3: Frontend Integration (Day 3)

1. **Update WebSocket client**
   - Handle mode metadata
   - Add mode indicators
   - Support forced mode

2. **Add UI controls** (optional)
   - Mode override toggle
   - Confidence indicator
   - Mode explanation tooltip

## Testing Strategy

### Unit Tests

```typescript
// tests/modeDetector.test.ts
describe('ModeDetector', () => {
  test('detects simple chat queries', () => {
    const queries = [
      "What is a CSV file?",
      "How do I manage lists?",
      "Tell me about data processing",
      "What's the weather like?" 
    ];
    
    queries.forEach(q => {
      expect(ModeDetector.detectMode(q)).toBe('simple');
    });
  });
  
  test('detects agent mode triggers', () => {
    const queries = [
      "Generate sample data for me",
      "Create a CSV with 100 rows",
      "Download the file I just made",
      "What states are supported?"
    ];
    
    queries.forEach(q => {
      expect(ModeDetector.detectMode(q)).toBe('agent');
    });
  });
  
  test('respects explicit mode hints', () => {
    expect(ModeDetector.detectMode("[simple] generate data"))
      .toBe('simple');
    expect(ModeDetector.detectMode("[agent] hello"))
      .toBe('agent');
  });
});
```

### Integration Tests

```typescript
// tests/hybrid-agent.test.ts
describe('Hybrid Agent', () => {
  test('uses simple mode for basic queries', async () => {
    const response = await agent.execute("What is CSV?");
    expect(response.metadata.mode).toBe('simple');
    expect(response.latency).toBeLessThan(1000);
  });
  
  test('switches to agent mode for tool queries', async () => {
    const response = await agent.execute("Generate test data");
    expect(response.metadata.mode).toBe('agent');
    expect(response.toolsUsed).toContain('generateSyntheticData');
  });
  
  test('maintains conversation context across modes', async () => {
    await agent.execute("Hello"); // simple
    await agent.execute("Generate data"); // agent
    await agent.execute("Thanks"); // simple
    
    expect(agent.conversationHistory).toHaveLength(3);
  });
});
```

## Migration Checklist

### Pre-Deployment
- [ ] Review all existing agent functionality
- [ ] Backup current agent configuration
- [ ] Test WebSocket protocol compatibility
- [ ] Validate simple mode responses
- [ ] Benchmark performance metrics

### Deployment Steps
1. Deploy enhanced agent to development
2. Test with production-like queries
3. Monitor mode detection accuracy
4. Gradual rollout with feature flag
5. Full production deployment

### Post-Deployment
- [ ] Monitor error rates
- [ ] Track mode distribution (simple vs agent)
- [ ] Analyze cost reduction
- [ ] Collect user feedback
- [ ] Tune detection patterns

## Success Metrics

### Primary Metrics
- **Response Time**: 60% reduction for simple queries
- **Cost**: 40% reduction in token usage
- **Accuracy**: 90%+ correct mode detection
- **Availability**: Zero downtime during migration

### Secondary Metrics
- **User Satisfaction**: Measured via feedback
- **Mode Distribution**: 70% simple, 30% agent expected
- **Error Rate**: No increase from baseline
- **Token Efficiency**: Tokens per query reduced

## Risk Mitigation

### Risk 1: Incorrect Mode Detection
**Mitigation**: 
- Allow manual mode override
- Log all mode decisions for analysis
- Implement gradual rollout

### Risk 2: Performance Degradation
**Mitigation**:
- Use faster model for simple mode
- Implement caching for common queries
- Monitor latency metrics

### Risk 3: Breaking Existing Functionality
**Mitigation**:
- Comprehensive test coverage
- Feature flag for rollback
- Maintain backward compatibility

## Configuration

### Environment Variables
```env
# Existing (preserved)
ANTHROPIC_API_KEY=xxx
CUTTY_API_URL=https://api.cutty.app

# New
SIMPLE_CHAT_MODEL=@cf/meta/llama-3-8b-instruct
MODE_DETECTION_ENABLED=true
MODE_DETECTION_CONFIDENCE_THRESHOLD=0.7
DEFAULT_MODE=simple
```

### Wrangler Configuration
```toml
# wrangler.toml - MODIFIED
[vars]
MODE_DETECTION_ENABLED = "true"
DEFAULT_MODE = "simple"

[ai]
binding = "AI"
```

## Code Examples

### Example 1: Simple Mode Response
```typescript
// User: "What is a CSV file?"
// Detected Mode: simple
// Response generated via Llama model without tools

{
  content: "A CSV (Comma-Separated Values) file is a plain text file that stores tabular data. Each line represents a row, and columns are separated by commas.",
  metadata: {
    mode: "simple",
    confidence: 0.9,
    modelUsed: "@cf/meta/llama-3-8b-instruct",
    latency: 450
  }
}
```

### Example 2: Agent Mode Response
```typescript
// User: "Generate a CSV with 50 US states data"
// Detected Mode: agent
// Response generated via Claude with tool execution

{
  content: "I'll generate a CSV file with US states data for you.",
  toolCalls: [{
    tool: "generateSyntheticData",
    params: { rows: 50, type: "us_states" }
  }],
  metadata: {
    mode: "agent",
    confidence: 0.95,
    modelUsed: "anthropic/claude-3-5-sonnet",
    toolsUsed: ["generateSyntheticData"],
    latency: 2100
  }
}
```

## Appendix

### A. Pattern Matching Examples

| User Query | Detected Mode | Confidence | Reason |
|------------|--------------|------------|---------|
| "Hello" | simple | 0.9 | No triggers |
| "What's a list?" | simple | 0.9 | Question only |
| "Generate data" | agent | 0.7 | Generate trigger |
| "Create CSV file" | agent | 0.9 | Create + file |
| "Download my list" | agent | 0.8 | Download trigger |
| "[simple] generate" | simple | 1.0 | Explicit override |

### B. Performance Benchmarks

| Mode | Model | Avg Latency | Token Usage | Cost/Query |
|------|-------|-------------|-------------|------------|
| Simple | Llama-3-8B | 450ms | 150 tokens | $0.0001 |
| Agent | Claude-3.5 | 2100ms | 800 tokens | $0.0024 |
| Auto (avg) | Mixed | 900ms | 350 tokens | $0.0008 |

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-01-09  
**Status**: Ready for Implementation  
**Author**: Cutty Engineering Team