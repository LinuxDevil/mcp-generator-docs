# Examples

Comprehensive examples showcasing MCP Server Generator capabilities.

## Quick Start Examples

### Basic Project Creation

```bash
# Create a simple MCP server
npx mcp-server-generator my-first-server

# Navigate and start
cd my-first-server
npm run dev:stdio
```

### Advanced Project Setup

```bash
# Create with full configuration
npx mcp-server-generator advanced-server \
  --description "Advanced data processing MCP server" \
  --author "Your Team" \
  --transport both \
  --oauth \
  --stateless \
  --verbose
```

## Component Addition Examples

### Adding Tools

```bash
# Basic calculator tool
npx mcp-server-generator add tool calculator

# Advanced file processor
npx mcp-server-generator add tool file-processor \
  --description "Process and transform files" \
  --author "Data Team"
```

Generated tool structure:
```typescript
// src/tools/calculator-tool.ts
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export class CalculatorTool {
  constructor(private name: string = 'calculator') {}

  register(server: McpServer): void {
    server.registerTool(
      this.name,
      {
        title: "Calculator",
        description: "Perform mathematical calculations",
        inputSchema: {
          expression: z.string().describe("Mathematical expression to evaluate"),
          precision: z.number().optional().describe("Number of decimal places")
        }
      },
      async (args) => {
        // Implementation here
        return {
          content: [{
            type: "text",
            text: `Result: ${result}`
          }]
        };
      }
    );
  }
}
```

### Adding Resources

```bash
# Documentation resource
npx mcp-server-generator add resource user-guide

# Configuration resource
npx mcp-server-generator add resource app-config \
  --description "Application configuration data"
```

Generated resource structure:
```typescript
// src/resources/user-guide-resource.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export class UserGuideResource {
  constructor(private name: string = 'user-guide') {}

  register(server: McpServer): void {
    server.registerResource(
      `${this.name}-info`,
      `userguide://info`,
      {
        title: "User Guide Information",
        description: "Comprehensive user guide and documentation",
        mimeType: "text/markdown"
      },
      async () => {
        return {
          contents: [{
            uri: `userguide://info`,
            text: this.getGuideContent(),
            mimeType: "text/markdown"
          }]
        };
      }
    );
  }
}
```

### Adding Prompts

```bash
# Code review prompt
npx mcp-server-generator add prompt code-review

# Analysis prompt
npx mcp-server-generator add prompt data-analysis \
  --description "Generate data analysis prompts"
```

Generated prompt structure:
```typescript
// src/prompts/code-review-prompt.ts
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export class CodeReviewPrompt {
  constructor(private name: string = 'code-review') {}

  register(server: McpServer): void {
    server.registerPrompt(
      this.name,
      {
        title: "Code Review",
        description: "Generate comprehensive code review prompts",
        argsSchema: {
          code: z.string().describe("Code to review"),
          language: z.string().optional().describe("Programming language"),
          focus: z.enum(["security", "performance", "style", "logic"]).optional()
        }
      },
      async (args) => {
        const prompt = this.generateReviewPrompt(args);
        return {
          description: "Code review analysis prompt",
          messages: [{
            role: "user",
            content: {
              type: "text",
              text: prompt
            }
          }]
        };
      }
    );
  }
}
```

## Real-World Use Cases

### 1. Data Analysis Server

Complete example for a data analysis MCP server:

```bash
# Create the base project
npx mcp-server-generator data-analysis-server \
  --description "Comprehensive data analysis MCP server" \
  --transport both

cd data-analysis-server

# Add custom components
npx mcp-server-generator add tool csv-parser \
  --description "Parse and analyze CSV files"

npx mcp-server-generator add tool statistical-analyzer \
  --description "Perform statistical analysis on datasets"

npx mcp-server-generator add resource datasets \
  --description "Sample datasets for analysis"

npx mcp-server-generator add prompt analysis-report \
  --description "Generate comprehensive analysis reports"

