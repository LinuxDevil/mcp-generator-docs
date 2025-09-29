# Components Overview

Learn how to create and customize MCP server components.

## What are Components?

Components are the building blocks of MCP servers. MCP Server Generator supports six types of components, each serving a specific purpose in the MCP ecosystem.

## Component Types

### 🛠️ Tools

**Purpose**: Add functionality and actions to your MCP server

Tools allow your MCP server to perform actions and operations. They're the "verbs" of your server - what it can do.

**Examples:**
- `calculator` - Perform mathematical calculations
- `file-manager` - Handle file operations
- `data-validator` - Validate data formats
- `email-sender` - Send emails
- `image-processor` - Process and transform images

**Generated Structure:**
```typescript
// src/tools/my-tool.ts
export class MyTool {
  register(server: McpServer): void {
    server.registerTool(
      this.name,
      {
        title: "My Tool",
        description: "Description of what this tool does",
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

### 📋 Resources

**Purpose**: Provide data and documentation

Resources expose data that your MCP server can read. They're the "nouns" of your server - what information it contains.

**Examples:**
- `user-guide` - Documentation and help content
- `api-docs` - API documentation
- `configuration` - Server configuration data
- `datasets` - Sample or reference data
- `templates` - Template files

**Generated Structure:**
```typescript
// src/resources/my-resource.ts
export class MyResource {
  register(server: McpServer): void {
    server.registerResource(
      `${this.name}-info`,
      `myresource://info`,
      {
        title: "My Resource",
        description: "Description of this resource",
        mimeType: "text/plain"
      },
      async () => {
        return {
          contents: [{
            uri: `myresource://info`,
            text: "Resource content",
            mimeType: "text/plain"
          }]
        };
      }
    );
  }
}
```

### 💡 Prompts

**Purpose**: Provide intelligent prompt templates

Prompts help generate structured prompts for AI models, making it easier to get consistent, high-quality responses.

**Examples:**
- `code-review` - Generate code review prompts
- `analysis` - Create analysis prompts
- `summary` - Generate summary prompts
- `documentation` - Create documentation prompts
- `testing` - Generate test case prompts

**Generated Structure:**
```typescript
// src/prompts/my-prompt.ts
export class MyPrompt {
  register(server: McpServer): void {
    server.registerPrompt(
      this.name,
      {
        title: "My Prompt",
        description: "Description of this prompt",
        argsSchema: {
          // Zod schema for prompt arguments
        }
      },
      async (args) => {
        return {
          description: "Generated prompt",
          messages: [{
            role: "user",
            content: { type: "text", text: "Prompt content" }
          }]
        };
      }
    );
  }
}
```

### ⚙️ Services

**Purpose**: Implement business logic and processing

Services contain the core business logic of your application. They're reusable components that tools, resources, and other parts of your system can use.

**Examples:**
- `email-sender` - Email delivery service
- `data-processor` - Data processing and transformation
- `auth-manager` - Authentication and authorization
- `cache-manager` - Caching operations
- `workflow-engine` - Workflow management

**Generated Structure:**
```typescript
// src/services/my-service.ts
export class MyService {
  constructor() {
    // Initialize service
  }

  async processData(data: any): Promise<any> {
    // Service implementation
    return processedData;
  }

  async healthCheck(): Promise<boolean> {
    // Health check implementation
    return true;
  }
}
```

### 🌐 Transports

**Purpose**: Add custom communication layers

Transports handle how your MCP server communicates with clients. While stdio and HTTP are provided by default, you can add custom transports for specific protocols.

**Examples:**
- `websocket` - WebSocket transport
- `grpc` - gRPC transport
- `mqtt` - MQTT transport
- `tcp` - TCP socket transport
- `rabbitmq` - RabbitMQ transport

**Generated Structure:**
```typescript
// src/transports/my-transport.ts
export class MyTransport {
  constructor(private config: TransportConfig) {}

  async start(): Promise<void> {
    // Start transport server
  }

  async stop(): Promise<void> {
    // Stop transport server
  }

  private handleConnection(connection: Connection): void {
    // Handle incoming connections
  }
}
```

### 🔧 Utils

**Purpose**: Provide helper functions and utilities

Utilities are reusable helper functions that other components can use. They encapsulate common functionality and promote code reuse.

**Examples:**
- `string-helpers` - String manipulation utilities
- `crypto-utils` - Cryptographic functions
- `validators` - Data validation utilities
- `formatters` - Data formatting functions
- `parsers` - Data parsing utilities

**Generated Structure:**
```typescript
// src/utils/my-utils.ts
export class MyUtils {
  static processString(input: string): string {
    // Utility implementation
    return processed;
  }

  static validateData(data: any): boolean {
    // Validation logic
    return isValid;
  }
}
```

## Component Lifecycle

### 1. Generation

When you add a component:

```bash
npx mcp-server-generator add tool my-tool
```

The generator:
1. Creates the component file
2. Updates the appropriate registry (`src/tools/index.ts`)
3. Adds imports and initialization code
4. Creates backup files for safety

### 2. Registration

Components are automatically registered in their respective registries:

```typescript
// src/tools/index.ts
import { MyTool } from './my-tool.js';

export class ToolRegistry {
  private tools: ToolBase[] = [];

  initializeTools(): void {
    this.tools = [
      new MyTool(),
      // Other tools...
    ];
  }

  registerAll(server: McpServer): void {
    this.tools.forEach(tool => tool.register(server));
  }
}
```

### 3. Integration

The main server automatically loads and registers all components:

```typescript
// src/core/mcp-server.ts
export class McpServer {
  constructor() {
    this.toolRegistry = new ToolRegistry();
    this.resourceRegistry = new ResourceRegistry();
    this.promptRegistry = new PromptRegistry();
  }

