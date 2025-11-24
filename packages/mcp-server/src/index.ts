import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
// import express from "express";
// import cors from "cors";
import { tools } from "./tools/index.js";

// Create the MCP Server instance
const server = new Server(
  {
    name: "unmessme-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register Tool Handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: zodToJsonSchema(tool.inputSchema),
    })),
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const tool = tools.find((t) => t.name === name);

  if (!tool) {
    throw new Error(`Tool not found: ${name}`);
  }

  try {
    const result = await tool.handler(args);
    return {
      content: [
        {
          type: "text",
          text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function startStdio() {
  console.error("Starting UnmessMe MCP Server (Stdio Mode)...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function startHttp(port: number) {
  console.error(`HTTP/SSE mode not available in this build. Use stdio mode instead.`);
  console.error(`Remove MCP_PORT environment variable or --port argument to use stdio.`);
  process.exit(1);
}

// Entry Point
const args = process.argv.slice(2);
const portArg = args.find(a => a.startsWith("--port="));
const port = portArg ? parseInt(portArg.split("=")[1]) : (process.env.MCP_PORT ? parseInt(process.env.MCP_PORT) : null);

if (port) {
  startHttp(port).catch(console.error);
} else {
  startStdio().catch(console.error);
}
