import { describe, expect, it, vi, beforeEach } from "vitest";
import { globalSessionManager } from "./global-session-manager";
import { tools } from "./tools";

// Mock fetch for API calls
global.fetch = vi.fn();

describe("Origin Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear all sessions - globalSessionManager doesn't have clearAll method
    // so we'll just create a new session for each test
  });

  describe("End-to-end origin flow", () => {
    it("should use cutty-dev API when session origin is cutty-dev", async () => {
      // Set up session with cutty-dev origin
      globalSessionManager.createSession("test-session", "https://cutty-dev.emilycogsdill.com");
      globalSessionManager.setCurrentSession("test-session", "https://cutty-dev.emilycogsdill.com");

      // Mock successful API response
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          file: {
            id: "test-file-id",
            name: "test.csv",
            size: 1024,
            type: "text/csv",
            downloadUrl: "/api/v1/synthetic-data/download/test-file-id"
          }
        })
      });

      // Execute synthetic data generation
      const result = await tools.generateSyntheticData.execute({
        count: 10,
        state: "CA"
      });

      // Verify the API was called with cutty-dev URL
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("https://cutty-dev.emilycogsdill.com/api/v1/synthetic-data/generate"),
        expect.any(Object)
      );

      // Verify the download URL uses cutty-dev
      expect(result.success).toBe(true);
      if (result.success && result.downloadUrl) {
        expect(result.downloadUrl).toContain("https://cutty-dev.emilycogsdill.com");
      }
    });

    it("should use production API when session origin is production", async () => {
      // Set up session with production origin
      globalSessionManager.createSession("test-session", "https://cutty.emilycogsdill.com");
      globalSessionManager.setCurrentSession("test-session", "https://cutty.emilycogsdill.com");

      // Mock successful API response
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          file: {
            id: "test-file-id",
            name: "test.csv",
            size: 1024,
            type: "text/csv",
            downloadUrl: "/api/v1/synthetic-data/download/test-file-id"
          }
        })
      });

      // Execute synthetic data generation
      const result = await tools.generateSyntheticData.execute({
        count: 10,
        state: "CA"
      });

      // Verify the API was called with production URL
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("https://cutty.emilycogsdill.com/api/v1/synthetic-data/generate"),
        expect.any(Object)
      );

      // Verify the download URL uses production
      expect(result.success).toBe(true);
      if (result.success && result.downloadUrl) {
        expect(result.downloadUrl).toContain("https://cutty.emilycogsdill.com");
        expect(result.downloadUrl).not.toContain("cutty-dev");
      }
    });

    it("should fail gracefully with invalid origin", async () => {
      // Set up session with invalid origin
      globalSessionManager.createSession("test-session", "https://invalid.com");
      globalSessionManager.setCurrentSession("test-session", "https://invalid.com");

      // The session should default to production origin
      const sessionState = globalSessionManager.getCurrentSessionState();
      expect(sessionState?.origin).toBe("https://cutty.emilycogsdill.com");
    });
  });

  describe("CSP compliance", () => {
    it("should never cross origins between dev and prod", async () => {
      // Test that when on cutty-dev, we never call cutty production
      globalSessionManager.createSession("dev-session", "https://cutty-dev.emilycogsdill.com");
      globalSessionManager.setCurrentSession("dev-session", "https://cutty-dev.emilycogsdill.com");

      const sessionState = globalSessionManager.getCurrentSessionState();
      expect(sessionState?.origin).toBe("https://cutty-dev.emilycogsdill.com");

      // Any API client created should use dev origin
      const { CuttyAPIClient } = await import("./cutty-api");
      const client = new CuttyAPIClient(undefined, sessionState!.origin);
      
      const baseUrl = client.getBaseURL();
      expect(baseUrl).toBe("https://cutty-dev.emilycogsdill.com");
      expect(baseUrl).not.toContain("cutty.emilycogsdill.com/api"); // No prod URL
    });

    it("should maintain origin consistency throughout session", async () => {
      // Create session with dev origin
      globalSessionManager.createSession("test-session", "https://cutty-dev.emilycogsdill.com");
      globalSessionManager.setCurrentSession("test-session", "https://cutty-dev.emilycogsdill.com");

      // Store a generated file
      globalSessionManager.storeGeneratedFile({
        fileId: "test-123",
        filename: "test.csv",
        downloadUrl: "https://cutty-dev.emilycogsdill.com/api/v1/synthetic-data/download/test-123",
        generatedAt: new Date().toISOString()
      });

      // Retrieve the file - should maintain dev URL
      const lastFile = globalSessionManager.getLastGeneratedFile();
      expect(lastFile?.downloadUrl).toContain("cutty-dev.emilycogsdill.com");
      expect(lastFile?.downloadUrl).not.toContain("cutty.emilycogsdill.com/api");
    });
  });
});