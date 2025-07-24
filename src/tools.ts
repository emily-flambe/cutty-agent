import { tool } from "ai";
import { z } from "zod";
import { cuttyAPI } from "./cutty-api";

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
        "The API Access feature provides programmatic access to all list generation capabilities, allowing you to integrate synthetic data generation into your automated testing workflows.",
      "data export":
        "The Data Export feature lets you download your generated lists in multiple formats including CSV, JSON, and Excel. You can customize which fields to include and apply filters before exporting.",
      "list generation":
        "The List Generation feature allows you to create synthetic patient lists using realistic demographic data. You can specify the state, number of patients, and various demographic parameters to generate lists that match your testing needs.",
      "team collaboration":
        "Team Collaboration features allow multiple users to work on the same lists, share generated data, and maintain consistent test datasets across your organization.",
    };

    const explanation =
      featureExplanations[feature.toLowerCase()] ||
      `The ${feature} feature is an important part of the Cutty app that helps you work more efficiently with synthetic healthcare data.`;

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
  description: "Generate synthetic patient data for testing purposes",
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

      // Store the file info in a global variable for the download tool
      // In a real implementation, this would be stored in session state
      if (typeof window !== "undefined") {
        (window as any).__lastGeneratedFile = {
          downloadUrl: response.file?.downloadUrl,
          fileId: response.file?.id,
          filename: response.file?.name,
          generatedAt: response.metadata?.generatedAt,
        };
      }

      // Prepare a user-friendly response
      const stateInfo = response.metadata?.states?.length
        ? ` for ${response.metadata.states.join(", ")}`
        : response.metadata?.state
          ? ` for ${response.metadata.state}`
          : "";

      return {
        downloadInstructions:
          "You can now use the 'downloadGeneratedData' tool to download your file.",
        file: {
          downloadUrl: response.file?.downloadUrl,
          id: response.file?.id,
          name: response.file?.name,
          size: response.file?.size,
        },
        message: `Successfully generated ${response.metadata?.recordCount} synthetic patient records${stateInfo}.`,
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

// Tool for downloading generated data with automatic execution
export const downloadGeneratedData = tool({
  description: "Download the most recently generated synthetic data file",
  execute: async ({ fileId }: { fileId?: string }) => {
    try {
      let downloadInfo: any;

      if (fileId) {
        // Use the provided file ID
        downloadInfo = {
          downloadUrl: cuttyAPI.getDownloadUrl(fileId),
          fileId,
          filename: `synthetic-data-${fileId}.csv`,
        };
      } else if (
        typeof window !== "undefined" &&
        (window as any).__lastGeneratedFile
      ) {
        // Use the last generated file
        downloadInfo = (window as any).__lastGeneratedFile;
      } else {
        return {
          error: "No file to download",
          message:
            "No recently generated files found. Please generate synthetic data first using the 'generateSyntheticData' tool.",
          success: false,
        };
      }

      // Trigger the download
      const downloadSuccess = await cuttyAPI.downloadFile(
        downloadInfo.downloadUrl,
        downloadInfo.filename
      );

      if (downloadSuccess) {
        return {
          fileId: downloadInfo.fileId,
          message: `Download started for file: ${downloadInfo.filename}`,
          success: true,
        };
      } else {
        return {
          error: "Download failed",
          message:
            "Failed to download the file. Please try again or generate a new file.",
          success: false,
        };
      }
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
  downloadGeneratedData,
  explainFeature,
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
  downloadGeneratedData: async ({ fileId }: { fileId?: string }) => {
    try {
      let downloadInfo: any;

      if (fileId) {
        // Use the provided file ID
        downloadInfo = {
          downloadUrl: cuttyAPI.getDownloadUrl(fileId),
          fileId,
          filename: `synthetic-data-${fileId}.csv`,
        };
      } else if (
        typeof window !== "undefined" &&
        (window as any).__lastGeneratedFile
      ) {
        // Use the last generated file
        downloadInfo = (window as any).__lastGeneratedFile;
      } else {
        return {
          error: "No file to download",
          message:
            "No recently generated files found. Please generate synthetic data first using the 'generateSyntheticData' tool.",
          success: false,
        };
      }

      // Trigger the download
      const downloadSuccess = await cuttyAPI.downloadFile(
        downloadInfo.downloadUrl,
        downloadInfo.filename
      );

      if (downloadSuccess) {
        return {
          fileId: downloadInfo.fileId,
          message: `Download started for file: ${downloadInfo.filename}`,
          success: true,
        };
      } else {
        return {
          error: "Download failed",
          message:
            "Failed to download the file. Please try again or generate a new file.",
          success: false,
        };
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      return {
        details: error instanceof Error ? [error.message] : ["Unknown error"],
        error: "An unexpected error occurred while downloading",
        success: false,
      };
    }
  },
  explainFeature: async ({ feature }: { feature: string }) => {
    const featureExplanations: Record<string, string> = {
      "api access":
        "The API Access feature provides programmatic access to all list generation capabilities, allowing you to integrate synthetic data generation into your automated testing workflows.",
      "data export":
        "The Data Export feature lets you download your generated lists in multiple formats including CSV, JSON, and Excel. You can customize which fields to include and apply filters before exporting.",
      "list generation":
        "The List Generation feature allows you to create synthetic patient lists using realistic demographic data. You can specify the state, number of patients, and various demographic parameters to generate lists that match your testing needs.",
      "team collaboration":
        "Team Collaboration features allow multiple users to work on the same lists, share generated data, and maintain consistent test datasets across your organization.",
    };

    const explanation =
      featureExplanations[feature.toLowerCase()] ||
      `The ${feature} feature is an important part of the Cutty app that helps you work more efficiently with synthetic healthcare data.`;

    return {
      explanation,
      feature,
      relatedFeatures: Object.keys(featureExplanations).filter(
        (f) => f !== feature.toLowerCase()
      ),
    };
  },

  generateSyntheticData: async ({
    count,
    states,
  }: {
    count: number;
    states?: string[];
  }) => {
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

      // Store the file info in a global variable for the download tool
      // In a real implementation, this would be stored in session state
      if (typeof window !== "undefined") {
        (window as any).__lastGeneratedFile = {
          downloadUrl: response.file?.downloadUrl,
          fileId: response.file?.id,
          filename: response.file?.name,
          generatedAt: response.metadata?.generatedAt,
        };
      }

      // Prepare a user-friendly response
      const stateInfo = response.metadata?.states?.length
        ? ` for ${response.metadata.states.join(", ")}`
        : response.metadata?.state
          ? ` for ${response.metadata.state}`
          : "";

      return {
        downloadInstructions:
          "You can now use the 'downloadGeneratedData' tool to download your file.",
        file: {
          downloadUrl: response.file?.downloadUrl,
          id: response.file?.id,
          name: response.file?.name,
          size: response.file?.size,
        },
        message: `Successfully generated ${response.metadata?.recordCount} synthetic patient records${stateInfo}.`,
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
