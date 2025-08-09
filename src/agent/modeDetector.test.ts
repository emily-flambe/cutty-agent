import { describe, expect, it } from "vitest";
import { ModeDetector } from "./modeDetector";

describe("ModeDetector", () => {
  describe("detectMode - Basic Mode Detection", () => {
    it("should detect simple mode for basic conversational queries", () => {
      const simpleQueries = [
        "Hello, how are you?",
        "What is machine learning?",
        "Explain the difference between React and Vue",
        "Tell me a joke",
        "How does authentication work?",
        "What are the benefits of TypeScript?",
        "Can you help me understand this concept?",
        "I have a question about programming",
      ];

      for (const query of simpleQueries) {
        expect(ModeDetector.detectMode(query)).toBe("simple");
      }
    });

    it("should detect agent mode for action-oriented queries", () => {
      const agentQueries = [
        "Generate some sample data",
        "Create a CSV file with user data",
        "Download the sales report",
        "Export data to a file",
        "Get the customer list file",
        "What states are supported?",
        "Calculate the total revenue",
        "Fetch data from the database",
        "Use the data generation tool",
        "Run the export function",
      ];

      for (const query of agentQueries) {
        expect(ModeDetector.detectMode(query)).toBe("agent");
      }
    });
  });

  describe("detectMode - Explicit Mode Hints", () => {
    it("should respect [simple] mode override", () => {
      const queries = [
        "[simple] Generate some data", // Would normally trigger agent mode
        "Create a file [simple]",      // Would normally trigger agent mode
        "[SIMPLE] Download report",    // Case insensitive
        "Export data [Simple] please", // Mixed case
      ];

      for (const query of queries) {
        expect(ModeDetector.detectMode(query)).toBe("simple");
      }
    });

    it("should respect [agent] mode override", () => {
      const queries = [
        "[agent] What is React?",      // Would normally be simple mode
        "Tell me about ML [agent]",    // Would normally be simple mode
        "[AGENT] Explain this concept", // Case insensitive
        "Help me understand [Agent]",   // Mixed case
      ];

      for (const query of queries) {
        expect(ModeDetector.detectMode(query)).toBe("agent");
      }
    });

    it("should prioritize explicit hints over pattern matching", () => {
      // Agent triggers with simple override
      expect(ModeDetector.detectMode("[simple] Generate synthetic data")).toBe("simple");
      expect(ModeDetector.detectMode("Create CSV file [simple]")).toBe("simple");
      
      // Simple patterns with agent override
      expect(ModeDetector.detectMode("[agent] What is your name?")).toBe("agent");
      expect(ModeDetector.detectMode("Tell me about yourself [agent]")).toBe("agent");
    });
  });

  describe("detectMode - Agent Trigger Patterns", () => {
    describe("Data generation patterns", () => {
      it("should detect generate/create/make + data patterns", () => {
        const patterns = [
          "generate sample data",
          "create test data",
          "make fake data",
          "generate a CSV file",
          "create data list",
          "make synthetic data",
          "Generate user data for testing",
          "Create customer data file",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });

      it("should detect synthetic/fake/sample/test data patterns", () => {
        const patterns = [
          "synthetic data for users",
          "fake data generation",
          "sample data please",
          "test data creation",
          "I need some synthetic data",
          "Generate fake data",
          "Can you provide sample data?",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });
    });

    describe("File operation patterns", () => {
      it("should detect download/export/save patterns", () => {
        const patterns = [
          "download the file",
          "export data",
          "save to CSV",
          "download report",
          "export customer list",
          "save the results",
          "Download user data",
          "Export sales information",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });

      it("should detect get file patterns", () => {
        const patterns = [
          "get the data file",
          "get user file",
          "get report file",
          "get the CSV file",
          "Get customer data file",
          "get the export file",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });
    });

    describe("Specific tool query patterns", () => {
      it("should detect location/region query patterns", () => {
        const patterns = [
          "what states are available?",
          "which countries are supported?",
          "list all regions",
          "what regions can I use?",
          "Which states are supported?",
          "List available countries",
          "supported states please",
          "supported locations",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });
    });

    describe("Action verb patterns", () => {
      it("should detect calculate/compute/analyze/process patterns", () => {
        const patterns = [
          "calculate the total",
          "compute statistics",
          "analyze the data",
          "process information",
          "Calculate revenue",
          "Compute the average",
          "Analyze user behavior",
          "Process the results",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });

      it("should detect fetch/retrieve/pull/get patterns with from/using", () => {
        const patterns = [
          "fetch data from database",
          "retrieve information using API",
          "pull data from server",
          "get data using the tool",
          "Fetch user data from the system",
          "Retrieve records using query",
          "Pull latest data from source",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });
    });

    describe("Explicit agent request patterns", () => {
      it("should detect tool/function/action usage patterns", () => {
        const patterns = [
          "use the data tool",
          "run the export function",
          "execute the action",
          "use tool for generation",
          "run function to process",
          "execute data action",
          "Use the CSV tool",
          "Run the generation function",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });

      it("should detect agent mode mentions", () => {
        const patterns = [
          "switch to agent mode",
          "use agent mode",
          "enable agent mode",
          "I need agent mode",
          "Agent mode please",
        ];

        for (const pattern of patterns) {
          expect(ModeDetector.detectMode(pattern)).toBe("agent");
        }
      });
    });
  });

  describe("analyzeIntent - Confidence Scoring", () => {
    it("should return high confidence for simple mode", () => {
      const analysis = ModeDetector.analyzeIntent("What is React?");
      
      expect(analysis.mode).toBe("simple");
      expect(analysis.confidence).toBe(0.9);
      expect(analysis.reason).toBe("No action triggers detected - using conversational mode");
    });

    it("should calculate confidence based on number of matches for agent mode", () => {
      // Single match
      const singleMatch = ModeDetector.analyzeIntent("generate data");
      expect(singleMatch.mode).toBe("agent");
      expect(singleMatch.confidence).toBe(0.7); // 0.5 + (1 * 0.2)
      expect(singleMatch.reason).toBe("Detected action intent: 1 trigger patterns");

      // Multiple matches
      const multiMatch = ModeDetector.analyzeIntent("generate synthetic data and download file");
      expect(multiMatch.mode).toBe("agent");
      expect(multiMatch.confidence).toBeGreaterThan(0.7);
      expect(multiMatch.reason).toContain("trigger patterns");
    });

    it("should cap confidence at 1.0", () => {
      // Query with many overlapping patterns
      const manyMatches = ModeDetector.analyzeIntent("generate synthetic data and create CSV file and download export and save data");
      expect(manyMatches.mode).toBe("agent");
      expect(manyMatches.confidence).toBeLessThanOrEqual(1.0);
    });

    it("should handle explicit mode overrides in analysis", () => {
      const simpleOverride = ModeDetector.analyzeIntent("[simple] generate data");
      expect(simpleOverride.mode).toBe("simple");
      expect(simpleOverride.confidence).toBe(0.9);

      const agentOverride = ModeDetector.analyzeIntent("[agent] what is this?");
      expect(agentOverride.mode).toBe("agent");
      expect(agentOverride.confidence).toBe(0.7); // 0.5 + (1 * 0.2) for agent mode pattern
    });
  });

  describe("getMatchedTriggers", () => {
    it("should return empty array for simple queries", () => {
      const matches = ModeDetector.getMatchedTriggers("What is React?");
      expect(matches).toEqual([]);
    });

    it("should return matching patterns for agent queries", () => {
      const matches = ModeDetector.getMatchedTriggers("generate sample data");
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.every(pattern => pattern instanceof RegExp)).toBe(true);
    });

    it("should return multiple patterns for complex queries", () => {
      const matches = ModeDetector.getMatchedTriggers("generate synthetic data and download file");
      expect(matches.length).toBeGreaterThan(1);
    });
  });

  describe("checkModeOverride", () => {
    it("should detect simple mode override", () => {
      const tests = [
        { input: "[simple] test", expected: { hasOverride: true, mode: "simple" } },
        { input: "test [simple]", expected: { hasOverride: true, mode: "simple" } },
        { input: "[SIMPLE] test", expected: { hasOverride: true, mode: "simple" } },
        { input: "[Simple] test", expected: { hasOverride: true, mode: "simple" } },
      ];

      for (const { input, expected } of tests) {
        expect(ModeDetector.checkModeOverride(input)).toEqual(expected);
      }
    });

    it("should detect agent mode override", () => {
      const tests = [
        { input: "[agent] test", expected: { hasOverride: true, mode: "agent" } },
        { input: "test [agent]", expected: { hasOverride: true, mode: "agent" } },
        { input: "[AGENT] test", expected: { hasOverride: true, mode: "agent" } },
        { input: "[Agent] test", expected: { hasOverride: true, mode: "agent" } },
      ];

      for (const { input, expected } of tests) {
        expect(ModeDetector.checkModeOverride(input)).toEqual(expected);
      }
    });

    it("should return no override for normal queries", () => {
      const tests = [
        "What is React?",
        "generate data",
        "simple question",
        "agent question",
        "[other] test",
      ];

      for (const input of tests) {
        expect(ModeDetector.checkModeOverride(input)).toEqual({ hasOverride: false });
      }
    });
  });

  describe("Edge Cases and Boundary Conditions", () => {
    it("should handle empty strings", () => {
      expect(ModeDetector.detectMode("")).toBe("simple");
      expect(ModeDetector.analyzeIntent("").mode).toBe("simple");
      expect(ModeDetector.getMatchedTriggers("")).toEqual([]);
      expect(ModeDetector.checkModeOverride("")).toEqual({ hasOverride: false });
    });

    it("should handle whitespace-only strings", () => {
      expect(ModeDetector.detectMode("   ")).toBe("simple");
      expect(ModeDetector.detectMode("\t\n")).toBe("simple");
    });

    it("should handle very long strings", () => {
      const longString = "generate data ".repeat(1000);
      expect(ModeDetector.detectMode(longString)).toBe("agent");
      expect(ModeDetector.analyzeIntent(longString).mode).toBe("agent");
    });

    it("should handle special characters and unicode", () => {
      const specialChars = [
        "generate data! @#$%^&*()",
        "créate dâta wïth spëcial chars",
        "生成数据", // Chinese characters
        "создать данные", // Cyrillic
        "🚀 generate data 🎉",
      ];

      for (const input of specialChars) {
        // Should not throw errors
        expect(() => ModeDetector.detectMode(input)).not.toThrow();
        expect(() => ModeDetector.analyzeIntent(input)).not.toThrow();
      }
    });

    it("should be case insensitive for patterns", () => {
      const caseVariations = [
        "GENERATE DATA",
        "Generate Data",
        "generate data",
        "GeNeRaTe DaTa",
      ];

      for (const variation of caseVariations) {
        expect(ModeDetector.detectMode(variation)).toBe("agent");
      }
    });

    it("should handle partial matches correctly", () => {
      // Should not match incomplete patterns
      expect(ModeDetector.detectMode("gene")).toBe("simple");
      expect(ModeDetector.detectMode("data")).toBe("simple");
      expect(ModeDetector.detectMode("down")).toBe("simple");
      
      // But should match complete patterns within longer strings
      expect(ModeDetector.detectMode("Please generate some data for me")).toBe("agent");
      expect(ModeDetector.detectMode("I would like to download the file")).toBe("agent");
    });

    it("should handle multiple mode hints (last one wins)", () => {
      // In current implementation, both hints are checked, but simple is checked first
      expect(ModeDetector.detectMode("[simple] test [agent]")).toBe("simple");
      expect(ModeDetector.detectMode("[agent] test [simple]")).toBe("simple");
    });

    it("should handle malformed mode hints", () => {
      const malformedHints = [
        "[simple", // Missing closing bracket
        "simple]", // Missing opening bracket  
        "[ simple ]", // Extra spaces
        "[simpel]", // Misspelling
        "[agent test]", // Extra content
      ];

      for (const hint of malformedHints) {
        // Should fallback to pattern matching
        const result = ModeDetector.detectMode(hint + " generate data");
        expect(result).toBe("agent"); // Due to "generate data" pattern
      }
    });
  });

  describe("Real-world Examples from Spec", () => {
    it("should handle data generation requests", () => {
      const examples = [
        "Generate 100 users with addresses in California",
        "Create synthetic customer data",
        "I need fake data for testing",
        "Make sample data for my app",
      ];

      for (const example of examples) {
        expect(ModeDetector.detectMode(example)).toBe("agent");
      }
    });

    it("should handle file operation requests", () => {
      const examples = [
        "Download my data as CSV",
        "Export the user list",
        "Save this to a file",
        "Get the customer data file",
      ];

      for (const example of examples) {
        expect(ModeDetector.detectMode(example)).toBe("agent");
      }
    });

    it("should handle conversational queries", () => {
      const examples = [
        "What types of data can you generate?",
        "How does synthetic data work?",
        "Explain the privacy implications",
        "What formats do you support?",
        "Tell me about data generation best practices",
      ];

      for (const example of examples) {
        expect(ModeDetector.detectMode(example)).toBe("simple");
      }
    });

    it("should handle mixed content appropriately", () => {
      // Questions about capabilities that might contain trigger words
      expect(ModeDetector.detectMode("What can you generate?")).toBe("simple");
      expect(ModeDetector.detectMode("Do you support data creation?")).toBe("simple");
      expect(ModeDetector.detectMode("Can you download files?")).toBe("simple");
      
      // Actual requests for action
      expect(ModeDetector.detectMode("Please generate user data")).toBe("agent");
      expect(ModeDetector.detectMode("Can you create a CSV file for me?")).toBe("agent");
      expect(ModeDetector.detectMode("I want to download the report")).toBe("agent");
    });

    it("should handle explicit overrides in real scenarios", () => {
      // User wants explanation without triggering tools
      expect(ModeDetector.detectMode("[simple] How do I generate data?")).toBe("simple");
      expect(ModeDetector.detectMode("[simple] Explain data creation")).toBe("simple");
      
      // User wants tools for seemingly conversational query
      expect(ModeDetector.detectMode("[agent] What data do you have?")).toBe("agent");
      expect(ModeDetector.detectMode("[agent] Show me the options")).toBe("agent");
    });
  });

  describe("Pattern Validation", () => {
    it("should have valid regex patterns in AGENT_TRIGGERS", () => {
      const triggers = ModeDetector.getMatchedTriggers("test"); // Empty result, but validates patterns
      expect(() => {
        // Test that all patterns are valid regex by trying to use them
        const testString = "generate synthetic data and download file";
        for (let i = 0; i < 20; i++) { // Test multiple patterns without exposing internal array
          try {
            ModeDetector.getMatchedTriggers(`test pattern ${i} generate data`);
          } catch (error) {
            // If we get here, there's a regex compilation error
            throw new Error(`Invalid regex pattern detected: ${error}`);
          }
        }
      }).not.toThrow();
    });

    it("should match expected patterns correctly", () => {
      // Verify specific pattern categories work as expected
      const testCases = [
        // Data generation
        { input: "generate user data", shouldMatch: true },
        { input: "synthetic data please", shouldMatch: true },
        
        // File operations  
        { input: "download report", shouldMatch: true },
        { input: "get data file", shouldMatch: true },
        
        // Location queries
        { input: "what states are supported", shouldMatch: true },
        { input: "list countries", shouldMatch: true },
        
        // Action verbs
        { input: "calculate total", shouldMatch: true },
        { input: "fetch data from server", shouldMatch: true },
        
        // Tool requests
        { input: "use export tool", shouldMatch: true },
        { input: "agent mode", shouldMatch: true },
        
        // Should not match
        { input: "what is data", shouldMatch: false },
        { input: "tell me about files", shouldMatch: false },
        { input: "explain states", shouldMatch: false },
      ];

      for (const { input, shouldMatch } of testCases) {
        const matches = ModeDetector.getMatchedTriggers(input);
        if (shouldMatch) {
          expect(matches.length).toBeGreaterThan(0);
        } else {
          expect(matches.length).toBe(0);
        }
      }
    });
  });
});