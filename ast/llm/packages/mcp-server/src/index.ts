import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";
import { $ } from "execa";

const server = new McpServer({
  name: "workspace-manager",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  `create next.js application`,
  `Creates a Next.js application workspace with given name`,
  {
    name: z.string().describe("A name of the Next.js application"),
  },
  async ({ name }) => {
    $`nx create-nx-workspace`;

    return {
      content: [
        {
          type: "text",
          text: `You have chosen Next.js ${name}`,
        },
      ],
    };
  },
);

server.tool(
  `create a node.js workspace`,
  `Creates a workspace with defined or without projects or features`,
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `You have chosen to create a workspace`,
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

console.error("workspace-manager mcp running");
