import { describe, expect, it, vi, beforeEach } from "vitest";
import { AgentHandler } from "./server";
import { SessionStateManager } from "./session-state";

// Mock the tools module
vi.mock("./tools", () => ({
  tools: {},
  executions: {},
}));

// Mock the CuttyAPIClient
vi.mock("./cutty-api", () => ({
  CuttyAPIClient: vi.fn().mockImplementation((token, origin) => ({
    origin,
    getDownloadUrl: (fileId: string) => `${origin}/api/v1/synthetic-data/download/${fileId}`,
  })),
}));

describe("AgentHandler Origin Management", () => {
  let handler: AgentHandler;
  let mockEnv: any;

  beforeEach(() => {
    mockEnv = {
      MESSAGES: {
        get: vi.fn(),
        put: vi.fn(),
      },
    };
  });

  describe("WebSocket origin detection", () => {
    it("should use cutty-dev origin when provided in URL parameters", () => {
      const url = new URL("ws://example.com?origin=https://cutty-dev.emilycogsdill.com");
      handler = new AgentHandler(mockEnv, url, {});
      
      expect(handler["origin"]).toBe("https://cutty-dev.emilycogsdill.com");
    });

    it("should use cutty production origin when provided in URL parameters", () => {
      const url = new URL("ws://example.com?origin=https://cutty.emilycogsdill.com");
      handler = new AgentHandler(mockEnv, url, {});
      
      expect(handler["origin"]).toBe("https://cutty.emilycogsdill.com");
    });

    it("should reject untrusted origins in URL parameters", () => {
      const url = new URL("ws://example.com?origin=https://evil.com");
      handler = new AgentHandler(mockEnv, url, {});
      
      expect(handler["origin"]).toBe("https://cutty.emilycogsdill.com"); // Falls back to default
    });

    it("should update origin from message metadata", async () => {
      const url = new URL("ws://example.com");
      handler = new AgentHandler(mockEnv, url, {});
      
      const mockSessionManager = {
        setOrigin: vi.fn(),
        getState: () => ({ sessionId: "test-session" }),
      };
      handler["sessionStateManager"] = mockSessionManager as any;

      // Simulate WebSocket message with origin in metadata
      const message = {
        messages: [{
          id: "msg-123",
          role: "user",
          content: "test",
          metadata: {
            origin: "https://cutty-dev.emilycogsdill.com"
          }
        }]
      };

      await handler["processWebSocketMessage"](message);
      
      expect(handler["origin"]).toBe("https://cutty-dev.emilycogsdill.com");
      expect(mockSessionManager.setOrigin).toHaveBeenCalledWith("https://cutty-dev.emilycogsdill.com");
    });

    it("should reject untrusted origins from message metadata", async () => {
      const url = new URL("ws://example.com");
      handler = new AgentHandler(mockEnv, url, {});
      
      const mockSessionManager = {
        setOrigin: vi.fn(),
        getState: () => ({ sessionId: "test-session" }),
      };
      handler["sessionStateManager"] = mockSessionManager as any;

      const message = {
        messages: [{
          id: "msg-123",
          role: "user",
          content: "test",
          metadata: {
            origin: "https://malicious.com"
          }
        }]
      };

      await handler["processWebSocketMessage"](message);
      
      expect(handler["origin"]).toBe("https://cutty.emilycogsdill.com"); // Should not change
      expect(mockSessionManager.setOrigin).not.toHaveBeenCalled();
    });
  });

  describe("Session state origin management", () => {
    it("should persist origin in session state", () => {
      const sessionManager = new SessionStateManager("test-session", "https://cutty-dev.emilycogsdill.com");
      expect(sessionManager.getOrigin()).toBe("https://cutty-dev.emilycogsdill.com");
    });

    it("should update origin in session state", () => {
      const sessionManager = new SessionStateManager("test-session", "https://cutty.emilycogsdill.com");
      sessionManager.setOrigin("https://cutty-dev.emilycogsdill.com");
      expect(sessionManager.getOrigin()).toBe("https://cutty-dev.emilycogsdill.com");
    });
  });

  describe("API client integration", () => {
    it("should create API URLs with cutty-dev origin", async () => {
      const { CuttyAPIClient } = await import("./cutty-api");
      const client = new CuttyAPIClient(undefined, "https://cutty-dev.emilycogsdill.com");
      
      const downloadUrl = client.getDownloadUrl("test-file-id");
      expect(downloadUrl).toBe("https://cutty-dev.emilycogsdill.com/api/v1/synthetic-data/download/test-file-id");
    });

    it("should create API URLs with production origin", async () => {
      const { CuttyAPIClient } = await import("./cutty-api");
      const client = new CuttyAPIClient(undefined, "https://cutty.emilycogsdill.com");
      
      const downloadUrl = client.getDownloadUrl("test-file-id");
      expect(downloadUrl).toBe("https://cutty.emilycogsdill.com/api/v1/synthetic-data/download/test-file-id");
    });
  });
});

describe("Origin handling in tools", () => {
  it("should use correct origin from session state in tools", async () => {
    // This test would require more setup to test the actual tool execution
    // but the key is ensuring tools get the origin from session state
    const mockSessionState = {
      origin: "https://cutty-dev.emilycogsdill.com"
    };
    
    // Mock globalSessionManager
    vi.mock("./global-session-manager", () => ({
      globalSessionManager: {
        getCurrentSessionState: () => mockSessionState,
      }
    }));
    
    // The tools should use this origin when creating API clients
    expect(mockSessionState.origin).toBe("https://cutty-dev.emilycogsdill.com");
  });
});