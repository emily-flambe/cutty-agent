import { tool } from "ai";
import { z } from "zod";
import { cuttyAPI } from "./cutty-api";
import { globalSessionManager } from "./global-session-manager";
import type { GeneratedFileInfo } from "./session-state";

// Single read-only tool for PoC
export const getSupportedStates = tool({
  description:
    "Get the list of US states supported for synthetic data generation",
  execute: async () => {
    // Fetch from API instead of hardcoding
    const states = await cuttyAPI.getSupportedStates();
    return {
      count: states.length,
      message: `I can help generate data for ${states.length} US states: ${states.join(", ")}`,
      states,
      success: true,
    };
  },
  parameters: z.object({}),
});

// Tool with automatic execution
export const explainFeature = tool({
  description: "Explain a Cutty app feature in detail",
  execute: async ({ feature }: { feature: string }) => {
    const featureExplanations: Record<string, string> = {
      "api access":
        "API Access provides programmatic access to all data generation capabilities.",
      "data export": "Export data in CSV, JSON, or Excel formats.",
      "list generation":
        "Generate synthetic data with customizable parameters.",
      "team collaboration":
        "Share generated data and collaborate with team members.",
    };

    const explanation =
      featureExplanations[feature.toLowerCase()] ||
      `${feature} helps you work with synthetic data.`;

    return {
      explanation,
      feature,
      relatedFeatures: Object.keys(featureExplanations).filter(
        (f) => f !== feature.toLowerCase()
      ),
    };
  },
  parameters: z.object({
    feature: z.string().describe("The feature to explain"),
  }),
});

// Tool for generating synthetic data with automatic execution
export const generateSyntheticData = tool({
  description:
    "Generate synthetic patient data for testing purposes. Returns a download link that MUST be shared with the user.",
  execute: async ({ count, states }: { count: number; states?: string[] }) => {
    try {
      // Call the Cutty API to generate synthetic data
      const response = await cuttyAPI.generateSyntheticData({ count, states });

      if (!response.success) {
        return {
          details: response.details,
          error: response.error || "Failed to generate synthetic data",
          success: false,
        };
      }

      // Store the file info in session state
      if (response.file) {
        globalSessionManager.storeGeneratedFile({
          downloadUrl: response.file.downloadUrl,
          fileId: response.file.id,
          filename: response.file.name,
          generatedAt:
            response.metadata?.generatedAt || new Date().toISOString(),
          metadata: {
            recordCount: response.metadata?.recordCount,
            states:
              response.metadata?.states ||
              (response.metadata?.state
                ? [response.metadata.state]
                : undefined),
          },
        });
      }

      // Prepare a user-friendly response
      const stateInfo = response.metadata?.states?.length
        ? ` for ${response.metadata.states.join(", ")}`
        : response.metadata?.state
          ? ` for ${response.metadata.state}`
          : "";

      // Include download link in the message for the AI to see
      // Need to construct full URL for markdown links to work properly
      const fullDownloadUrl = response.file?.downloadUrl
        ? response.file.downloadUrl.startsWith("http")
          ? response.file.downloadUrl
          : `${cuttyAPI.getBaseURL()}${response.file.downloadUrl}`
        : "";
      const downloadLink = fullDownloadUrl
        ? `\n\n[Download Your Data](${fullDownloadUrl})`
        : "";

      return {
        downloadLink: fullDownloadUrl, // Add explicit download link field
        file: {
          downloadUrl: response.file?.downloadUrl,
          id: response.file?.id,
          name: response.file?.name,
          size: response.file?.size,
        },
        message: `Successfully generated ${response.metadata?.recordCount} records${stateInfo}!${downloadLink}`,
        metadata: response.metadata,
        success: true,
      };
    } catch (error) {
      console.error("Error generating synthetic data:", error);
      return {
        details: error instanceof Error ? [error.message] : ["Unknown error"],
        error: "An unexpected error occurred while generating synthetic data",
        success: false,
      };
    }
  },
  parameters: z.object({
    count: z
      .number()
      .min(1)
      .max(1000)
      .describe("Number of records to generate (1-1000)"),
    states: z
      .array(z.string())
      .optional()
      .describe(
        "List of state codes to generate data for (e.g., ['CA', 'NY']). If not specified, data will be generated for all available states"
      ),
  }),
});

