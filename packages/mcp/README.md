# Agenie MCP Server

A flexible MCP (Model Context Protocol) server that works across Bun, Node.js, Cloudflare Workers, and supports both STDIO and SSE transports for use with MCP Inspector.

## Features

- ✅ **Bun Runtime** - Native Bun server support
- ✅ **Node.js Runtime** - Compatible with Node.js using @hono/node-server
- ✅ **Cloudflare Workers** - Deploy to the edge with Wrangler
- ✅ **STDIO Transport** - Works with MCP Inspector
- ✅ **SSE Transport** - Server-Sent Events for real-time communication
- ✅ **Auto-detection** - Automatically detects runtime and appropriate transport

## Installation

```bash
# Install dependencies with npm
npm install

# Or with bun
bun install
```

## Usage

### 1. Running with Node.js (HTTP/SSE)

```bash
npm run dev
# Server runs on http://localhost:3000
# SSE endpoint: http://localhost:3000/sse
```

### 2. Running with Bun (HTTP/SSE)

```bash
npm run dev:bun
# Or directly:
bun run src/index.ts
```

### 3. Running with STDIO (for MCP Inspector)

**With Node.js:**

```bash
npm run dev:stdio
```

**With Bun:**

```bash
bun run dev:stdio:bun
```

### 4. Using MCP Inspector

- **Option A: Direct command**

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

- **Option B: Using config file**

1. Copy `.mcp/config.json` to your MCP config directory
2. Run the MCP Inspector pointing to your config

### 5. Deploying to Cloudflare Workers

**Development:**

```bash
bun run wrangler:dev
```

**Production:**

```bash
bun run wrangler:deploy
```

## Environment Variables

| Variable       | Default | Description                                  |
| -------------- | ------- | -------------------------------------------- |
| `MCP_PORT`     | `3000`  | HTTP server port                             |
| `RUNTIME_MODE` | `auto`  | Runtime mode: `auto`, `stdio`, `http`, `sse` |

## Endpoints

### HTTP/SSE Mode

- `GET /` - Health check endpoint
- `GET /sse` - SSE connection endpoint
- `POST /sse/message` - SSE message endpoint
- `ALL /mcp` - Legacy endpoint (backward compatible)

### STDIO Mode

Communicates via stdin/stdout for use with MCP Inspector.

## Runtime Detection

The server automatically detects the runtime:

1. **Bun** - If `Bun` global is available
2. **Node.js** - If `process.versions.node` exists
3. **Cloudflare** - Fallback for Workers environment

## Transport Selection

Transport is selected based on:

1. `RUNTIME_MODE` environment variable
2. Auto-detection: STDIO if `!process.stdin.isTTY`, otherwise HTTP/SSE

## Project Structure

```bash
.
├── src/
│   ├── index.ts          # Main server file
│   └── server.ts         # Your MCP server implementation
├── dist/                 # Compiled output
├── wrangler.toml         # Cloudflare Workers config
├── package.json
└── tsconfig.json
```

## Development

- **Build the project:**

```bash
bun run build
```

- **Start the server:**

```bash
bun start
```

- **Test with MCP Inspector:**

```bash
bun run mcp:inspect
```

## Testing Different Modes

```bash
# Test HTTP mode explicitly
RUNTIME_MODE=http bun run dev

# Test SSE mode
RUNTIME_MODE=sse bun run dev

# Test STDIO mode
RUNTIME_MODE=stdio bun run dev

# Auto mode (detects based on TTY)
RUNTIME_MODE=auto bun run dev
```

## Troubleshooting

### STDIO Mode Not Working

- Ensure `RUNTIME_MODE=stdio` is set
- Check that the process is run without a TTY
- Verify MCP Inspector is properly configured

### Cloudflare Workers Issues

- Run `npm run wrangler:dev` to test locally
- Check `wrangler.toml` configuration
- Ensure compatibility date is current

### Port Already in Use

- Change `MCP_PORT` environment variable
- Check for other processes on port `3000`
