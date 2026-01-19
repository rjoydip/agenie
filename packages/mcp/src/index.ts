#!/usr/bin/env node
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server";
import { SSEServerTransportOptions } from "@modelcontextprotocol/sdk/server/sse.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

const PORT = process.env.MCP_PORT ? parseInt(process.env.MCP_PORT, 10) : 3000;
const RUNTIME_MODE = process.env.RUNTIME_MODE || "auto"; // auto, stdio, http, sse

type Runrime = "bun" | "node" | "cloudflare";

// Auto-detect runtime environment
function detectRuntime(): Runrime {
  if (typeof Bun !== "undefined") return "bun";
  if (typeof process !== "undefined" && process.versions?.node) return "node";
  return "cloudflare";
}

// STDIO Transport (for MCP Inspector - Local)
async function runStdio() {
  console.error("Starting MCP server in STDIO mode...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP STDIO server ready");
}

// SSE Transport
class SSETransport {
  private connections = new Map<
    string,
    WebStandardStreamableHTTPServerTransport
  >();

  async handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("sessionId") || crypto.randomUUID();

    let transport = this.connections.get(sessionId);
    if (!transport) {
      const options: SSEServerTransportOptions = {};
      transport = new WebStandardStreamableHTTPServerTransport(options);
      this.connections.set(sessionId, transport);
      // Connect to MCP server
      await server.connect(transport);
    }

    return transport.handleRequest(req);
  }
}

// HTTP Server Setup
async function runHTTPServer() {
  const app = new Hono();
  const sseTransport = new SSETransport();

  // Enable CORS
  app.use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowHeaders: [
        "Content-Type",
        "mcp-session-id",
        "Last-Event-ID",
        "mcp-protocol-version",
      ],
      exposeHeaders: ["mcp-session-id", "mcp-protocol-version"],
    }),
  );

  // Health check
  app.get("/", (c) => c.text("Agenie MCP Server is running"));

  // SSE endpoints
  app.get("/sse", async (c) => {
    return sseTransport.handleRequest(c.req.raw);
  });

  // Legacy MCP endpoint (for backward compatibility)
  app.all("/mcp", async (c) => {
    return sseTransport.handleRequest(c.req.raw);
  });

  const runtime = detectRuntime();

  console.log(`Detected runtime: ${runtime}`);
  console.log(`Starting HTTP MCP server on port ${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
  console.log(`Health check: http://localhost:${PORT}/`);

  if (runtime === "bun") {
    // Bun runtime
    return Bun.serve({
      port: PORT,
      fetch: app.fetch,
    });
  } else if (runtime === "node") {
    // Node.js runtime
    return serve({
      fetch: app.fetch,
      port: PORT,
    });
  } else {
    // Cloudflare Workers
    return app;
  }
}

// Main entry point
async function main() {
  const mode = RUNTIME_MODE.toLowerCase();

  if (mode === "stdio" || (mode === "auto" && !process.stdin.isTTY)) {
    // STDIO mode (for MCP Inspector)
    await runStdio();
  } else {
    // HTTP/SSE mode
    await runHTTPServer();
  }
}

main().catch(console.error);
