# API Reference

Complete API reference for MCP Server Generator components.

## Core Interfaces

### ToolBase Interface

All tools must implement the `ToolBase` interface:

```typescript
interface ToolBase {
  register(server: McpServer): void;
}

// Example implementation
export class MyTool implements ToolBase {
  constructor(private name: string = 'my-tool') {}

  register(server: McpServer): void {
    server.registerTool(
      this.name,
      {
        title: "My Tool",
        description: "Tool description",
        inputSchema: {
          input: z.string().describe("Input parameter")
        }
      },
      async (args) => {
        // Implementation
        return { content: [{ type: "text", text: "Result" }] };
      }
    );
  }
}
```

### ResourceBase Interface

All resources must implement the `ResourceBase` interface:

```typescript
interface ResourceBase {
  register(server: McpServer): void;
}

// Example implementation
export class MyResource implements ResourceBase {
  constructor(private name: string = 'my-resource') {}

  register(server: McpServer): void {
    server.registerResource(
      `${this.name}-info`,
      `myresource://info`,
      {
        title: "My Resource",
        description: "Resource description",
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

### PromptBase Interface

All prompts must implement the `PromptBase` interface:

```typescript
interface PromptBase {
  register(server: McpServer): void;
}

// Example implementation
export class MyPrompt implements PromptBase {
  constructor(private name: string = 'my-prompt') {}

  register(server: McpServer): void {
    server.registerPrompt(
      this.name,
      {
        title: "My Prompt",
        description: "Prompt description",
        argsSchema: {
          topic: z.string().describe("Topic for the prompt")
        }
      },
      async (args) => {
        return {
          description: "Generated prompt",
          messages: [{
            role: "user",
            content: { type: "text", text: `Prompt about ${args.topic}` }
          }]
        };
      }
    );
  }
}
```

## MCP Server API

### Server Registration

#### registerTool()

Register a tool with the MCP server:

```typescript
server.registerTool(
  name: string,
  definition: ToolDefinition,
  handler: ToolHandler
): void

interface ToolDefinition {
  title: string;
  description: string;
  inputSchema: ZodSchema;
}

type ToolHandler = (args: any) => Promise<ToolResponse>;

interface ToolResponse {
  content: Array<{
    type: "text" | "image" | "resource";
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}
```

**Example:**
```typescript
server.registerTool(
  'calculator',
  {
    title: "Calculator",
    description: "Perform mathematical calculations",
    inputSchema: {
      expression: z.string().describe("Mathematical expression"),
      precision: z.number().optional().describe("Decimal precision")
    }
  },
  async (args) => {
    const result = eval(args.expression); // Use a safe evaluator
    return {
      content: [{
        type: "text",
        text: `Result: ${result.toFixed(args.precision || 2)}`
      }]
    };
  }
);
```

#### registerResource()

Register a resource with the MCP server:

```typescript
server.registerResource(
  name: string,
  uri: string,
  definition: ResourceDefinition,
  handler: ResourceHandler
): void

interface ResourceDefinition {
  title: string;
  description: string;
  mimeType: string;
}

type ResourceHandler = () => Promise<ResourceResponse>;

interface ResourceResponse {
  contents: Array<{
    uri: string;
    text?: string;
    blob?: Uint8Array;
    mimeType: string;
  }>;
}
```

**Example:**
```typescript
server.registerResource(
  'user-guide',
  'guide://user-manual',
  {
    title: "User Guide",
    description: "Comprehensive user manual",
    mimeType: "text/markdown"
  },
  async () => {
    return {
      contents: [{
        uri: 'guide://user-manual',
        text: '# User Guide\n\nThis is the user manual...',
        mimeType: "text/markdown"
      }]
    };
  }
);
```

#### registerPrompt()

Register a prompt with the MCP server:

```typescript
server.registerPrompt(
  name: string,
  definition: PromptDefinition,
  handler: PromptHandler
): void

interface PromptDefinition {
  title: string;
  description: string;
  argsSchema: ZodSchema;
}

type PromptHandler = (args: any) => Promise<PromptResponse>;

interface PromptResponse {
  description: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: {
      type: "text" | "image";
      text?: string;
      data?: string;
      mimeType?: string;
    };
  }>;
}
```

**Example:**
```typescript
server.registerPrompt(
  'code-review',
  {
    title: "Code Review",
    description: "Generate code review prompts",
    argsSchema: {
      code: z.string().describe("Code to review"),
      language: z.string().optional().describe("Programming language"),
      focus: z.enum(["security", "performance", "style"]).optional()
    }
  },
  async (args) => {
    const focus = args.focus || "general";
    const language = args.language || "unknown";
    
    return {
      description: `Code review prompt for ${language} code`,
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Please review the following ${language} code with focus on ${focus}:\n\n\`\`\`${language}\n${args.code}\n\`\`\``
        }
      }]
    };
  }
);
```

## Utility Classes

### Logger

Structured logging for MCP servers:

```typescript
interface Logger {
  debug(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
}

// Usage
import { logger } from '../utils/logger.js';

logger.info('Tool executed successfully', { 
  tool: 'calculator', 
  args: { expression: '2+2' },
  result: 4 
});

logger.error('Tool execution failed', { 
  tool: 'calculator', 
  error: error.message 
});
```

### ConfigManager

Configuration management:

```typescript
interface ConfigManager {
  get<T>(key: string, defaultValue?: T): T;
  set(key: string, value: any): void;
  has(key: string): boolean;
  getAll(): Record<string, any>;
}

// Usage
import { configManager } from '../utils/config.js';

const apiKey = configManager.get('apiKey');
const timeout = configManager.get('timeout', 5000);
const debug = configManager.get('debug', false);
```

### HealthChecker

Health monitoring utilities:

```typescript
interface HealthChecker {
  registerCheck(name: string, check: HealthCheck): void;
  runChecks(): Promise<HealthStatus>;
  isHealthy(): Promise<boolean>;
}

interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
  timeout?: number;
}

