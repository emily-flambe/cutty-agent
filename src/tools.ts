import { tool } from "ai";
import { z } from "zod";

// Single read-only tool for PoC
export const getSupportedStates = tool({
  description:
    "Get the list of US states supported for synthetic data generation",
  parameters: z.object({}),
  execute: async () => {
    // Hardcoded for PoC - matches main app
    const states = ["CA", "FL", "GA", "IL", "NY", "OH", "PA", "TX"];
    return {
      success: true,
      states,
      count: states.length,
      message: `I can help generate data for ${states.length} US states: ${states.join(", ")}`,
    };
  },
});

// Tool that requires confirmation (for testing confirmation flow)
export const explainFeature = tool({
  description: "Explain a Cutty app feature in detail",
  parameters: z.object({
    feature: z.string().describe("The feature to explain"),
  }),
  // No execute function = requires confirmation
});

/**
 * Export all available tools
 * These will be provided to the AI model to describe available capabilities
 */
export const tools = {
  getSupportedStates,
  explainFeature,
};

/**
 * Implementation of confirmation-required tools
 * This object contains the actual logic for tools that need human approval
 * Each function here corresponds to a tool above that doesn't have an execute function
 * NOTE: keys below should match toolsRequiringConfirmation in app.tsx
 */
export const executions = {
  explainFeature: async ({ feature }: { feature: string }) => {
    const featureExplanations: Record<string, string> = {
      "list generation":
        "The List Generation feature allows you to create synthetic patient lists using realistic demographic data. You can specify the state, number of patients, and various demographic parameters to generate lists that match your testing needs.",
      "data export":
        "The Data Export feature lets you download your generated lists in multiple formats including CSV, JSON, and Excel. You can customize which fields to include and apply filters before exporting.",
      "team collaboration":
        "Team Collaboration features allow multiple users to work on the same lists, share generated data, and maintain consistent test datasets across your organization.",
      "api access":
        "The API Access feature provides programmatic access to all list generation capabilities, allowing you to integrate synthetic data generation into your automated testing workflows.",
    };

    const explanation =
      featureExplanations[feature.toLowerCase()] ||
      `The ${feature} feature is an important part of the Cutty app that helps you work more efficiently with synthetic healthcare data.`;

    return {
      feature,
      explanation,
      relatedFeatures: Object.keys(featureExplanations).filter(
        (f) => f !== feature.toLowerCase()
      ),
    };
  },
};
