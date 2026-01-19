import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import greetResource from "./greet";

export function resourceInit(server: McpServer) {
  // Future resource initialization can be added here
  greetResource(server);
}
