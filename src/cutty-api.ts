/**
 * Cutty API Client
 *
 * Handles communication with the Cutty app backend for synthetic data operations
 */

import { fetchWithTimeout, withRetry } from "./retry-utils";

export interface SyntheticDataResponse {
  success: boolean;
  file?: {
    id: string;
    name: string;
    size: number;
    type: string;
    downloadUrl: string;
  };
  metadata?: {
    recordCount: number;
    generatedAt: string;
    state?: string;
    states?: string[];
  };
  error?: string;
  details?: string[];
}

export interface SupportedStatesResponse {
  success: boolean;
  states: string[];
  error?: string;
}

export class CuttyAPIClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    // Use environment-based configuration
    if (!baseURL) {
      // Check for environment variable first (server-side)
      if (typeof process !== "undefined" && process.env?.CUTTY_API_BASE_URL) {
        baseURL = process.env.CUTTY_API_BASE_URL;
      } else if (typeof window !== "undefined") {
        // Client-side: determine based on hostname
        const hostname = window.location.hostname;
        if (hostname === "localhost") {
          baseURL = "http://localhost:8787";
        } else if (
          hostname === "cutty-dev.emilycogsdill.com" ||
          hostname === "cutty-agent-dev.emilycogsdill.com"
        ) {
          // Only use dev API for specific dev domains
          baseURL = "https://cutty-dev.emilycogsdill.com";
        } else {
          // Production domains (cutty.emilycogsdill.com, cutty-agent.emilycogsdill.com)
          baseURL = "https://cutty.emilycogsdill.com";
        }
      } else {
        // Server-side default - use dev URL for now since that's what we need to fix
        baseURL = "https://cutty-dev.emilycogsdill.com";
      }
    }
    // Remove trailing slash if present
    this.baseURL = baseURL.replace(/\/$/, "");
  }

  /**
   * Generate synthetic patient data
   */
  async generateSyntheticData(params: {
    count: number;
    states?: string[];
  }): Promise<SyntheticDataResponse> {
    return withRetry(
      async () => {
        try {
          const response = await fetchWithTimeout(
            `${this.baseURL}/api/v1/synthetic-data/generate`,
            {
              body: JSON.stringify({
                count: params.count,
                ...(params.states &&
                  params.states.length > 0 && { states: params.states }),
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              timeout: 60000, // 60 second timeout for generation
            }
          );

          if (!response.ok) {
            const errorData = (await response
              .json()
              .catch(() => ({ error: "Unknown error" }))) as {
              error?: string;
              details?: string[];
            };

            // Add status to error for retry logic
            const error: any = new Error(
              errorData.error || `HTTP error! status: ${response.status}`
            );
            error.status = response.status;
            throw error;
          }

          const data = (await response.json()) as SyntheticDataResponse;
          return data;
        } catch (error: any) {
          console.error("Failed to generate synthetic data:", error);

          // Re-throw with additional context
          if (error.message.includes("timeout")) {
            error.message =
              "Request timed out. Large data generation may take longer than expected.";
          }
          throw error;
        }
      },
      {
        maxRetries: 3,
        retryDelay: 2000,
        shouldRetry: (error) => {
          // Don't retry on client errors except 429 (rate limit)
          if (error.status === 429) return true;
          if (error.status >= 400 && error.status < 500) return false;
          return true;
        },
      }
    ).catch((error) => {
      // Convert error to response format
      return {
        details: error.details || [],
        error: error instanceof Error ? error.message : "Network error",
        success: false,
      };
    });
  }

  /**
   * Get list of supported states for synthetic data generation
   */
  async getSupportedStates(): Promise<string[]> {
    return withRetry(
      async () => {
        try {
          const response = await fetchWithTimeout(
            `${this.baseURL}/api/v1/synthetic-data/supported-states`,
            { timeout: 10000 } // 10 second timeout
          );

          if (!response.ok) {
            console.warn("Failed to fetch supported states, using defaults");
            // Return default states if API fails
            return ["CA", "FL", "GA", "IL", "NY", "OH", "PA", "TX"];
          }

          const data: SupportedStatesResponse = await response.json();
          return data.states || [];
        } catch (error) {
          console.error("Failed to fetch supported states:", error);
          // Return default states on error
          return ["CA", "FL", "GA", "IL", "NY", "OH", "PA", "TX"];
        }
      },
      {
        maxRetries: 2,
        retryDelay: 1000,
      }
    );
  }

  /**
   * Get the base URL for this client instance
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Construct download URL for a file
   * This should match the format returned by the backend API
   */
  getDownloadUrl(fileId: string, isAnonymous: boolean = true): string {
    if (isAnonymous) {
      return `/api/v1/synthetic-data/download/${fileId}`;
    }
    return `/api/v1/files/${fileId}`;
  }

  /**
   * Trigger file download in browser
   */
  async downloadFile(downloadUrl: string, filename?: string): Promise<boolean> {
    try {
      // For anonymous downloads, we can use direct navigation
      if (downloadUrl.includes("/synthetic-data/download/")) {
        // Create a temporary anchor element to trigger download
        const a = document.createElement("a");
        // Ensure proper URL construction for relative paths
        if (downloadUrl.startsWith("http")) {
          a.href = downloadUrl;
        } else if (downloadUrl.startsWith("/")) {
          a.href = `${this.baseURL}${downloadUrl}`;
        } else {
          a.href = `${this.baseURL}/${downloadUrl}`;
        }
        a.download = filename || "synthetic-data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
      }

      // For authenticated downloads, we need to fetch with credentials
      const response = await fetch(
        downloadUrl.startsWith("http")
          ? downloadUrl
          : `${this.baseURL}${downloadUrl}`,
        {
          credentials: "include",
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "synthetic-data.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return true;
    } catch (error) {
      console.error("Download failed:", error);
      return false;
    }
  }
}

// Export a default instance
export const cuttyAPI = new CuttyAPIClient();
