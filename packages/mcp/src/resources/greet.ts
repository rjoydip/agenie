import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export default (server: McpServer) => {
  console.log("Registered Greet Resource");

  server.registerResource(
    "greet.resource",
    "https://example.com/greetings/default",
    {
      title: "Default Greeting", // Display name for UI
      description: "A simple greeting resource",
      mimeType: "text/plain",
    },
    async (): Promise<ReadResourceResult> => {
      return {
        contents: [
          {
            uri: "https://example.com/greetings/default",
            text: "Hello, world!",
          },
        ],
      };
    },
  );
};
