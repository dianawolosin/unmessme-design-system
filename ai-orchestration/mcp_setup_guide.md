# UnmessMe MCP Setup Guide

This guide explains how to set up and use the **UnmessMe Context Engine MCP Server** in your AI-driven workflow.

## 1. What is this?

The UnmessMe MCP Server is a **Model Context Protocol** bridge that connects your AI (Cursor, Claude Desktop, etc.) to the UnmessMe "Brain" (Blueprints, Design Tokens, and Component Specs).

It allows you to say: *"Design a new onboarding flow using UnmessMe rules"* — and the AI will instantly check the rules, tokens, and components to give you a production-ready result.

## 2. Prerequisites

- **Node.js** (v18+)
- **Cursor** (or any MCP-compatible client)
- The `unmessme/design-system` repository cloned locally.

## 3. Installation (One-Time Setup)

### Step 1: Build the Server
Navigate to the monorepo root:
```bash
cd packages/mcp-server
npm install
npm run build
```

### Step 2: Register with Cursor
1. Open Cursor Settings (`Cmd + ,` on Mac).
2. Navigate to **"Features" -> "MCP Servers"**.
3. Click **"Add New MCP Server"**.
4. Enter the following details:
   - **Name:** `unmessme-context`
   - **Type:** `command`
   - **Command:** `node /ABSOLUTE/PATH/TO/REPO/packages/mcp-server/dist/index.js`
     *(Replace `/ABSOLUTE/PATH/TO/REPO` with your actual file path)*

## 4. Usage Workflow

### Scenario A: Designing a New Feature
1. Open a **New Chat** in Cursor.
2. Ensure the `unmessme-context` server is active (green light).
3. **Prompt:**
   > "I want to design a 'Crisis Mode' screen for UnmessMe. Please check the `get_ux_blueprint` and `get_ethical_guardrails` first, then propose the UI structure."

### Scenario B: Benchmarking Formats (The Experiment)
1. Open a Chat.
2. **Prompt:**
   > "Run the benchmark tool on `unmess_me_ui_blueprint.md`. I want to see if Toon format is more efficient than JSON."
3. The MCP will return a table showing the token savings.

## 5. Troubleshooting

*   **Server not connecting?**
    *   Check the path in Cursor settings. It MUST be absolute.
    *   Run `node dist/index.js` manually in your terminal to see if it crashes.
*   **"Tool not found"?**
    *   Restart Cursor to refresh the MCP connection.

## 6. Enterprise vs. UnmessMe Architecture

| Feature | UnmessMe (Demo) | Enterprise (Scale) |
| :--- | :--- | :--- |
| **Storage** | Local Files (`fs`) | Vector DB (Vectra/LanceDB) |
| **Chunking** | Atomic Files | Semantic Chunking |
| **Retrieval** | Deterministic | Probabilistic (RAG) |
| **Format** | Markdown/Toon | JSON Metadata + Embeddings |

