import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { version, name } from "../package.json";
import { toolsInit } from "./tools";
import { resourceInit } from "./resources";

// Create an MCP server
const server = new McpServer({
  name,
  version,
});

// Initialize tools and resources
toolsInit(server);
resourceInit(server);

export { server };