// Tool for creating download links for generated data
export const createDownloadLink = tool({
  description:
    "Create a download link for the most recently generated synthetic data file",
  execute: async ({ fileId }: { fileId?: string }) => {
    try {
      let downloadInfo: GeneratedFileInfo & {
        downloadUrl: string;
        filename: string;
      };

      if (fileId) {
        // Use the provided file ID
        downloadInfo = {
          downloadUrl: cuttyAPI.getDownloadUrl(fileId),
          fileId,
          filename: `synthetic-data-${fileId}.csv`,
          generatedAt: new Date().toISOString(),
        };
      } else {
        // Use the last generated file from session state
        const lastFile = globalSessionManager.getLastGeneratedFile();
        if (lastFile?.downloadUrl && lastFile.filename) {
          downloadInfo = {
            downloadUrl: lastFile.downloadUrl,
            fileId: lastFile.fileId,
            filename: lastFile.filename,
            generatedAt: lastFile.generatedAt || new Date().toISOString(),
            metadata: lastFile.metadata,
          };
        } else {
          return {
            error: "No file to download",
            message:
              "No recently generated files found. Please generate synthetic data first using the 'generateSyntheticData' tool.",
            success: false,
          };
        }
      }

      // Return a message with a clickable download link
      const downloadMessage = `Your file is ready! Click here to download: [Download Your Data](${downloadInfo.downloadUrl})

The file contains ${downloadInfo.metadata?.recordCount || "your"} synthetic patient records${downloadInfo.metadata?.states ? ` for ${downloadInfo.metadata.states.join(", ")}` : ""}.`;

      return {
        downloadUrl: downloadInfo.downloadUrl,
        fileId: downloadInfo.fileId,
        filename: downloadInfo.filename,
        message: downloadMessage,
        success: true,
      };
    } catch (error) {
      console.error("Error downloading file:", error);
      return {
        details: error instanceof Error ? [error.message] : ["Unknown error"],
        error: "An unexpected error occurred while downloading",
        success: false,
      };
    }
  },
  parameters: z.object({
    fileId: z
      .string()
      .optional()
      .describe(
        "Specific file ID to download. If not provided, downloads the most recent file"
      ),
  }),
});

// Read-only tool to check generation status
export const getSyntheticDataStatus = tool({
  description: "Check the status of synthetic data generation",
  execute: async () => {
    // For now, return a simple status
    // In a real implementation, this would check session state
    return {
      hasRecentGeneration: false,
      message:
        "No recent synthetic data generation found. Use the 'generateSyntheticData' tool to create new data.",
      success: true,
    };
  },
  parameters: z.object({}),
});

/**
 * Export all available tools
 * These will be provided to the AI model to describe available capabilities
 */
export const tools = {
  createDownloadLink,
  // explainFeature, // DISABLED - Agent now has built-in knowledge
  generateSyntheticData,
  getSupportedStates,
  getSyntheticDataStatus,
};

/**
 * Implementation of confirmation-required tools
 * This object contains the actual logic for tools that need human approval
 * Each function here corresponds to a tool above that doesn't have an execute function
 * NOTE: keys below should match toolsRequiringConfirmation in app.tsx
 */