npx mcp-server-generator add service data-processor \
  --description "Process and clean data"

npx mcp-server-generator add util validation \
  --description "Data validation utilities"
```

### 2. API Gateway Server

Example for creating an API gateway MCP server:

```bash
# Create API gateway project
npx mcp-server-generator api-gateway \
  --description "MCP API Gateway server" \
  --transport http \
  --oauth

cd api-gateway

# Add gateway components
npx mcp-server-generator add tool api-router \
  --description "Route API requests"

npx mcp-server-generator add tool rate-limiter \
  --description "Rate limiting for API calls"

npx mcp-server-generator add resource api-docs \
  --description "API documentation and specs"

npx mcp-server-generator add service auth-manager \
  --description "Authentication and authorization"

npx mcp-server-generator add transport webhook \
  --description "Webhook transport for events"

npx mcp-server-generator add util request-logger \
  --description "Log and monitor API requests"
```

### 3. Content Management Server

Example for a content management system:

```bash
# Create CMS project
npx mcp-server-generator cms-server \
  --description "Content Management MCP server"

cd cms-server

# Add CMS components
npx mcp-server-generator add tool content-editor \
  --description "Edit and manage content"

npx mcp-server-generator add tool media-processor \
  --description "Process images and media files"

npx mcp-server-generator add resource content-templates \
  --description "Content templates and layouts"

npx mcp-server-generator add prompt content-generator \
  --description "Generate content based on prompts"

npx mcp-server-generator add service workflow-engine \
  --description "Content workflow management"

npx mcp-server-generator add util slug-generator \
  --description "Generate URL-friendly slugs"
```

## Testing Examples

### Component Testing

After adding components, test them:

```bash
# Build the project
npm run build

# Test all components
npm run quick:test

# Test specific component types
npm run test:tools
npm run test:resources
npm run test:prompts

# Use MCP Inspector
npm run inspector
```

### Manual Testing

```bash
# Start development server
npm run dev:stdio

# In another terminal, test with MCP Inspector CLI
npx @modelcontextprotocol/inspector --cli tsx src/server.ts \
  --method tools/call \
  --tool-name calculator \
  --tool-arg 'expression=2+2*3'
```

### Integration Testing

```bash
# Test with Claude Desktop integration
npm run dev:stdio

# Test HTTP endpoints
npm run dev:http
curl http://localhost:3000/health

# Test with MCP Inspector UI
npm run inspector
```

## Advanced Customization Examples

### Custom Tool Implementation

Customize the generated tool:

```typescript
// src/tools/advanced-calculator-tool.ts
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger.js';

export class AdvancedCalculatorTool {
  private history: string[] = [];

  register(server: McpServer): void {
    server.registerTool(
      'advanced-calculator',
      {
        title: "Advanced Calculator",
        description: "Perform complex mathematical calculations with history",
        inputSchema: {
          expression: z.string().describe("Mathematical expression"),
          saveToHistory: z.boolean().default(true).describe("Save to calculation history"),
          precision: z.number().min(0).max(10).default(2).describe("Decimal precision"),
          format: z.enum(["number", "scientific", "percentage"]).default("number")
        }
      },
      async (args) => {
        try {
          const result = this.calculate(args.expression, args.precision);
          
          if (args.saveToHistory) {
            this.history.push(`${args.expression} = ${result}`);
          }
          
          const formattedResult = this.formatResult(result, args.format);
          
          logger.info(`Calculator: ${args.expression} = ${result}`);
          
          return {
            content: [{
              type: "text",
              text: `Result: ${formattedResult}${args.saveToHistory ? ` (saved to history)` : ''}`
            }]
          };
        } catch (error) {
          logger.error(`Calculator error: ${error.message}`);
          return {
            content: [{
              type: "text", 
              text: `Error: ${error.message}`
            }]
          };
        }
      }
    );

    // Add history tool
    server.registerTool(
      'calculator-history',
      {
        title: "Calculator History",
        description: "View calculation history",
        inputSchema: {
          limit: z.number().min(1).max(100).default(10).describe("Number of recent calculations")
        }
      },
      async (args) => {
        const recentHistory = this.history.slice(-args.limit);
        return {
          content: [{
            type: "text",
            text: recentHistory.length > 0 
              ? `Recent calculations:\n${recentHistory.join('\n')}`
              : 'No calculations in history'
          }]
        };
      }
    );
  }