  async initialize(): Promise<void> {
    this.toolRegistry.initializeTools();
    this.resourceRegistry.initializeResources();
    this.promptRegistry.initializePrompts();
    
    this.toolRegistry.registerAll(this.server);
    this.resourceRegistry.registerAll(this.server);
    this.promptRegistry.registerAll(this.server);
  }
}
```

## Customization

### Configuration Options

When adding components, you can configure various options:

```bash
# Basic component
npx mcp-server-generator add tool calculator

# With description and author
npx mcp-server-generator add tool calculator \
  --description "Advanced mathematical calculator" \
  --author "Math Team"

# Skip validation (advanced users)
npx mcp-server-generator add tool calculator --skip-validation
```

### Interactive Configuration

The generator provides interactive prompts for component-specific features:

#### Tool Features
- **Input Validation**: Enable/disable strict input validation
- **Error Handling**: Configure error handling strategies
- **Async Operations**: Support for asynchronous operations
- **Caching**: Enable response caching
- **Output Formats**: Support multiple output formats

#### Resource Features
- **Resource Types**: Documentation, configuration, data
- **Data Formats**: JSON, text, markdown, binary
- **Caching**: Enable resource caching
- **Access Patterns**: Read-only, read-write, streaming

#### Prompt Features
- **Dynamic Parameters**: Support for dynamic prompt parameters
- **Multiple Formats**: Various output formats
- **Tone Options**: Professional, casual, academic, creative
- **Template Variations**: Multiple prompt templates

#### Service Features
- **Async Operations**: Asynchronous processing support
- **Error Handling**: Comprehensive error handling
- **Logging**: Structured logging
- **Health Checks**: Health monitoring
- **Retry Logic**: Automatic retry mechanisms

#### Transport Features
- **Transport Type**: HTTP, WebSocket, TCP, etc.
- **Security**: Authentication, encryption, authorization
- **Compression**: Data compression support
- **Connection Management**: Connection pooling, keep-alive

#### Utility Features
- **Utility Type**: Data processing, validation, formatting
- **Caching**: Result caching
- **Error Handling**: Error handling strategies
- **Performance**: Performance optimization
- **Debug Support**: Debugging utilities

## Component Architecture

### Dependency Injection

Components use dependency injection for better testability and modularity:

```typescript
// Service injection
export class DataProcessorTool {
  constructor(
    private dataService: DataService,
    private logger: Logger,
    private config: Config
  ) {}
}

// Utility injection
export class ValidationService {
  constructor(
    private validators: ValidationUtils,
    private formatters: FormatterUtils
  ) {}
}
```

### Interface Compliance

All components implement standard interfaces:

```typescript
// Tool interface
interface ToolBase {
  register(server: McpServer): void;
}

// Service interface
interface ServiceBase {
  initialize(): Promise<void>;
  healthCheck(): Promise<boolean>;
  shutdown(): Promise<void>;
}

// Resource interface
interface ResourceBase {
  register(server: McpServer): void;
}
```

### Error Handling

Consistent error handling across all components:

```typescript
export class ComponentBase {
  protected handleError(error: Error, context: string): ErrorResponse {
    this.logger.error(`${context}: ${error.message}`, { error });
    
    return {
      success: false,
      error: error.message,
      content: [{
        type: "text",
        text: `Error: ${error.message}`
      }]
    };
  }
}
```

## Best Practices

### Naming Conventions

- Use descriptive, kebab-case names
- Include the component type in the filename
- Follow consistent patterns

```bash
# Good examples
npx mcp-server-generator add tool csv-parser
npx mcp-server-generator add resource user-documentation
npx mcp-server-generator add prompt code-analysis

# Avoid
npx mcp-server-generator add tool tool1
npx mcp-server-generator add resource data
```

### Component Design

1. **Single Responsibility**: Each component should have one clear purpose
2. **Interface Compliance**: Follow standard interfaces
3. **Error Handling**: Implement comprehensive error handling
4. **Logging**: Add appropriate logging
5. **Documentation**: Include JSDoc comments

### Testing

Test your components thoroughly:

```typescript
// Component test example
describe('CalculatorTool', () => {
  let tool: CalculatorTool;
  let mockServer: MockMcpServer;

  beforeEach(() => {
    tool = new CalculatorTool();
    mockServer = new MockMcpServer();
    tool.register(mockServer);
  });

  it('should perform basic arithmetic', async () => {
    const result = await tool.calculate({ expression: '2+2' });
    expect(result.content[0].text).toContain('4');
  });
});
```

## Advanced Topics

### Custom Component Types

For advanced use cases, you can create custom component types by:

1. Creating custom interfaces
2. Implementing custom registries
3. Updating the main server initialization

### Component Communication

Components can communicate through:

1. **Shared Services**: Inject common services
2. **Event System**: Use event emitters for loose coupling
3. **Message Passing**: Implement message queues

### Performance Optimization

- **Lazy Loading**: Load components on demand
- **Caching**: Cache component responses
- **Pooling**: Use object pooling for heavy components
- **Async Processing**: Use worker threads for CPU-intensive tasks

## Next Steps

- **[API Reference](../api/overview.md)** - Complete technical documentation
- **[CLI Commands](../cli-commands.md)** - Component management commands
- **[Component Tutorials](../tutorials-and-examples.md)** - Build components step-by-step
- **[GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)** - Community support and patterns
