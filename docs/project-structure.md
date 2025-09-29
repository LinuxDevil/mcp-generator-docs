---
title: Project Structure Reference
description: Complete guide to the generated MCP server project structure, explaining directories, files, and customization points.
keywords: [project structure, MCP server, directory layout, bin, lib, templates, generated files, customization]
---

# Project Structure Reference

Understanding the structure of generated MCP server projects helps you navigate, customize, and extend your servers effectively.

## Overview

When you create an MCP server with `mcp-server-generator`, you get a well-organized, production-ready project structure:

```
my-mcp-server/
├── 📁 bin/                     # Executable scripts and entry points
├── 📁 src/                     # TypeScript source code
├── 📁 dist/                    # Compiled JavaScript (after build)
├── 📁 lib/                     # Compiled library files and type definitions
├── 📁 tests/                   # Test files and test utilities
├── 📁 docs/                    # Generated documentation
├── 📁 .mcp/                    # MCP-specific configuration and metadata
├── 📄 package.json             # Project dependencies and scripts
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 jest.config.js           # Testing configuration
├── 📄 mcp-inspector.config.json # MCP Inspector configuration
├── 📄 README.md                # Project documentation
└── 📄 LICENSE                  # License file
```

## Core Directories

### `bin/` Directory

Contains executable scripts and entry points for different runtime environments:

```
bin/
├── server.js              # Main server executable (stdio mode)
├── server-http.js         # HTTP server executable
├── cli.js                 # CLI interface for testing
└── inspector.js           # MCP Inspector integration
```

**Key Files:**
- **`server.js`** - Entry point for stdio transport (Claude Desktop integration)
- **`server-http.js`** - Entry point for HTTP transport (web services, Cursor)
- **`cli.js`** - Command-line interface for testing and debugging

### `src/` Directory

Contains all TypeScript source code organized by component type:

```
src/
├── 📁 tools/               # MCP tools (functionality)
├── 📁 resources/           # MCP resources (data/docs)
├── 📁 prompts/             # MCP prompts (intelligent templates)
├── 📁 services/            # Business logic and utilities
├── 📁 transports/          # Communication layer implementations
├── 📁 utils/               # Helper functions and utilities
├── 📁 config/              # Configuration management
├── 📄 server.ts            # Main server implementation
├── 📄 index.ts             # Public API exports
└── 📄 types.ts             # Shared type definitions
```

#### `src/tools/` - MCP Tools

Tools provide functionality that can be called by MCP clients:

```
src/tools/
├── calculator-tool.ts              # Example: Mathematical calculations
├── data-analysis-tool.ts           # Advanced data analysis capabilities
├── server-status-tool.ts           # Server health and monitoring
├── start-elicitation-tool.ts       # Interactive information gathering
├── continue-elicitation-tool.ts    # Continue elicitation sessions
├── get-elicitation-status-tool.ts  # Session status and summaries
├── generate-sample-tool.ts         # Data sampling strategies
├── analyze-sample-tool.ts          # Sample analysis and validation
└── generate-synthetic-data-tool.ts # Synthetic data generation
```

**Tool Structure Pattern:**
```typescript
// src/tools/example-tool.ts
export class ExampleTool {
  constructor(private name: string = 'example') {}
  
  register(server: McpServer): void {
    server.registerTool(
      this.name,
      {
        title: "Tool Title",
        description: "What this tool does",
        inputSchema: {
          // Zod schema for input validation
        }
      },
      async (args) => {
        // Tool implementation
        return { content: [{ type: "text", text: "Result" }] };
      }
    );
  }
}
```

#### `src/resources/` - MCP Resources

Resources provide data, documentation, and configuration:

```
src/resources/
├── data-analysis-resource.ts       # Analysis guides and documentation
├── server-info-resource.ts         # Server configuration and status
├── user-guide-resource.ts          # User documentation
├── api-documentation-resource.ts   # API reference
├── workflow-resource.ts            # Process guides
├── best-practices-resource.ts      # Coding standards and guidelines
├── sampling-strategies-resource.ts # Data sampling documentation
├── elicitation-guide-resource.ts   # Information gathering guides
└── configuration-resource.ts       # Runtime configuration
```