export const executions = {
  createDownloadLink: async (args: unknown, _context?: any) => {
    const { fileId } = args as { fileId?: string };
    try {
      let downloadInfo: GeneratedFileInfo & {
        downloadUrl: string;
        filename: string;
      };

      if (fileId) {
        // Use the provided file ID
        downloadInfo = {
          downloadUrl: cuttyAPI.getDownloadUrl(fileId),
          fileId,
          filename: `synthetic-data-${fileId}.csv`,
          generatedAt: new Date().toISOString(),
        };
      } else {
        // Use the last generated file from session state
        const lastFile = globalSessionManager.getLastGeneratedFile();
        if (lastFile?.downloadUrl && lastFile.filename) {
          downloadInfo = {
            downloadUrl: lastFile.downloadUrl,
            fileId: lastFile.fileId,
            filename: lastFile.filename,
            generatedAt: lastFile.generatedAt || new Date().toISOString(),
            metadata: lastFile.metadata,
          };
        } else {
          return {
            error: "No file to download",
            message:
              "No recently generated files found. Please generate synthetic data first using the 'generateSyntheticData' tool.",
            success: false,
          };
        }
      }

      // Return a message with a clickable download link
      const downloadMessage = `Your file is ready! Click here to download: [Download Your Data](${downloadInfo.downloadUrl})

The file contains ${downloadInfo.metadata?.recordCount || "your"} synthetic patient records${downloadInfo.metadata?.states ? ` for ${downloadInfo.metadata.states.join(", ")}` : ""}.`;

      return {
        downloadUrl: downloadInfo.downloadUrl,
        fileId: downloadInfo.fileId,
        filename: downloadInfo.filename,
        message: downloadMessage,
        success: true,
      };
    } catch (error) {
      console.error("Error downloading file:", error);
      return {
        details: error instanceof Error ? [error.message] : ["Unknown error"],
        error: "An unexpected error occurred while downloading",
        success: false,
      };
    }
  },
  explainFeature: async (args: unknown, _context?: any) => {
    const { feature } = args as { feature: string };
    const featureExplanations: Record<string, string> = {
      "api access":
        "API Access provides programmatic access to all data generation capabilities.",
      "data export": "Export data in CSV, JSON, or Excel formats.",
      "list generation":
        "Generate synthetic data with customizable parameters.",
      "team collaboration":
        "Share generated data and collaborate with team members.",
    };

    const explanation =
      featureExplanations[feature.toLowerCase()] ||
      `${feature} helps you work with synthetic data.`;

    return {
      explanation,
      feature,
      relatedFeatures: Object.keys(featureExplanations).filter(
        (f) => f !== feature.toLowerCase()
      ),
    };
  },

  generateSyntheticData: async (args: unknown, _context?: any) => {
    const { count, states } = args as {
      count: number;
      states?: string[];
    };
    try {
      // Call the Cutty API to generate synthetic data
      const response = await cuttyAPI.generateSyntheticData({ count, states });

      if (!response.success) {
        return {
          details: response.details,
          error: response.error || "Failed to generate synthetic data",
          success: false,
        };
      }

      // Store the file info in session state
      if (response.file) {
        globalSessionManager.storeGeneratedFile({
          downloadUrl: response.file.downloadUrl,
          fileId: response.file.id,
          filename: response.file.name,
          generatedAt:
            response.metadata?.generatedAt || new Date().toISOString(),
          metadata: {
            recordCount: response.metadata?.recordCount,
            states:
              response.metadata?.states ||
              (response.metadata?.state
                ? [response.metadata.state]
                : undefined),
          },
        });
      }

      // Prepare a user-friendly response
      const stateInfo = response.metadata?.states?.length
        ? ` for ${response.metadata.states.join(", ")}`
        : response.metadata?.state
          ? ` for ${response.metadata.state}`
          : "";

      // Include download link in the message for the AI to see
      // Need to construct full URL for markdown links to work properly
      const fullDownloadUrl = response.file?.downloadUrl
        ? response.file.downloadUrl.startsWith("http")
          ? response.file.downloadUrl
          : `${cuttyAPI.getBaseURL()}${response.file.downloadUrl}`
        : "";
      const downloadLink = fullDownloadUrl
        ? `\n\n[Download Your Data](${fullDownloadUrl})`
        : "";

      return {
        downloadLink: fullDownloadUrl, // Add explicit download link field
        file: {
          downloadUrl: response.file?.downloadUrl,
          id: response.file?.id,
          name: response.file?.name,
          size: response.file?.size,
        },
        message: `Successfully generated ${response.metadata?.recordCount} records${stateInfo}!${downloadLink}`,
        metadata: response.metadata,
        success: true,
      };
    } catch (error) {
      console.error("Error generating synthetic data:", error);
      return {
        details: error instanceof Error ? [error.message] : ["Unknown error"],
        error: "An unexpected error occurred while generating synthetic data",
        success: false,
      };
    }
  },
};
