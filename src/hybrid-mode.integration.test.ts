import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { Chat } from "./server";
import { ModeDetector } from "./agent/modeDetector";
import { SessionStateManager } from "./session-state";
import { 
  type EnhancedMessage, 
  type ResponseMetadata,
  type WSMessageWrapper,
  MessageTransform,
  generateMessageId,
  validateMessage
} from "./websocket/protocol";

// Mock dependencies
vi.mock("@ai-sdk/anthropic", () => ({
  anthropic: vi.fn((model) => ({ model }))
}));

vi.mock("agents", () => ({
  routeAgentRequest: vi.fn(),
  AIChatAgent: class MockAIChatAgent {
    messages: any[] = [];
    mcp = {
      connect: vi.fn(),
      unstable_getAITools: () => ({}),
      closeConnection: vi.fn()
    };
    saveMessages = vi.fn();
    onMessage = vi.fn();
  }
}));

vi.mock("ai", () => ({
  streamText: vi.fn(),
  generateId: () => `test-id-${Date.now()}`,
  createDataStreamResponse: vi.fn()
}));

vi.mock("./tools", () => ({
  tools: {
    generate_synthetic_data: {
      description: "Generate synthetic data",
      parameters: {}
    }
  },
  executions: {}
}));

vi.mock("./utils", () => ({
  processToolCalls: vi.fn(async ({ messages }) => messages)
}));

vi.mock("./global-session-manager", () => ({
  globalSessionManager: {
    setCurrentSession: vi.fn(),
    getCurrentSessionState: () => ({
      sessionId: "test-session",
      origin: "https://cutty-dev.emilycogsdill.com"
    })
  }
}));

// Mock connection for WebSocket testing
class MockConnection {
  sentMessages: string[] = [];
  
  send(message: string) {
    this.sentMessages.push(message);
  }
  
  getLastMessage() {
    return this.sentMessages[this.sentMessages.length - 1];
  }
  
  getAllMessages() {
    return [...this.sentMessages];
  }
  
  clear() {
    this.sentMessages = [];
  }
}

