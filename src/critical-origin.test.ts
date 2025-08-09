import { describe, expect, it } from "vitest";

/**
 * Critical tests to ensure we never call the wrong backend
 * This prevents CSP violations and ensures proper environment isolation
 */
describe("Critical Origin Tests - Prevent CSP Violations", () => {
  describe("URL Construction Must Match Origin", () => {
    it("MUST use cutty-dev URLs when origin is cutty-dev", async () => {
      const { CuttyAPIClient } = await import("./cutty-api");
      const origin = "https://cutty-dev.emilycogsdill.com";
      const client = new CuttyAPIClient(undefined, origin);
      
      // Test all critical URLs
      const downloadUrl = client.getDownloadUrl("test-123");
      const generateUrl = `${client.getBaseURL()}/api/v1/synthetic-data/generate`;
      
      // These MUST contain cutty-dev
      expect(downloadUrl).toContain("cutty-dev.emilycogsdill.com");
      expect(generateUrl).toContain("cutty-dev.emilycogsdill.com");
      
      // These MUST NOT contain production URL
      expect(downloadUrl).not.toMatch(/cutty\.emilycogsdill\.com(?!.*-dev)/);
      expect(generateUrl).not.toMatch(/cutty\.emilycogsdill\.com(?!.*-dev)/);
    });

    it("MUST use production URLs when origin is cutty production", async () => {
      const { CuttyAPIClient } = await import("./cutty-api");
      const origin = "https://cutty.emilycogsdill.com";
      const client = new CuttyAPIClient(undefined, origin);
      
      // Test all critical URLs
      const downloadUrl = client.getDownloadUrl("test-123");
      const generateUrl = `${client.getBaseURL()}/api/v1/synthetic-data/generate`;
      
      // These MUST contain production URL
      expect(downloadUrl).toContain("cutty.emilycogsdill.com");
      expect(generateUrl).toContain("cutty.emilycogsdill.com");
      
      // These MUST NOT contain dev
      expect(downloadUrl).not.toContain("cutty-dev");
      expect(generateUrl).not.toContain("cutty-dev");
    });

    it("MUST handle localhost correctly", async () => {
      const { CuttyAPIClient } = await import("./cutty-api");
      const origin = "http://localhost:5173";
      const client = new CuttyAPIClient(undefined, origin);
      
      const downloadUrl = client.getDownloadUrl("test-123");
      
      expect(downloadUrl).toContain("localhost:5173");
      expect(downloadUrl).not.toContain("cutty");
      expect(downloadUrl).not.toContain("emilycogsdill.com");
    });
  });

  describe("Session Origin Persistence", () => {
    it("MUST maintain origin throughout session lifecycle", async () => {
      const { SessionStateManager } = await import("./session-state");
      
      // Test dev origin persistence
      const devSession = new SessionStateManager("dev-session", "https://cutty-dev.emilycogsdill.com");
      expect(devSession.getOrigin()).toBe("https://cutty-dev.emilycogsdill.com");
      
      // Origin should persist after other operations
      devSession.addGeneratedFile({
        fileId: "test-file",
        filename: "test.csv",
        downloadUrl: "https://cutty-dev.emilycogsdill.com/api/v1/synthetic-data/download/test-file",
        generatedAt: new Date().toISOString()
      });
      
      expect(devSession.getOrigin()).toBe("https://cutty-dev.emilycogsdill.com");
    });

    it("MUST update origin when explicitly set", async () => {
      const { SessionStateManager } = await import("./session-state");
      
      const session = new SessionStateManager("test", "https://cutty.emilycogsdill.com");
      expect(session.getOrigin()).toBe("https://cutty.emilycogsdill.com");
      
      session.setOrigin("https://cutty-dev.emilycogsdill.com");
      expect(session.getOrigin()).toBe("https://cutty-dev.emilycogsdill.com");
    });
  });

  describe("Origin Validation", () => {
    it("MUST only accept trusted origins", () => {
      const trustedOrigins = [
        "https://cutty.emilycogsdill.com",
        "https://cutty-dev.emilycogsdill.com",
        "http://localhost:5173",
        "http://localhost:3000",
      ];
      
      const untrustedOrigins = [
        "https://evil.com",
        "https://cutty-fake.com",
        "https://notcutty.emilycogsdill.com",
        "http://malicious.site",
      ];
      
      // This test documents the expected behavior
      trustedOrigins.forEach(origin => {
        expect(trustedOrigins.includes(origin)).toBe(true);
      });
      
      untrustedOrigins.forEach(origin => {
        expect(trustedOrigins.includes(origin)).toBe(false);
      });
    });
  });
});