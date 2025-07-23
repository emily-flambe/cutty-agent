# Cutty Agent Configuration

## Project Overview

Cutty Agent is a proof-of-concept AI assistant for the Cutty application, built using Cloudflare's Agents SDK. This project validates the feasibility of migrating from Cloudflare Workers AI to Cloudflare Agents for enhanced conversational capabilities.

**Status**: Proof of Concept

## Purpose

- Evaluate Cloudflare Agents as a replacement for Workers AI
- Implement a friendly AI assistant ("Cutty the Cuttlefish") for the Cutty app
- Test tool execution and streaming response capabilities
- Validate integration with the main Cutty application

## Core Features

- **Conversational AI**: Powered by Anthropic Claude 3.5 Sonnet via Cloudflare Agents
- **Tool System**: Execute actions on behalf of users (starting with read-only operations)
- **Streaming Responses**: Real-time interaction with users
- **CORS Support**: Designed to integrate with Cutty frontend
- **Health Monitoring**: Built-in health check endpoint

## Technology Stack

- **Runtime**: Cloudflare Workers with Durable Objects
- **Framework**: Cloudflare Agents SDK
- **Language Model**: Anthropic Claude 3.5 Sonnet
- **Language**: TypeScript
- **State Management**: Durable Objects for conversation persistence

## Success Criteria

1. Agent deploys and remains stable for 24+ hours
2. Frontend successfully connects and exchanges messages
3. Tool execution works as expected
4. Performance meets user experience requirements
5. Developer experience is acceptable for team adoption
