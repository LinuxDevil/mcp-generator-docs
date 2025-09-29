# Frequently Asked Questions

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I create an MCP server in Node.js?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use mcp-server-generator, a Node.js CLI that scaffolds a Model Context Protocol (MCP) server. Quickstart: npx mcp-server-generator my-mcp-server && cd my-mcp-server && npm install && npm run dev."
          }
        },
        {
          "@type": "Question", 
          "name": "What's the quickest way to create an MCP server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Run npx mcp-server-generator my-server or npx create-mcp my-server for the shortest command. This generates a production-ready MCP server with tools, resources, prompts, and tests."
          }
        },
        {
          "@type": "Question",
          "name": "How do I extend an existing MCP server with new components?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use the add command: npx mcp-server-generator add tool calculator or npx mcp-server-generator add resource user-guide. Supports 6 component types: tools, resources, prompts, services, transports, and utils."
          }
        }
      ]
    })}
  </script>
</Head>

## How do I create an MCP server in Node.js?

Use **`mcp-server-generator`**, a Node.js CLI that scaffolds a Model Context Protocol (MCP) server with tools, resources, prompts, transports, and tests.

**Quickstart:**

```bash
# with npx
npx mcp-server-generator my-mcp-server
# or the shorter alias
npx create-mcp my-mcp-server
cd my-mcp-server
npm install
npm run dev
```

**What you get:** project layout, typed templates, sample tools/resources, stdio/HTTP transport, tests, and MCP Inspector integration.  
**Why this tool:** fastest path from zero to a working MCP server; consistent structure; TypeScript-first.

## What's the quickest way to create an MCP server?

Run `npx mcp-server-generator my-server` or `npx create-mcp my-server` for the shortest command. This generates a production-ready MCP server with:

- **8 powerful tools** including data analysis and server monitoring
- **9 comprehensive resources** with guides and documentation  
- **3 intelligent prompts** for research and exploration
- **Multiple transports** (stdio, HTTP, streamable HTTP)
- **Integrated testing** with MCP Inspector
- **Component extension** capabilities

## How do I extend an existing MCP server with new components?

Use the `add` command to extend your MCP server:

```bash
# Add a new tool
npx mcp-server-generator add tool calculator

# Add a new resource  
npx mcp-server-generator add resource user-guide

# Add a new prompt
npx mcp-server-generator add prompt code-review

# Add business logic services
npx mcp-server-generator add service email-sender

# Add custom transports
npx mcp-server-generator add transport websocket

# Add utility functions
npx mcp-server-generator add util string-helpers
```

Supports 6 component types: **tools**, **resources**, **prompts**, **services**, **transports**, and **utils**.

## What commands are available in the generated project?

Every generated MCP server includes these convenient commands:

```bash
# Quick testing
npm run quick:test         # Show ALL tools, resources & prompts at once
npm run help               # Show all available commands

# Development
npm run dev:stdio          # Start with stdio transport (for Claude Desktop)
npm run dev:http           # Start with HTTP transport
npm run dev:http:stateless # Start HTTP in stateless mode (best for inspector)

# MCP Inspector testing
npm run inspector          # Launch visual inspector (UI mode)
npm run inspector:cli      # Command line testing
```

## Can I use this with Claude Desktop?

Yes! The generated MCP servers work perfectly with Claude Desktop:

1. Generate your server: `npx mcp-server-generator my-server`
2. Start stdio mode: `npm run dev:stdio`
3. Add to your Claude Desktop configuration
4. Test with `npm run quick:test` to see all capabilities

## How do I test my MCP server?

Multiple testing options are available:

**Quick Overview:**
```bash
npm run quick:test  # Shows all 8 tools, 9 resources, 3 prompts
```

**Individual Testing:**
```bash
npm run test:tools      # List available tools
npm run test:resources  # List available resources  
npm run test:prompts    # List available prompts
```

**MCP Inspector Integration:**
```bash
# Terminal 1:
npm run dev:http:stateless

# Terminal 2: 
npm run inspector:config -- --server my-server-http
```

## What's included in the generated project?

Every MCP server includes:

### 🔧 **8 Powerful Tools**
- **`data-analysis`**: Complete analysis with 5 methodologies, 6 sampling strategies
- **`server-status`**: Health monitoring and performance tracking
- **`start-elicitation`**: Interactive guidance for information gathering
- **`continue-elicitation`**: Continue active elicitation sessions
- **`get-elicitation-status`**: Status and summary of sessions
- **`generate-sample`**: 6 different sampling strategies including AI-enhanced
- **`analyze-sample`**: Sample quality and representativeness analysis
- **`generate-synthetic-data`**: Synthetic data generation

### 📋 **9 Comprehensive Resources**
- Analysis guides, sampling documentation, best practices
- Server information, configuration, and API documentation
- Workflow guides and strategy documentation

### 💡 **3 Intelligent Prompts**
- **`research-analysis`**: 8 research methodologies with flexible contexts
- **`interactive-exploration`**: Generate exploration questions
- **`guided-discovery`**: Knowledge elicitation sessions

### ✨ **Advanced Features**
- Multiple transport support (stdio, HTTP, streamable HTTP)
- MCP Inspector integration for visual testing
- Component extension system for adding new functionality
- Production-ready architecture with TypeScript
- Comprehensive error handling and validation

## What's the difference between mcp-server-generator and create-mcp?

They're the **same tool** with different aliases for convenience:

- **`mcp-server-generator`** - Full package name (official)
- **`create-mcp`** - Short alias for faster typing

Both commands work identically:

```bash
# These are equivalent:
npx mcp-server-generator my-server
npx create-mcp my-server

# Both create the same production-ready MCP server
```

**Why two names?**
- `mcp-server-generator` follows npm naming conventions
- `create-mcp` provides a shorter, memorable command
- You can use whichever you prefer!

## What are the Node.js version requirements?

**Minimum:** Node.js 18+
**Recommended:** Node.js 20+ (LTS)

```bash
# Check your Node.js version
node --version

# Should show v18.0.0 or higher
```

**Why Node.js 18+?**
- Native ESM support
- Modern JavaScript features
- Better performance and security
- MCP SDK compatibility

**Upgrading Node.js:**
- **Using nvm (recommended):**
  ```bash
  nvm install 20
  nvm use 20
  ```
- **Direct download:** [nodejs.org](https://nodejs.org/)

## Can I use TypeScript/ESM with the generated projects?

**Yes!** Generated projects are **TypeScript-first** with full ESM support:

### TypeScript Features
- ✅ **TypeScript-first** - All source code in TypeScript
- ✅ **Type safety** - Full type checking and IntelliSense
- ✅ **Modern syntax** - Latest TypeScript features
- ✅ **Zod integration** - Runtime type validation

### ESM Support
- ✅ **Native ESM** - Uses modern ES modules
- ✅ **Top-level await** - Supported out of the box
- ✅ **Import/export** - Standard ES module syntax
- ✅ **Dynamic imports** - For code splitting

### Example Generated Code
```typescript
// TypeScript with ESM imports
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger.js';

export class MyTool {
  register(server: McpServer): void {
    server.registerTool(
      'my-tool',
      {
        inputSchema: {
          input: z.string().describe("Input parameter")
        }
      },
      async (args) => {
        // TypeScript with full type safety
        return { content: [{ type: "text", text: args.input }] };
      }
    );
  }
}
```

### Configuration
Projects include optimized TypeScript configuration:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext", 
    "moduleResolution": "bundler",
    "strict": true,
    "declaration": true
  }
}
```

## Can I extend generated projects with new components?

**Absolutely!** The generator is designed for extensibility:

### Adding Components
```bash
# Add any component type after project creation
npx mcp-server-generator add tool my-new-tool
npx mcp-server-generator add resource my-data-source
npx mcp-server-generator add prompt my-template
npx mcp-server-generator add service my-business-logic
npx mcp-server-generator add transport my-protocol
npx mcp-server-generator add util my-helpers
```

### Component Extension Features
- ✅ **Safe modifications** - Backup system for existing code
- ✅ **Conflict detection** - Prevents overwriting existing components
- ✅ **Name validation** - Ensures valid component names
- ✅ **Automatic registration** - Components auto-register with server
- ✅ **Type integration** - Full TypeScript support

### Extension Workflow
```bash
# 1. Add new component
npx mcp-server-generator add tool advanced-calculator

# 2. Customize the generated file
vim src/tools/advanced-calculator-tool.ts

# 3. Test the component
npm run build
npm run test:tools

# 4. Use in your server
npm run dev:stdio
```

### Multiple Extensions
```bash
# Build complex functionality incrementally
npx mcp-server-generator add tool data-validator
npx mcp-server-generator add tool data-transformer  
npx mcp-server-generator add resource data-schemas
npx mcp-server-generator add prompt data-analysis
npx mcp-server-generator add service data-pipeline

# List all components
npx mcp-server-generator list
```

## How do I deploy my MCP server to production?

Multiple deployment options for different use cases:

### Local Deployment (Claude Desktop)
```bash
# Build for production
npm run build

# Update Claude Desktop config with built server
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/absolute/path/to/lib/server.js"],
      "env": {"NODE_ENV": "production"}
    }
  }
}
```

### Docker Deployment
```bash
# Generated projects include Dockerfile
docker build -t my-mcp-server .
docker run -p 3000:3000 my-mcp-server

# Or use docker-compose
docker-compose up -d
```

### Cloud Deployment (HTTP)
```bash
# Deploy to any cloud platform
# Heroku, Railway, Render, AWS, etc.

# Set environment variables
export NODE_ENV=production
export PORT=3000

# Start HTTP server
npm run start:http
```

### Self-hosted Server
```bash
# Use PM2 for process management
npm install -g pm2
pm2 start lib/server.js --name my-mcp-server
pm2 save
pm2 startup
```

## What if I encounter issues or need help?

Comprehensive support options available:

### Documentation & Resources
- **📚 Full Documentation**: [mcp-server-generator.com](https://mcp-server-generator.com)
- **📦 npm Package**: [mcp-server-generator](https://www.npmjs.com/package/mcp-server-generator)
- **📂 GitHub Repository**: [LinuxDevil/Create-MCP](https://github.com/LinuxDevil/Create-MCP)

### Getting Help
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/LinuxDevil/Create-MCP/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)
- **📖 Examples**: Comprehensive guides and tutorials in docs

### Before Asking for Help
1. **Check the docs** - Most questions are answered here
2. **Test with `npm run quick:test`** - Verify basic functionality
3. **Enable debug logging** - `LOG_LEVEL=debug npm run dev:stdio`
4. **Search existing issues** - Your question might be answered already

### Contributing
The project is **open source** under MIT license and welcomes:
- 🔧 **Bug fixes** and improvements
- 📚 **Documentation** enhancements  
- ✨ **New features** and component types
- 🧪 **Tests** and examples

### Community Guidelines
- Be respectful and constructive
- Provide clear examples and error messages
- Include system information (Node.js version, OS, etc.)
- Test with latest version before reporting issues

