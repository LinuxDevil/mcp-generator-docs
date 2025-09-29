---
title: Integration Guides
description: Complete integration guides for Claude Desktop and Cursor with configuration examples and troubleshooting.
keywords: [Claude Desktop, Cursor, integration, configuration, stdio, HTTP, MCP client, setup]
---

# Integration Guides

Learn how to integrate your MCP server with popular AI development tools including Claude Desktop and Cursor. This guide provides complete setup instructions, configuration examples, and troubleshooting tips.

## Claude Desktop Integration

Claude Desktop is the most popular MCP client, supporting stdio transport for seamless local AI assistance.

### Prerequisites

- Claude Desktop installed ([Download here](https://claude.ai/download))
- MCP server generated with `mcp-server-generator`
- Node.js 18+ installed

### Step 1: Generate Your MCP Server

Create an MCP server optimized for Claude Desktop:

```bash
# Create server with stdio transport (required for Claude Desktop)
npx mcp-server-generator my-claude-server \
  --description "My custom MCP server for Claude Desktop" \
  --transport stdio

cd my-claude-server
npm install
npm run build
```

### Step 2: Test Your Server

Verify your server works correctly before integration:

```bash
# Quick test to see all capabilities
npm run quick:test

# Test stdio transport specifically
npm run dev:stdio

# In another terminal, test with Inspector
npm run inspector:cli -- --test-all
```

### Step 3: Configure Claude Desktop

#### Find Configuration File

Claude Desktop configuration location:

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
~/.config/Claude/claude_desktop_config.json
```

#### Basic Configuration

Add your MCP server to the configuration:

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "my-claude-server": {
      "command": "node",
      "args": [
        "/absolute/path/to/my-claude-server/lib/server.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

#### Advanced Configuration

For development and debugging:

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "my-claude-server-dev": {
      "command": "tsx",
      "args": [
        "/absolute/path/to/my-claude-server/src/server.ts"
      ],
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug"
      }
    },
    "my-claude-server-prod": {
      "command": "node",
      "args": [
        "/absolute/path/to/my-claude-server/lib/server.js"
      ],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

#### Multiple Servers Configuration

Run multiple MCP servers simultaneously:

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "code-review-server": {
      "command": "node",
      "args": ["/path/to/code-review-server/lib/server.js"]
    },
    "data-analysis-server": {
      "command": "node", 
      "args": ["/path/to/data-analysis-server/lib/server.js"]
    },
    "development-tools": {
      "command": "tsx",
      "args": ["/path/to/dev-tools/src/server.ts"],
      "env": {"LOG_LEVEL": "debug"}
    }
  }
}
```

### Step 4: Restart Claude Desktop

After updating the configuration:

1. **Quit Claude Desktop completely** (⌘+Q on macOS, Alt+F4 on Windows)
2. **Restart Claude Desktop**
3. **Wait for MCP servers to initialize** (may take a few seconds)

### Step 5: Test Integration

Verify your MCP server is working in Claude Desktop:

```
Hey Claude, can you show me what tools are available from my MCP server?
```

Claude should respond with a list of your server's tools, resources, and prompts.

**Test specific functionality:**
```
Can you use the data-analysis tool to analyze this dataset?
[provide some sample data]
```

### Step 6: Development Workflow

For ongoing development:

```bash
# 1. Make changes to your MCP server
vim src/tools/my-tool.ts

# 2. Rebuild the server
npm run build

# 3. Test changes
npm run quick:test

# 4. Restart Claude Desktop to pick up changes
# (No config changes needed, just restart the app)
```

## Cursor Integration

Cursor supports MCP servers via HTTP transport for enhanced AI coding assistance.

### Prerequisites

- Cursor IDE installed ([Download here](https://cursor.sh/))
- MCP server with HTTP transport support
- Understanding of Cursor's configuration system

### Step 1: Generate HTTP-Compatible MCP Server

Create a server optimized for Cursor:

```bash
# Create server with HTTP transport (required for Cursor)
npx mcp-server-generator my-cursor-server \
  --description "My custom MCP server for Cursor" \
  --transport http \
  --oauth

cd my-cursor-server
npm install
npm run build
```

### Step 2: Start HTTP Server

Run your MCP server in HTTP mode:

```bash
# Start HTTP server
npm run dev:http

# Or start in production mode
npm run start:http

# Verify server is running
curl http://localhost:3000/health
```

### Step 3: Configure Cursor

#### Project-Level Configuration

Create a `.cursorrules` file in your project root:

```json title=".cursorrules"
{
  "mcp": {
    "servers": [
      {
        "name": "my-cursor-server",
        "url": "http://localhost:3000",
        "type": "http",
        "description": "My custom MCP server for enhanced coding assistance"
      }
    ]
  }
}
```

#### Advanced Cursor Configuration

For projects requiring authentication and custom headers:

```json title=".cursorrules"
{
  "mcp": {
    "servers": [
      {
        "name": "authenticated-server",
        "url": "http://localhost:3000",
        "type": "http",
        "headers": {
          "Authorization": "Bearer your-api-token",
          "X-API-Version": "v1"
        },
        "timeout": 30000,
        "retries": 3
      }
    ],
    "global": {
      "timeout": 10000,
      "enableLogging": true,
      "logLevel": "info"
    }
  }
}
```

#### Global Cursor Configuration

For servers used across multiple projects:

```json title="~/.cursor/mcp_config.json"
{
  "globalServers": [
    {
      "name": "code-review-server",
      "url": "http://localhost:3001",
      "type": "http",
      "description": "Global code review server"
    },
    {
      "name": "data-tools-server",
      "url": "http://localhost:3002", 
      "type": "http",
      "description": "Data analysis and processing tools"
    }
  ]
}
```

### Step 4: Test Cursor Integration

#### Verify Server Connection

In Cursor, open the command palette (⌘+Shift+P / Ctrl+Shift+P) and run:

```
MCP: List Servers
```

Your configured server should appear in the list.

#### Test MCP Functionality

Use Cursor's AI chat with MCP capabilities:

```
@mcp Can you analyze this code using the code-review server?

[paste your code here]
```

Or use specific tools:

```
@mcp Use the data-analysis tool to process this dataset:
[provide data]
```

### Step 5: Cursor Development Workflow

Optimize your workflow with Cursor:

```bash
# Terminal 1: Start your MCP server
cd my-cursor-server
npm run dev:http

# Terminal 2: Start Cursor with your project
cursor my-project

# In Cursor:
# 1. Open AI chat panel
# 2. Use @mcp to access your server's tools
# 3. Get AI assistance enhanced by your custom tools
```

## General MCP Client Configuration

For other MCP clients or custom integrations:

### Stdio Transport Configuration

```json
{
  "name": "my-mcp-server",
  "transport": "stdio",
  "command": "node",
  "args": ["/path/to/server.js"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### HTTP Transport Configuration

```json
{
  "name": "my-mcp-server",
  "transport": "http",
  "url": "http://localhost:3000",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
  },
  "timeout": 30000
}
```

### WebSocket Transport Configuration

```json
{
  "name": "my-mcp-server",
  "transport": "websocket",
  "url": "ws://localhost:3000/ws",
  "reconnect": true,
  "reconnectInterval": 5000
}
```

## Troubleshooting

### Claude Desktop Issues

#### Server Not Starting

**Problem:** MCP server doesn't appear in Claude Desktop

**Solutions:**
1. **Check configuration file location**:
   ```bash
   # Verify file exists and is valid JSON
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .
   ```

2. **Verify server path**:
   ```bash
   # Test server directly
   node /path/to/your/server/lib/server.js
   ```

3. **Check server permissions**:
   ```bash
   # Ensure server file is executable
   chmod +x /path/to/your/server/lib/server.js
   ```

4. **Validate JSON configuration**:
   ```bash
   # Use jq to validate JSON
   jq . < claude_desktop_config.json
   ```

#### Server Crashes

**Problem:** Server starts but crashes during use

**Solutions:**
1. **Enable debug logging**:
   ```json
   {
     "mcpServers": {
       "my-server": {
         "command": "node",
         "args": ["/path/to/server.js"],
         "env": {
           "LOG_LEVEL": "debug",
           "NODE_ENV": "development"
         }
       }
     }
   }
   ```

2. **Test server independently**:
   ```bash
   npm run dev:stdio
   # Send test request in another terminal
   echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | npm run dev:stdio
   ```

3. **Check for dependency issues**:
   ```bash
   npm install
   npm run build
   ```

#### Slow Response Times

**Problem:** Tools take too long to respond

**Solutions:**
1. **Optimize tool implementations**
2. **Add caching for expensive operations**
3. **Use async/await properly**
4. **Monitor memory usage**

### Cursor Issues

#### Server Connection Failed

**Problem:** Cursor can't connect to MCP server

**Solutions:**
1. **Verify server is running**:
   ```bash
   curl http://localhost:3000/health
   ```

2. **Check network connectivity**:
   ```bash
   telnet localhost 3000
   ```

3. **Verify CORS configuration**:
   ```typescript
   // In your server configuration
   export const corsConfig = {
     origin: ['http://localhost:3000', 'cursor://app'],
     credentials: true,
     methods: ['GET', 'POST', 'OPTIONS']
   };
   ```

4. **Check firewall settings**:
   ```bash
   # macOS
   sudo pfctl -sr | grep 3000
   
   # Linux
   sudo iptables -L | grep 3000
   
   # Windows
   netsh advfirewall firewall show rule name="Node.js Server"
   ```

#### Authentication Issues

**Problem:** HTTP requests fail with 401/403 errors

**Solutions:**
1. **Verify authentication configuration**:
   ```json
   {
     "headers": {
       "Authorization": "Bearer your-correct-token"
     }
   }
   ```

2. **Test authentication directly**:
   ```bash
   curl -H "Authorization: Bearer token" http://localhost:3000/mcp
   ```

3. **Check server logs** for authentication errors

### General Integration Issues

#### Port Conflicts

**Problem:** Server can't start due to port conflicts

**Solutions:**
1. **Find conflicting process**:
   ```bash
   lsof -i :3000
   netstat -an | grep 3000
   ```

2. **Use different port**:
   ```bash
   PORT=3001 npm run dev:http
   ```

3. **Kill conflicting process**:
   ```bash
   kill -9 $(lsof -t -i:3000)
   ```

#### Performance Issues

**Problem:** Slow tool execution or high memory usage

**Solutions:**
1. **Profile your server**:
   ```bash
   node --prof lib/server.js
   node --prof-process isolate-*-prof
   ```

2. **Monitor memory usage**:
   ```bash
   node --trace-gc lib/server.js
   ```

3. **Optimize tool implementations**:
   - Use streaming for large data
   - Implement proper caching
   - Avoid memory leaks
   - Use worker threads for CPU-intensive tasks

## Best Practices

### Security

1. **Use HTTPS in production**:
   ```bash
   npm run start:http -- --ssl --cert /path/to/cert.pem --key /path/to/key.pem
   ```

2. **Implement proper authentication**:
   ```typescript
   export const authConfig = {
     oauth: {
       clientId: process.env.OAUTH_CLIENT_ID,
       clientSecret: process.env.OAUTH_CLIENT_SECRET
     },
     apiKeys: {
       enabled: true,
       header: 'X-API-Key'
     }
   };
   ```

3. **Validate all inputs**:
   ```typescript
   import { z } from 'zod';
   
   const inputSchema = z.object({
     data: z.string().min(1).max(10000),
     format: z.enum(['json', 'csv', 'xml'])
   });
   ```

### Performance

1. **Use appropriate transports**:
   - **Stdio** for local tools (Claude Desktop)
   - **HTTP** for web services (Cursor, remote clients)
   - **WebSocket** for real-time applications

2. **Implement caching**:
   ```typescript
   const cache = new Map();
   
   export function withCache<T>(key: string, fn: () => Promise<T>): Promise<T> {
     if (cache.has(key)) {
       return Promise.resolve(cache.get(key));
     }
     
     return fn().then(result => {
       cache.set(key, result);
       return result;
     });
   }
   ```

3. **Monitor resource usage**:
   ```bash
   # Add to package.json scripts
   "monitor": "clinic doctor -- node lib/server.js"
   ```

### Development Workflow

1. **Use development configurations**:
   ```json
   {
     "mcpServers": {
       "dev-server": {
         "command": "tsx",
         "args": ["src/server.ts"],
         "env": {"NODE_ENV": "development"}
       }
     }
   }
   ```

2. **Implement hot reloading**:
   ```bash
   npm install --save-dev nodemon
   npm run dev:watch
   ```

3. **Use proper logging**:
   ```typescript
   import { logger } from './utils/logger.js';
   
   logger.info('Server starting', { port: 3000 });
   logger.debug('Tool called', { toolName, args });
   logger.error('Tool failed', { error: error.message });
   ```

## Next Steps

Now that your MCP server is integrated:

- **[Testing & Debugging](./testing-debugging.md)** - Comprehensive testing strategies
- **[Integration Tutorials](./tutorials-and-examples.md)** - Build integrations step-by-step
- **[Component Development](./components/overview.md)** - Building advanced components
- **[API Reference](./api/overview.md)** - Technical documentation

Successful integration enables powerful AI assistance enhanced by your custom tools! 🚀