interface HealthStatus {
  healthy: boolean;
  checks: Array<{
    name: string;
    healthy: boolean;
    error?: string;
    duration: number;
  }>;
}

// Usage
import { healthChecker } from '../utils/health.js';

healthChecker.registerCheck('database', async () => {
  return await database.ping();
});

healthChecker.registerCheck('external-api', async () => {
  const response = await fetch('https://api.example.com/health');
  return response.ok;
});
```

## Data Types

### Zod Schemas

Common Zod schemas for input validation:

```typescript
// String schemas
const nonEmptyString = z.string().min(1, "Cannot be empty");
const email = z.string().email("Invalid email format");
const url = z.string().url("Invalid URL format");

// Number schemas
const positiveNumber = z.number().positive("Must be positive");
const percentage = z.number().min(0).max(100, "Must be 0-100");
const port = z.number().int().min(1).max(65535, "Invalid port");

// Object schemas
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0).optional()
});

// Array schemas
const stringArray = z.array(z.string());
const userArray = z.array(userSchema);

// Union schemas
const status = z.enum(['active', 'inactive', 'pending']);
const mixed = z.union([z.string(), z.number()]);

// Usage in tools
server.registerTool(
  'user-manager',
  {
    title: "User Manager",
    description: "Manage user data",
    inputSchema: {
      action: z.enum(['create', 'update', 'delete']),
      user: userSchema.optional(),
      id: z.string().uuid().optional()
    }
  },
  async (args) => {
    // args is properly typed and validated
  }
);
```

### Response Types

Standard response formats:

```typescript
// Success response
interface SuccessResponse {
  success: true;
  data: any;
  content: Array<{
    type: "text" | "image" | "resource";
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
}

// Error response
interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  content: Array<{
    type: "text";
    text: string;
  }>;
}

// Helper functions
export function successResponse(data: any, text?: string): SuccessResponse {
  return {
    success: true,
    data,
    content: [{
      type: "text",
      text: text || JSON.stringify(data, null, 2)
    }]
  };
}