**Resource Structure Pattern:**
```typescript
// src/resources/example-resource.ts
export class ExampleResource {
  constructor(private name: string = 'example') {}
  
  register(server: McpServer): void {
    server.registerResource(
      `${this.name}-info`,
      `example://info`,
      {
        title: "Resource Title",
        description: "What this resource provides",
        mimeType: "text/markdown"
      },
      async () => {
        return {
          contents: [{
            uri: `example://info`,
            text: this.getContent(),
            mimeType: "text/markdown"
          }]
        };
      }
    );
  }
}
```

#### `src/prompts/` - MCP Prompts

Prompts provide intelligent templates and AI assistance:

```
src/prompts/
├── research-analysis-prompt.ts     # Research methodology templates
├── interactive-exploration-prompt.ts # Question generation
├── guided-discovery-prompt.ts      # Knowledge elicitation
└── code-review-prompt.ts           # Code review templates (custom)
```

**Prompt Structure Pattern:**
```typescript
// src/prompts/example-prompt.ts
export class ExamplePrompt {
  constructor(private name: string = 'example') {}
  
  register(server: McpServer): void {
    server.registerPrompt(
      this.name,
      {
        title: "Prompt Title",
        description: "What this prompt generates",
        argsSchema: {
          // Zod schema for arguments
        }
      },
      async (args) => {
        return {
          description: "Generated prompt description",
          messages: [{
            role: "user",
            content: {
              type: "text",
              text: this.generatePrompt(args)
            }
          }]
        };
      }
    );
  }
}
```

#### `src/services/` - Business Logic

Services contain business logic and complex operations:

```
src/services/
├── elicitation.ts           # Interactive information gathering
├── example.ts               # Example service implementation
├── sampling.ts              # Data sampling algorithms
├── data-processor.ts        # Data processing utilities (custom)
└── auth-manager.ts          # Authentication services (custom)
```

#### `src/transports/` - Communication Layers

Transport implementations for different protocols:

```
src/transports/
├── stdio-transport.ts       # Standard I/O transport (Claude Desktop)
├── http-transport.ts        # HTTP transport (web services)
├── websocket-transport.ts   # WebSocket transport (custom)
└── base-transport.ts        # Base transport interface
```

#### `src/utils/` - Utilities

Helper functions and shared utilities:

```
src/utils/
├── health.ts               # Health check utilities
├── logger.ts               # Logging configuration
├── validation.ts           # Input validation helpers
├── crypto.ts               # Cryptographic utilities
├── string-helpers.ts       # String manipulation
├── file-utils.ts           # File system operations
└── error-handling.ts       # Error handling patterns
```

#### `src/config/` - Configuration

Configuration management and environment handling:

```
src/config/
├── index.ts                # Main configuration exports
├── development.ts          # Development environment config
├── production.ts           # Production environment config
├── transport-config.ts     # Transport-specific settings
└── security-config.ts      # Security and authentication settings
```

### `lib/` Directory

Generated after compilation, contains JavaScript files and type definitions:

```
lib/
├── 📁 tools/               # Compiled tools
├── 📁 resources/           # Compiled resources
├── 📁 prompts/             # Compiled prompts
├── 📁 services/            # Compiled services
├── 📁 transports/          # Compiled transports
├── 📁 utils/               # Compiled utilities
├── 📄 server.js            # Compiled main server
├── 📄 server.d.ts          # Type definitions
├── 📄 index.js             # Compiled exports
└── 📄 index.d.ts           # Export type definitions
```

### `tests/` Directory

Comprehensive testing setup:

```
tests/
├── 📁 tools/               # Tool-specific tests
├── 📁 resources/           # Resource tests
├── 📁 prompts/             # Prompt tests
├── 📁 integration/         # Integration tests
├── 📁 fixtures/            # Test data and fixtures
├── 📄 setup.ts             # Test environment setup
└── 📄 test-utils.ts        # Testing utilities
```

### `.mcp/` Directory

MCP-specific metadata and configuration:

```
.mcp/
├── 📄 components.json      # Component registry
├── 📄 config.json          # MCP server configuration
├── 📄 templates/           # Component templates
└── 📄 backups/            # Component backup files
```

## Key Configuration Files

### `package.json`

Contains project metadata, dependencies, and useful scripts:

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts",
  "bin": {
    "my-mcp-server": "./bin/server.js"
  },
  "scripts": {
    "build": "tsc",
    "dev:stdio": "tsx src/server.ts",
    "dev:http": "tsx src/server-http.ts",
    "dev:http:stateless": "tsx src/server-http.ts --stateless",
    "start": "node lib/server.js",
    "start:http": "node lib/server-http.js",
    "test": "jest",
    "quick:test": "tsx bin/quick-test.ts",
    "inspector": "tsx bin/inspector.ts",
    "inspector:cli": "tsx bin/inspector-cli.ts",
    "test:tools": "tsx bin/test-tools.ts",
    "test:resources": "tsx bin/test-resources.ts",
    "test:prompts": "tsx bin/test-prompts.ts"
  }
}
```