  private calculate(expression: string, precision: number): number {
    // Implement safe expression evaluation
    // Using a math parser library like math.js
    return parseFloat(result.toFixed(precision));
  }

  private formatResult(result: number, format: string): string {
    switch (format) {
      case 'scientific': return result.toExponential();
      case 'percentage': return `${(result * 100).toFixed(2)}%`;
      default: return result.toString();
    }
  }
}
```

### Custom Service Implementation

```typescript
// src/services/advanced-data-processor.ts
export class AdvancedDataProcessor {
  private processingQueue: ProcessingJob[] = [];
  private workers: Worker[] = [];

  constructor() {
    this.initializeWorkers();
  }

  async processData(data: any[], options: ProcessingOptions): Promise<ProcessedData> {
    const job = new ProcessingJob(data, options);
    this.processingQueue.push(job);
    
    return this.executeJob(job);
  }

  private async executeJob(job: ProcessingJob): Promise<ProcessedData> {
    // Implement advanced data processing
    // Support for parallel processing, caching, etc.
  }

  private initializeWorkers(): void {
    // Set up worker threads for parallel processing
  }
}
```

## Deployment Examples

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:http"]
```

```bash
# Build and run
docker build -t my-mcp-server .
docker run -p 3000:3000 my-mcp-server
```

### Production Configuration

```javascript
// Production config
export default {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json'
  },
  security: {
    oauth: {
      enabled: true,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET
    },
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      credentials: true
    }
  }
};
```

## Troubleshooting Examples

### Common Issues and Solutions

#### Component Not Registering

```bash
# Check if component is properly imported
npx mcp-server-generator list

# Rebuild and test
npm run build
npm run test
```

#### Build Errors

```bash
# Clean and rebuild
npm run clean
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

#### Runtime Errors

```bash
# Enable verbose logging
npm run dev:stdio --verbose

# Check logs
tail -f logs/server.log
```

## Best Practices

### Project Organization

```
my-mcp-server/
├── src/
│   ├── tools/           # All tools
│   ├── resources/       # All resources
│   ├── prompts/         # All prompts
│   ├── services/        # Business logic
│   ├── transports/      # Custom transports
│   ├── utils/           # Utilities
│   └── config/          # Configuration
├── tests/               # Test files
├── docs/                # Documentation
└── docker/              # Docker configs
```

### Naming Conventions

- **Tools**: `{purpose}-tool.ts` (e.g., `calculator-tool.ts`)
- **Resources**: `{type}-resource.ts` (e.g., `user-data-resource.ts`)
- **Prompts**: `{purpose}-prompt.ts` (e.g., `code-review-prompt.ts`)
- **Services**: `{purpose}.ts` (e.g., `data-processor.ts`)
- **Utilities**: `{purpose}.ts` (e.g., `string-helpers.ts`)

### Error Handling

```typescript
// Consistent error handling pattern
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  logger.error(`Operation failed: ${error.message}`);
  return { 
    success: false, 
    error: error.message,
    content: [{
      type: "text",
      text: `Error: ${error.message}`
    }]
  };
}
```

## Next Steps

- **[Component Development](./components/overview.md)** - Deep dive into component creation
- **[CLI Commands](./cli-commands.md)** - Complete command reference
- **[API Reference](./api/overview.md)** - Technical documentation
- **[GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)** - Community support and advanced topics