export function errorResponse(error: string, code?: string): ErrorResponse {
  return {
    success: false,
    error,
    code,
    content: [{
      type: "text",
      text: `Error: ${error}`
    }]
  };
}
```

## Error Handling

### Error Types

Standard error types for MCP servers:

```typescript
// Base error class
export class McpError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Validation errors
export class ValidationError extends McpError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

// Not found errors
export class NotFoundError extends McpError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

// Authentication errors
export class AuthenticationError extends McpError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTH_ERROR', 401);
  }
}

// Authorization errors
export class AuthorizationError extends McpError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHZ_ERROR', 403);
  }
}

// Rate limiting errors
export class RateLimitError extends McpError {
  constructor(limit: number, window: string) {
    super(`Rate limit exceeded: ${limit} requests per ${window}`, 'RATE_LIMIT', 429);
  }
}
```

### Error Handling Patterns

```typescript
// Try-catch with proper error handling
export class SafeTool implements ToolBase {
  register(server: McpServer): void {
    server.registerTool(
      'safe-operation',
      {
        title: "Safe Operation",
        description: "Demonstrates proper error handling",
        inputSchema: {
          data: z.string().min(1, "Data is required")
        }
      },
      async (args) => {
        try {
          // Validate input
          if (!args.data) {
            throw new ValidationError("Data is required");
          }

          // Perform operation
          const result = await this.processData(args.data);

          // Return success response
          return successResponse(result, `Processed: ${result}`);

        } catch (error) {
          // Log error
          logger.error('Tool execution failed', {
            tool: 'safe-operation',
            error: error.message,
            args
          });

          // Return error response
          if (error instanceof McpError) {
            return errorResponse(error.message, error.code);
          } else {
            return errorResponse('Internal server error', 'INTERNAL_ERROR');
          }
        }
      }
    );
  }

  private async processData(data: string): Promise<string> {
    // Processing logic
    return `Processed: ${data}`;
  }
}
```

## Configuration

### Environment Variables

Standard environment variables for MCP servers:

```typescript
// Server configuration
const config = {
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development'
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json'
  },
  
  // Security configuration
  security: {
    oauth: {
      enabled: process.env.OAUTH_ENABLED === 'true',
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET
    },
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: process.env.CORS_CREDENTIALS === 'true'
    }
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100') // 100 requests per window
  }
};
```

### Configuration Schema

```typescript
const configSchema = z.object({
  server: z.object({
    port: z.number().int().min(1).max(65535),
    host: z.string(),
    environment: z.enum(['development', 'staging', 'production'])
  }),
  logging: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']),
    format: z.enum(['json', 'text'])
  }),
  security: z.object({
    oauth: z.object({
      enabled: z.boolean(),
      clientId: z.string().optional(),
      clientSecret: z.string().optional()
    }),
    cors: z.object({
      origin: z.array(z.string()),
      credentials: z.boolean()
    })
  })
});

// Validate configuration
export function validateConfig(config: any) {
  try {
    return configSchema.parse(config);
  } catch (error) {
    throw new ValidationError(`Invalid configuration: ${error.message}`);
  }
}
```

## Testing Utilities

### Mock Server

Mock MCP server for testing:

```typescript
export class MockMcpServer {
  private tools = new Map<string, any>();
  private resources = new Map<string, any>();
  private prompts = new Map<string, any>();

  registerTool(name: string, definition: any, handler: any): void {
    this.tools.set(name, { definition, handler });
  }

  registerResource(name: string, uri: string, definition: any, handler: any): void {
    this.resources.set(name, { uri, definition, handler });
  }

  registerPrompt(name: string, definition: any, handler: any): void {
    this.prompts.set(name, { definition, handler });
  }

  async callTool(name: string, args: any): Promise<any> {
    const tool = this.tools.get(name);
    if (!tool) throw new NotFoundError(`Tool ${name}`);
    return await tool.handler(args);
  }