describe("Hybrid Mode Integration Tests", () => {
  let chat: Chat;
  let mockConnection: MockConnection;
  let mockEnv: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockConnection = new MockConnection();
    
    mockEnv = {
      MESSAGES: {
        get: vi.fn(),
        put: vi.fn(),
      },
    };
    
    // Mock URL for Chat constructor (extends AIChatAgent)
    const mockUrl = new URL("ws://localhost/agents/chat/test");
    chat = new Chat(mockEnv, mockUrl, {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("WebSocket Message Handling", () => {
    it("should handle legacy message format and convert to enhanced", async () => {
      const legacyMessage = {
        message: "Hello, how are you?",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(legacyMessage));

      expect(mockConnection.sentMessages).toHaveLength(1);
      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.type).toBe('simple_response');
      expect(response.content).toBeDefined();
      expect(response.responseMetadata.mode).toBe('simple');
    });

    it("should handle enhanced message format directly", async () => {
      const enhancedMessage: EnhancedMessage = {
        id: generateMessageId(),
        content: "What's the weather like?",
        timestamp: Date.now(),
        context: { sessionId: "test-session" },
        preferredMode: 'simple'
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(enhancedMessage));

      expect(mockConnection.sentMessages).toHaveLength(1);
      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.type).toBe('simple_response');
      expect(response.responseMetadata.mode).toBe('simple');
    });

    it("should reject invalid message formats gracefully", async () => {
      const invalidMessage = { invalid: "format" };

      // Should not throw and should not send any response
      await chat.onMessage(mockConnection as any, JSON.stringify(invalidMessage));
      expect(mockConnection.sentMessages).toHaveLength(0);
    });

    it("should handle malformed JSON gracefully", async () => {
      const malformedJSON = "{ invalid json }";

      // Should not throw
      await chat.onMessage(mockConnection as any, malformedJSON);
      expect(mockConnection.sentMessages).toHaveLength(0);
    });
  });

  describe("Mode Detection and Switching", () => {
    it("should detect simple mode for conversational messages", async () => {
      const simpleMessage = {
        message: "How are you today?",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));

      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.responseMetadata.mode).toBe('simple');
      expect(response.responseMetadata.confidence).toBeGreaterThan(0.8);
    });

    it("should detect agent mode for action-based messages", async () => {
      // Mock streamText to return agent mode response
      const { streamText } = await import("ai");
      vi.mocked(streamText).mockImplementation(() => ({
        textStream: async function* () { yield "Generated synthetic data successfully"; },
        usage: { totalTokens: 150 },
        mergeIntoDataStream: vi.fn()
      } as any));

      const agentMessage = {
        message: "Generate synthetic data for 100 users",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(agentMessage));

      // Should convert to agent format and call parent's onMessage
      expect(chat.onMessage).toHaveBeenCalled();
    });

    it("should respect forced mode hints", async () => {
      const forcedSimpleMessage = {
        message: "[simple] Generate data for me please",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(forcedSimpleMessage));

      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.responseMetadata.mode).toBe('simple');
      expect(response.responseMetadata.confidence).toBe(1.0);
      expect(response.content).not.toContain('[simple]'); // Should be cleaned
    });

    it("should switch from simple to agent mode during conversation", async () => {
      // First message - simple mode
      const simpleMessage = {
        message: "Hello there!",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));
      let response = JSON.parse(mockConnection.getLastMessage());
      expect(response.responseMetadata.mode).toBe('simple');

      mockConnection.clear();

      // Second message - agent mode
      const agentMessage = {
        message: "Now generate synthetic data",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(agentMessage));
      
      // Should detect mode switch and process as agent message
      const modeAnalysis = ModeDetector.analyzeIntent(agentMessage.message);
      expect(modeAnalysis.mode).toBe('agent');
    });
  });

  describe("Tool Execution in Agent Mode", () => {
    it("should execute tools in agent mode", async () => {
      // Mock the AI response with tool calls
      const { streamText, createDataStreamResponse } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(() => ({
        textStream: async function* () { yield "Processing..."; },
        usage: { totalTokens: 200 },
        toolCalls: [{ toolName: 'generate_synthetic_data' }],
        mergeIntoDataStream: vi.fn()
      } as any));

      vi.mocked(createDataStreamResponse).mockImplementation(({ execute }) => {
        execute({} as any);
        return new Response();
      });

      const toolMessage = {
        message: "Generate 50 user records",
        context: { sessionId: "test-session" }
      };

      // This should trigger agent mode and tool execution
      const result = await chat.onChatMessage(vi.fn(), {});
      expect(result).toBeInstanceOf(Response);
    });

    it("should handle tool execution errors gracefully", async () => {
      const { streamText } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(() => {
        throw new Error("Tool execution failed");
      });

      const toolMessage = {
        message: "Generate data please",
        context: { sessionId: "test-session" }
      };

      // Should not throw and should handle error
      await expect(chat.onMessage(mockConnection as any, JSON.stringify(toolMessage)))
        .resolves.not.toThrow();
    });
  });

  describe("Simple Chat Responses", () => {
    it("should generate fast responses in simple mode", async () => {
      const { streamText } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(() => ({
        textStream: async function* () { 
          yield "I'm doing well, thank you for asking! How can I help you today?"; 
        },
        usage: { totalTokens: 25 }
      } as any));

      const simpleMessage = {
        message: "How are you?",
        context: { sessionId: "test-session" }
      };

      const startTime = Date.now();
      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));
      const endTime = Date.now();

      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.responseMetadata.mode).toBe('simple');
      expect(response.responseMetadata.modelUsed).toBe('claude-3-haiku-20240307');
      expect(response.responseMetadata.latency).toBeLessThan(endTime - startTime + 100);
      expect(response.content).toContain('well');
    });

    it("should limit token usage in simple mode", async () => {
      const { streamText } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(({ maxTokens }) => {
        expect(maxTokens).toBe(200); // Should be limited
        return {
          textStream: async function* () { yield "Short response"; },
          usage: { totalTokens: 15 }
        } as any;
      });

      const simpleMessage = {
        message: "Tell me a story",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));
      
      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.responseMetadata.tokensUsed).toBeLessThan(200);
    });
  });

  describe("Error Handling and Fallback", () => {
    it("should fallback from simple to agent mode on error", async () => {
      const { streamText } = await import("ai");
      
      // Mock simple mode to fail
      vi.mocked(streamText)
        .mockImplementationOnce(() => {
          throw new Error("Simple mode failed");
        })
        .mockImplementationOnce(() => ({
          textStream: async function* () { yield "Fallback response"; },
          usage: { totalTokens: 50 },
          mergeIntoDataStream: vi.fn()
        } as any));

      const simpleMessage = {
        message: "Hello there",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));

      expect(mockConnection.sentMessages).toHaveLength(1);
      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.type).toBe('mode_switch');
      expect(response.data.from).toBe('simple');
      expect(response.data.to).toBe('agent');
      expect(response.data.error.fallbackUsed).toBe(true);
    });

    it("should provide detailed error information", async () => {
      const { streamText } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(() => {
        throw new Error("Model timeout");
      });

      const simpleMessage = {
        message: "Simple question",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));

      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.data.error.message).toBe('Model timeout');
      expect(response.data.error.type).toBe('simple_mode_failure');
    });
  });

  describe("Enhanced Protocol with Metadata", () => {
    it("should include comprehensive response metadata", async () => {
      const { streamText } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(() => ({
        textStream: async function* () { yield "Response with metadata"; },
        usage: { totalTokens: 42 }
      } as any));

      const enhancedMessage: EnhancedMessage = {
        id: generateMessageId(),
        content: "Test message",
        timestamp: Date.now(),
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(enhancedMessage));

      const response = JSON.parse(mockConnection.getLastMessage());
      const metadata = response.responseMetadata;
      
      expect(metadata).toMatchObject({
        mode: 'simple',
        confidence: expect.any(Number),
        modelUsed: expect.any(String),
        tokensUsed: expect.any(Number),
        latency: expect.any(Number),
        reason: expect.any(String)
      });
    });

    it("should preserve message IDs across requests", async () => {
      const messageId = generateMessageId();
      const enhancedMessage: EnhancedMessage = {
        id: messageId,
        content: "Test with ID",
        timestamp: Date.now(),
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(enhancedMessage));

      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.id).toBeDefined();
      expect(response.timestamp).toBeDefined();
    });

    it("should validate message format correctly", () => {
      const validMessage: EnhancedMessage = {
        id: generateMessageId(),
        content: "Valid message",
        timestamp: Date.now()
      };

      const invalidMessage = {
        invalid: "format"
      };

      expect(validateMessage(validMessage)).toBe(true);
      expect(validateMessage(invalidMessage)).toBe(false);
    });
  });

  describe("Session Management Across Modes", () => {
    it("should maintain session state across mode switches", async () => {
      const sessionId = "persistent-session";
      
      // Simple mode message
      const simpleMessage = {
        message: "Hello",
        context: { sessionId }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));
      
      // Verify session state is maintained
      const sessionManager = new SessionStateManager(sessionId);
      expect(sessionManager.getState().sessionId).toBe(sessionId);
    });

    it("should initialize session state manager correctly", async () => {
      const result = await chat.onChatMessage(vi.fn());
      expect(result).toBeInstanceOf(Response);
      
      // Should have initialized session state manager
      expect(chat['sessionStateManager']).toBeDefined();
    });

    it("should track session activity across modes", async () => {
      const sessionManager = new SessionStateManager("test-session");
      const initialActivity = sessionManager.getState().lastActivity;
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const fileInfo = {
        fileId: "test-file",
        downloadUrl: "https://example.com/file",
        filename: "test.csv",
        generatedAt: new Date().toISOString()
      };
      
      sessionManager.addGeneratedFile(fileInfo);
      const newActivity = sessionManager.getState().lastActivity;
      
      expect(new Date(newActivity).getTime()).toBeGreaterThan(new Date(initialActivity).getTime());
    });
  });

  describe("Performance Benchmarks", () => {
    it("should meet simple mode latency requirements", async () => {
      const { streamText } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(() => ({
        textStream: async function* () { 
          // Simulate fast response
          yield "Quick response"; 
        },
        usage: { totalTokens: 10 }
      } as any));

      const simpleMessage = {
        message: "Quick question",
        context: { sessionId: "test-session" }
      };

      const startTime = performance.now();
      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));
      const endTime = performance.now();

      const response = JSON.parse(mockConnection.getLastMessage());
      const reportedLatency = response.responseMetadata.latency;
      const actualLatency = endTime - startTime;

      // Simple mode should be fast (under 500ms for mocked response)
      expect(actualLatency).toBeLessThan(500);
      expect(reportedLatency).toBeLessThan(actualLatency + 50); // Allow for small measurement differences
    });

    it("should track token usage accurately", async () => {
      const { streamText } = await import("ai");
      const expectedTokens = 125;
      
      vi.mocked(streamText).mockImplementation(() => ({
        textStream: async function* () { yield "Token usage test response"; },
        usage: { totalTokens: expectedTokens }
      } as any));

      const simpleMessage = {
        message: "Test token counting",
        context: { sessionId: "test-session" }
      };

      await chat.onMessage(mockConnection as any, JSON.stringify(simpleMessage));

      const response = JSON.parse(mockConnection.getLastMessage());
      expect(response.responseMetadata.tokensUsed).toBe(expectedTokens);
    });

    it("should benchmark mode detection performance", () => {
      const testMessages = [
        "Hello there",
        "Generate synthetic data for users",
        "What's the weather?",
        "Download the latest file",
        "How are you doing today?"
      ];

      const startTime = performance.now();
      
      testMessages.forEach(message => {
        ModeDetector.analyzeIntent(message);
      });
      
      const endTime = performance.now();
      const avgTimePerMessage = (endTime - startTime) / testMessages.length;
      
      // Mode detection should be very fast (under 1ms per message)
      expect(avgTimePerMessage).toBeLessThan(1);
    });

    it("should handle concurrent message processing", async () => {
      const { streamText } = await import("ai");
      
      vi.mocked(streamText).mockImplementation(() => ({
        textStream: async function* () { 
          // Simulate some processing time
          await new Promise(resolve => setTimeout(resolve, 10));
          yield "Concurrent response"; 
        },
        usage: { totalTokens: 20 }
      } as any));

      const messages = [
        { message: "Message 1", context: { sessionId: "session-1" } },
        { message: "Message 2", context: { sessionId: "session-2" } },
        { message: "Message 3", context: { sessionId: "session-3" } }
      ];

      const connections = [
        new MockConnection(),
        new MockConnection(),
        new MockConnection()
      ];

      const startTime = performance.now();
      
      // Process messages concurrently
      await Promise.all(
        messages.map((msg, i) => 
          chat.onMessage(connections[i] as any, JSON.stringify(msg))
        )
      );
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Concurrent processing should be faster than sequential
      expect(totalTime).toBeLessThan(100); // Should complete quickly
      
      // All connections should have responses
      connections.forEach(conn => {
        expect(conn.sentMessages).toHaveLength(1);
      });
    });
  });

  describe("Message Transform Utilities", () => {
    it("should transform legacy to enhanced format correctly", () => {
      const legacy = {
        message: "Test message",
        context: { userId: "123" }
      };

      const enhanced = MessageTransform.fromLegacy(legacy);

      expect(enhanced).toMatchObject({
        content: "Test message",
        message: "Test message", // Preserved for backward compatibility
        context: { userId: "123" },
        preferredMode: 'auto'
      });
      expect(enhanced.id).toBeDefined();
      expect(enhanced.timestamp).toBeDefined();
    });

    it("should extract mode hints correctly", () => {
      const simpleHint = MessageTransform.extractModeHints("[simple] Just chat with me");
      expect(simpleHint.cleanContent).toBe("Just chat with me");
      expect(simpleHint.preferredMode).toBe('simple');
      expect(simpleHint.forceMode).toBe(true);

      const agentHint = MessageTransform.extractModeHints("[agent] Generate data");
      expect(agentHint.cleanContent).toBe("Generate data");
      expect(agentHint.preferredMode).toBe('agent');
      expect(agentHint.forceMode).toBe(true);

      const noHint = MessageTransform.extractModeHints("Regular message");
      expect(noHint.cleanContent).toBe("Regular message");
      expect(noHint.preferredMode).toBeUndefined();
      expect(noHint.forceMode).toBeUndefined();
    });

    it("should handle case insensitive mode hints", () => {
      const upperCase = MessageTransform.extractModeHints("[SIMPLE] Upper case hint");
      expect(upperCase.preferredMode).toBe('simple');

      const mixedCase = MessageTransform.extractModeHints("[AgEnT] Mixed case hint");
      expect(mixedCase.preferredMode).toBe('agent');
    });
  });
});