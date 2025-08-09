import { describe, expect, it } from "vitest";
import { CuttyAPIClient } from "./cutty-api";

describe("CuttyAPIClient", () => {
  describe("Origin-based URL construction", () => {
    it("should use cutty-dev backend when origin is cutty-dev", () => {
      const client = new CuttyAPIClient(undefined, "https://cutty-dev.emilycogsdill.com");
      
      expect(client.getBaseURL()).toBe("https://cutty-dev.emilycogsdill.com");
      expect(client.getDownloadUrl("file-123")).toBe(
        "https://cutty-dev.emilycogsdill.com/api/v1/synthetic-data/download/file-123"
      );
    });

    it("should use cutty production backend when origin is cutty", () => {
      const client = new CuttyAPIClient(undefined, "https://cutty.emilycogsdill.com");
      
      expect(client.getBaseURL()).toBe("https://cutty.emilycogsdill.com");
      expect(client.getDownloadUrl("file-123")).toBe(
        "https://cutty.emilycogsdill.com/api/v1/synthetic-data/download/file-123"
      );
    });

    it("should use localhost backend when origin is localhost", () => {
      const client = new CuttyAPIClient(undefined, "http://localhost:5173");
      
      expect(client.getBaseURL()).toBe("http://localhost:5173");
      expect(client.getDownloadUrl("file-123")).toBe(
        "http://localhost:5173/api/v1/synthetic-data/download/file-123"
      );
    });

    it("should handle authenticated download URLs", () => {
      const client = new CuttyAPIClient("auth-token", "https://cutty-dev.emilycogsdill.com");
      
      const authenticatedUrl = client.getDownloadUrl("file-123", false);
      expect(authenticatedUrl).toBe(
        "https://cutty-dev.emilycogsdill.com/api/v1/files/file-123"
      );
    });
  });

  describe("API endpoint construction", () => {
    it("should construct correct endpoints for cutty-dev", async () => {
      const client = new CuttyAPIClient(undefined, "https://cutty-dev.emilycogsdill.com");
      
      // Test various API endpoints
      const endpoints = [
        "/synthetic-data/generate",
        "/synthetic-data/supported-states",
        "/files/123",
      ];

      for (const endpoint of endpoints) {
        const url = `${client.getBaseURL()}/api/v1${endpoint}`;
        expect(url).toContain("cutty-dev.emilycogsdill.com");
        expect(url).not.toContain("cutty.emilycogsdill.com/api/v1"); // No production URL
      }
    });

    it("should construct correct endpoints for production", async () => {
      const client = new CuttyAPIClient(undefined, "https://cutty.emilycogsdill.com");
      
      // Test various API endpoints
      const endpoints = [
        "/synthetic-data/generate",
        "/synthetic-data/supported-states",
        "/files/123",
      ];

      for (const endpoint of endpoints) {
        const url = `${client.getBaseURL()}/api/v1${endpoint}`;
        expect(url).toContain("cutty.emilycogsdill.com");
        expect(url).not.toContain("cutty-dev");
      }
    });
  });

  describe("Origin updates", () => {
    it("should allow updating origin", () => {
      const client = new CuttyAPIClient(undefined, "https://cutty.emilycogsdill.com");
      
      expect(client.getBaseURL()).toBe("https://cutty.emilycogsdill.com");
      
      client.setOrigin("https://cutty-dev.emilycogsdill.com");
      
      expect(client.getBaseURL()).toBe("https://cutty-dev.emilycogsdill.com");
      expect(client.getDownloadUrl("file-123")).toBe(
        "https://cutty-dev.emilycogsdill.com/api/v1/synthetic-data/download/file-123"
      );
    });
  });
});