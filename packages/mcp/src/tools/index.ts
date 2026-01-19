import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import greetTool from "./greet";

// Import and register tools
export function toolsInit(server: McpServer) {
  greetTool(server);
}