### `tsconfig.json`

TypeScript configuration optimized for MCP development:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "outDir": "./lib",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "lib", "dist"]
}
```

### `mcp-inspector.config.json`

MCP Inspector configuration for testing and debugging:

```json
{
  "servers": {
    "my-mcp-server-stdio": {
      "command": "tsx",
      "args": ["src/server.ts"],
      "env": {}
    },
    "my-mcp-server-http": {
      "url": "http://localhost:3000",
      "type": "http"
    }
  }
}
```

## Component File Locations

When you add new components, they're placed in specific directories:

| Component Type | Directory | Example File |
|----------------|-----------|--------------|
| **Tools** | `src/tools/` | `calculator-tool.ts` |
| **Resources** | `src/resources/` | `user-guide-resource.ts` |
| **Prompts** | `src/prompts/` | `code-review-prompt.ts` |
| **Services** | `src/services/` | `data-processor.ts` |
| **Transports** | `src/transports/` | `websocket-transport.ts` |
| **Utils** | `src/utils/` | `string-helpers.ts` |

## Customization Points

### Adding Custom Components

```bash
# Add components to extend functionality
npx mcp-server-generator add tool my-custom-tool
npx mcp-server-generator add resource my-data-source
npx mcp-server-generator add prompt my-template
```

### Modifying Server Configuration

Edit `src/config/` files to customize:
- **Transport settings** - ports, protocols, security
- **Authentication** - OAuth, API keys, session management
- **Logging** - levels, formats, destinations
- **Performance** - caching, rate limiting, optimization

### Custom Transport Implementation

Create new transports in `src/transports/`:

```typescript
// src/transports/my-custom-transport.ts
export class MyCustomTransport extends BaseTransport {
  // Custom transport implementation
}
```

### Environment-Specific Configuration

Customize behavior for different environments:

```typescript
// src/config/production.ts
export const productionConfig = {
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
  logging: {
    level: 'info',
    format: 'json'
  },
  security: {
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(','),
      credentials: true
    }
  }
};
```

## Build and Distribution

### Development Build

```bash
npm run build  # Compiles TypeScript to lib/
```

### Production Preparation

```bash
# Clean build
rm -rf lib/ dist/
npm run build

# Run tests
npm test

# Package for distribution
npm pack
```

### Docker Structure

Generated projects include Docker support:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY lib/ ./lib/
COPY bin/ ./bin/
EXPOSE 3000
CMD ["npm", "run", "start:http"]
```

## Best Practices

### File Organization

- **Keep components focused** - one responsibility per file
- **Use consistent naming** - `{purpose}-{type}.ts` pattern
- **Group related functionality** - services, utilities, configuration
- **Separate concerns** - business logic in services, transport in transports

### Customization Guidelines

- **Extend, don't modify** - add new components rather than changing existing ones
- **Use configuration** - make behavior configurable through environment variables
- **Follow patterns** - use established patterns for new components
- **Document changes** - update README and add inline documentation

### Testing Structure

- **Mirror source structure** - test files should mirror `src/` organization
- **Use descriptive names** - `calculator-tool.test.ts`, `auth-integration.test.ts`
- **Include fixtures** - test data in `tests/fixtures/`
- **Test all layers** - unit tests for components, integration tests for workflows

## Next Steps

Now that you understand the project structure:

- **[Add Components](./components/overview.md)** - Extend your server with new functionality
- **[CLI Commands](./cli-commands.md)** - Learn all available commands
- **[Testing Guide](./testing-debugging.md)** - Comprehensive testing strategies
- **[Tutorials & Examples](./tutorials-and-examples.md)** - Learn implementation patterns by building

Understanding the project structure is key to building maintainable, scalable MCP servers! 🏗️