  getTool(name: string) {
    return this.tools.get(name);
  }

  getResource(name: string) {
    return this.resources.get(name);
  }

  getPrompt(name: string) {
    return this.prompts.get(name);
  }
}
```

### Test Helpers

```typescript
// Test helper functions
export function createTestTool(name: string = 'test-tool'): TestTool {
  return new TestTool(name);
}

export function createMockServer(): MockMcpServer {
  return new MockMcpServer();
}

export async function testToolExecution(
  tool: ToolBase, 
  args: any
): Promise<any> {
  const mockServer = createMockServer();
  tool.register(mockServer);
  
  const toolName = Object.keys(mockServer['tools'])[0];
  return await mockServer.callTool(toolName, args);
}

// Usage in tests
describe('CalculatorTool', () => {
  it('should perform basic arithmetic', async () => {
    const tool = new CalculatorTool();
    const result = await testToolExecution(tool, { expression: '2+2' });
    
    expect(result.success).toBe(true);
    expect(result.content[0].text).toContain('4');
  });
});
```

## Performance

### Caching

Implement caching for improved performance:

```typescript
interface Cache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
}

// Memory cache implementation
export class MemoryCache implements Cache {
  private cache = new Map<string, { value: any; expires: number }>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set<T>(key: string, value: T, ttl: number = 300000): Promise<void> {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  }

  async delete(key: string): Promise<boolean> {
    return this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

// Usage in tools
export class CachedTool implements ToolBase {
  constructor(private cache: Cache = new MemoryCache()) {}

  register(server: McpServer): void {
    server.registerTool(
      'cached-operation',
      {
        title: "Cached Operation",
        description: "Operation with caching",
        inputSchema: {
          input: z.string()
        }
      },
      async (args) => {
        const cacheKey = `operation:${args.input}`;
        
        // Try cache first
        const cached = await this.cache.get(cacheKey);
        if (cached) {
          return successResponse(cached, 'Retrieved from cache');
        }
        
        // Perform operation
        const result = await this.performOperation(args.input);
        
        // Cache result
        await this.cache.set(cacheKey, result);
        
        return successResponse(result, 'Computed and cached');
      }
    );
  }
}
```

### Rate Limiting

```typescript
interface RateLimiter {
  checkLimit(key: string): Promise<boolean>;
  increment(key: string): Promise<number>;
  reset(key: string): Promise<void>;
}

export class TokenBucketRateLimiter implements RateLimiter {
  private buckets = new Map<string, { tokens: number; lastRefill: number }>();

  constructor(
    private maxTokens: number = 10,
    private refillRate: number = 1, // tokens per second
    private windowMs: number = 60000 // 1 minute
  ) {}

  async checkLimit(key: string): Promise<boolean> {
    const bucket = this.getBucket(key);
    this.refillBucket(bucket);
    
    return bucket.tokens > 0;
  }

  async increment(key: string): Promise<number> {
    const bucket = this.getBucket(key);
    this.refillBucket(bucket);
    
    if (bucket.tokens > 0) {
      bucket.tokens--;
    }
    
    return bucket.tokens;
  }

  async reset(key: string): Promise<void> {
    this.buckets.delete(key);
  }

  private getBucket(key: string) {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, {
        tokens: this.maxTokens,
        lastRefill: Date.now()
      });
    }
    return this.buckets.get(key)!;
  }

  private refillBucket(bucket: { tokens: number; lastRefill: number }) {
    const now = Date.now();
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = Math.floor((timePassed / 1000) * this.refillRate);
    
    bucket.tokens = Math.min(this.maxTokens, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }
}
```

## Next Steps

- **[Component Development](../components/overview.md)** - Learn how to build custom components
- **[CLI Commands](../cli-commands.md)** - Master the command-line interface
- **[Implementation Tutorials](../tutorials-and-examples.md)** - Learn patterns by building real projects
- **[GitHub Repository](https://github.com/LinuxDevil/Create-MCP)** - Source code and contributions
