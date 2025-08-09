#!/usr/bin/env node

/**
 * Hybrid Mode Test Script
 * 
 * This script demonstrates and tests the hybrid mode functionality
 * of the Cutty Agent by sending various types of queries and
 * monitoring the mode detection and response characteristics.
 */

const WebSocket = require('ws');
const chalk = require('chalk');

// Configuration
const WS_URL = 'ws://localhost:8789/agents/chat';
const SESSION_ID = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Test scenarios
const TEST_SCENARIOS = {
  simple: [
    "Hello, how are you?",
    "What is a CSV file?",
    "Can you explain data management?",
    "Tell me about Cutty",
    "How does list processing work?",
    "Thank you for your help"
  ],
  agent: [
    "Generate sample data with 50 rows",
    "Create a CSV file for me",
    "Download the data I just created",
    "What states are supported?",
    "Export my list to CSV",
    "List all available countries"
  ],
  mixed: [
    "Hi there!",
    "I need to generate some test data",
    "Can you create 100 rows?",
    "Thanks!",
    "What format is the file in?",
    "Download it for me please"
  ],
  override: [
    "[simple] Generate data for me",
    "[agent] Hello, nice to meet you",
    "[SIMPLE] Create a CSV file",
    "[Agent] What's the weather like?"
  ]
};

class HybridModeTester {
  constructor() {
    this.ws = null;
    this.metrics = {
      simple: { count: 0, totalLatency: 0, tokens: 0 },
      agent: { count: 0, totalLatency: 0, tokens: 0 },
      errors: 0,
      modeSwitches: 0
    };
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`${WS_URL}/${SESSION_ID}`);
      
      this.ws.on('open', () => {
        console.log(chalk.green('✓ Connected to Cutty Agent'));
        resolve();
      });

      this.ws.on('message', (data) => {
        this.handleResponse(JSON.parse(data));
      });

      this.ws.on('error', (error) => {
        console.error(chalk.red('✗ WebSocket error:'), error);
        this.metrics.errors++;
        reject(error);
      });

      this.ws.on('close', () => {
        console.log(chalk.yellow('⚠ Disconnected from Cutty Agent'));
      });
    });
  }

  handleResponse(data) {
    if (data.type === 'simple_response') {
      const metadata = data.responseMetadata;
      console.log(chalk.cyan(`[Simple Mode]`), data.content.substring(0, 100));
      console.log(chalk.gray(`  Confidence: ${metadata.confidence}, Latency: ${metadata.latency}ms`));
      
      this.metrics.simple.count++;
      this.metrics.simple.totalLatency += metadata.latency || 0;
      this.metrics.simple.tokens += metadata.tokensUsed || 0;
      
    } else if (data.type === 'mode_switch') {
      console.log(chalk.yellow(`[Mode Switch]`), `${data.data.from} → ${data.data.to}`);
      console.log(chalk.gray(`  Reason: ${data.data.reason}`));
      this.metrics.modeSwitches++;
      
    } else if (data.content) {
      const metadata = data.metadata || {};
      const mode = metadata.mode || 'agent';
      console.log(chalk.magenta(`[${mode} Mode]`), data.content.substring(0, 100));
      
      if (mode === 'agent') {
        this.metrics.agent.count++;
        this.metrics.agent.totalLatency += metadata.latency || 0;
        this.metrics.agent.tokens += metadata.tokensUsed || 0;
      }
    }
  }

  sendMessage(message) {
    return new Promise((resolve) => {
      console.log(chalk.blue(`\n→ Sending: "${message}"`));
      
      const payload = {
        message: message,
        context: {
          timestamp: Date.now(),
          sessionId: SESSION_ID,
          testMode: true
        }
      };
      
      this.ws.send(JSON.stringify(payload));
      setTimeout(resolve, 2000); // Wait for response
    });
  }

  async runScenario(name, messages) {
    console.log(chalk.bold.green(`\n${'='.repeat(50)}`));
    console.log(chalk.bold.green(`Running Scenario: ${name.toUpperCase()}`));
    console.log(chalk.bold.green(`${'='.repeat(50)}`));
    
    for (const message of messages) {
      await this.sendMessage(message);
    }
  }

  async runAllTests() {
    console.log(chalk.bold.blue('\n🚀 Starting Hybrid Mode Tests\n'));
    
    await this.connect();
    
    // Run each scenario
    for (const [name, messages] of Object.entries(TEST_SCENARIOS)) {
      await this.runScenario(name, messages);
    }
    
    // Print metrics
    this.printMetrics();
    
    // Cleanup
    this.ws.close();
  }

  printMetrics() {
    console.log(chalk.bold.yellow(`\n${'='.repeat(50)}`));
    console.log(chalk.bold.yellow('TEST METRICS'));
    console.log(chalk.bold.yellow(`${'='.repeat(50)}`));
    
    const simpleAvgLatency = this.metrics.simple.count > 0 
      ? (this.metrics.simple.totalLatency / this.metrics.simple.count).toFixed(2)
      : 0;
    
    const agentAvgLatency = this.metrics.agent.count > 0
      ? (this.metrics.agent.totalLatency / this.metrics.agent.count).toFixed(2)
      : 0;
    
    console.log(chalk.white('\nSimple Mode:'));
    console.log(`  Messages: ${this.metrics.simple.count}`);
    console.log(`  Avg Latency: ${simpleAvgLatency}ms`);
    console.log(`  Total Tokens: ${this.metrics.simple.tokens}`);
    
    console.log(chalk.white('\nAgent Mode:'));
    console.log(`  Messages: ${this.metrics.agent.count}`);
    console.log(`  Avg Latency: ${agentAvgLatency}ms`);
    console.log(`  Total Tokens: ${this.metrics.agent.tokens}`);
    
    console.log(chalk.white('\nOther:'));
    console.log(`  Mode Switches: ${this.metrics.modeSwitches}`);
    console.log(`  Errors: ${this.metrics.errors}`);
    
    // Performance analysis
    console.log(chalk.bold.green('\n✨ Performance Analysis:'));
    
    if (simpleAvgLatency < 500) {
      console.log(chalk.green(`✓ Simple mode meets latency target (<500ms)`));
    } else {
      console.log(chalk.red(`✗ Simple mode exceeds latency target (${simpleAvgLatency}ms > 500ms)`));
    }
    
    const latencyReduction = agentAvgLatency > 0 
      ? ((1 - simpleAvgLatency / agentAvgLatency) * 100).toFixed(1)
      : 0;
    
    console.log(`  Latency reduction: ${latencyReduction}% for simple queries`);
    
    const tokenReduction = this.metrics.agent.tokens > 0
      ? ((1 - this.metrics.simple.tokens / this.metrics.agent.tokens) * 100).toFixed(1)
      : 0;
    
    console.log(`  Token reduction: ${tokenReduction}% for simple queries`);
  }
}

// Run tests if executed directly
if (require.main === module) {
  const tester = new HybridModeTester();
  
  tester.runAllTests().catch(error => {
    console.error(chalk.red('Test failed:'), error);
    process.exit(1);
  });
}

module.exports = HybridModeTester;