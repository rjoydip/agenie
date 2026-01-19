import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export default (server: McpServer) => {
  console.log("Registering Greet Tool");

  server.registerTool(
    "greet.tool",
    {
      description: "Get a greeting message for a given name",
      inputSchema: {
        name: z.string().length(2).describe("The name of the person to greet"),
      },
    },
    async ({ name }) => {
      return {
        content: [
          {
            type: "text",
            text: `Hello, ${name}! Welcome to Agenie MCP Server.`,
          },
        ],
      };
    },
  );
};
