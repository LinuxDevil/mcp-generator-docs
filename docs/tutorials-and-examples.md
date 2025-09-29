---
title: Tutorials & Examples
description: Complete learning path for MCP development - from beginner tutorials to advanced examples and production patterns.
keywords: [MCP tutorials, MCP examples, learn MCP, build MCP server, interactive tutorials, code examples, step-by-step guides]
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": "MCP Server Development Tutorials & Examples",
      "description": "Comprehensive learning path for Model Context Protocol server development",
      "educationalLevel": ["beginner", "intermediate", "advanced"],
      "learningResourceType": ["Tutorial", "Example", "How-to Guide"],
      "teaches": ["MCP server development", "TypeScript", "API integration", "AI tool creation"]
    })}
  </script>
</Head>

# Tutorials & Examples

**Complete learning path for MCP development** - From your first "Hello World" to production-ready servers. Choose your starting point based on your experience level.

## 🎯 **Learning Paths by Experience**

### 🟢 **Beginner Path** (1-2 hours total)
Never built an MCP server? Start here:
1. [Task Manager MCP](#-task-manager-15-min) (15 min) - Learn the basics
2. [Note-Taking MCP](#-note-taking-20-min) (20 min) - Data persistence
3. [Weather API MCP](#️-weather-api-25-min) (25 min) - External APIs

### 🟡 **Developer Path** (2-3 hours total)  
Have some development experience? Jump to:
1. [Weather API MCP](#️-weather-api-25-min) (25 min) - API integration
2. [Code Review MCP](#-code-review-30-min) (30 min) - Static analysis
3. [File Organizer MCP](#-file-organizer-30-min) (30 min) - File operations

### 🔴 **Advanced Path** (3+ hours total)
Ready for complex systems? Try:
1. [Git Helper MCP](#-git-helper-35-min) (35 min) - Advanced workflows
2. [Production Examples](#-production-examples) - Enterprise patterns
3. [Custom Integrations](#-custom-integrations) - Build your own

---

## 🏗️ **Interactive Tutorials**

**Build real MCP servers step-by-step** with complete source code and troubleshooting.

### 🟢 **Beginner Tutorials**

#### 📝 Task Manager (15 min)
**Perfect first tutorial** - Everyone understands todo lists!

**What you'll build:** Task manager with Claude Desktop integration
- ✅ Add, complete, and list tasks
- ✅ Set priorities and due dates  
- ✅ File-based persistence
- ✅ Claude Desktop integration

[**🚀 Start Tutorial →**](./tutorial-builds/task-manager-mcp.md)

**Prerequisites:** Node.js 18+, terminal access
**Skills learned:** MCP basics, tool creation, data persistence, AI integration

---

#### 📚 Note-Taking (20 min)  
**Personal knowledge management** with AI-powered features

**What you'll build:** Smart note-taking system
- ✅ Create and organize notes
- ✅ Tag-based organization
- ✅ AI-powered summaries
- ✅ Export to markdown/PDF

[**🚀 Start Tutorial →**](./tutorial-builds/note-taking-mcp.md)

**Prerequisites:** Basic MCP knowledge (Task Manager recommended)
**Skills learned:** Resource management, data organization, AI prompts

---

### 🟡 **Intermediate Tutorials**

#### 🌤️ Weather API (25 min)
**Learn external API integration** with real weather data

**What you'll build:** Weather service with rich formatting
- ✅ Current weather for any city
- ✅ 5-day forecasts
- ✅ Weather alerts and warnings
- ✅ API key management and security

[**🚀 Start Tutorial →**](./tutorial-builds/weather-api-mcp.md)

**Prerequisites:** Node.js 18+, free OpenWeatherMap API key
**Skills learned:** API integration, error handling, data transformation, security

---

#### 🔍 Code Review (30 min)
**Static code analysis** for JavaScript/TypeScript

**What you'll build:** Code review tool with issue detection
- ✅ Style and security checks
- ✅ Line-by-line analysis  
- ✅ Actionable suggestions
- ✅ Rich reporting with emojis

[**🚀 Start Tutorial →**](./tutorial-basics/create-code-review-mcp.md)

**Prerequisites:** Basic TypeScript knowledge
**Skills learned:** Pattern matching, static analysis, report generation

---

#### 📁 File Organizer (30 min)
**File system operations** with AI assistance

**What you'll build:** Smart file organizer
- ✅ Organize files by type/date/project
- ✅ Duplicate detection
- ✅ Batch rename operations
- ✅ VS Code workspace integration

[**🚀 Start Tutorial →**](./tutorial-builds/file-organizer-mcp.md)

**Prerequisites:** Basic file system knowledge
**Skills learned:** File operations, directory traversal, workspace integration

---

### 🔴 **Advanced Tutorials**

#### 🐙 Git Helper (35 min)
**Advanced git workflows** with AI-powered automation

**What you'll build:** Git workflow enhancer
- ✅ Smart commit message generation
- ✅ Branch management with AI suggestions  
- ✅ Code review summaries
- ✅ Automated changelog generation

[**🚀 Start Tutorial →**](./tutorial-builds/git-helper-mcp.md)

**Prerequisites:** Git knowledge, command line comfort
**Skills learned:** Git automation, process integration, advanced AI patterns

---

## 📚 **Quick Reference Examples**

**Copy-paste examples** for common patterns and use cases.

### 🚀 **Getting Started**

#### Create Your First Server
```bash
# Minimal setup
npx mcp-server-generator my-first-server
cd my-first-server
npm run dev:stdio

# Advanced setup with all features
npx mcp-server-generator advanced-server \
  --description "Production MCP server" \
  --transport both \
  --oauth \
  --author "Your Team"
```

#### Test Everything Works
```bash
# Quick test - see all capabilities
npm run quick:test

# Visual testing with Inspector
npm run inspector

# Command line testing  
npm run inspector:cli -- --tool server-status
```

### 🛠️ **Component Patterns**

#### Basic Tool Pattern
```typescript
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export class ExampleTool {
  register(server: McpServer): void {
    server.registerTool('example-tool', {
      title: "Example Tool",
      description: "Does something useful",
      inputSchema: {
        input: z.string().describe("What to process"),
        options: z.object({
          format: z.enum(['json', 'text']).default('text')
        }).optional()
      }
    }, async (args) => {
      // Your logic here
      const result = this.processInput(args.input, args.options);
      
      return {
        content: [{
          type: "text",
          text: `Processed: ${result}`
        }]
      };
    });
  }

  private processInput(input: string, options?: any): string {
    // Implementation
    return input.toUpperCase();
  }
}
```

#### Resource Pattern
```typescript
export class ExampleResource {
  register(server: McpServer): void {
    server.registerResource('example-data', 'example://data', {
      title: "Example Data",
      description: "Provides example information", 
      mimeType: "application/json"
    }, async () => {
      return {
        contents: [{
          uri: 'example://data',
          text: JSON.stringify({
            message: "Hello from resource!",
            timestamp: new Date().toISOString()
          }),
          mimeType: "application/json"
        }]
      };
    });
  }
}
```

#### Prompt Pattern
```typescript
export class ExamplePrompt {
  register(server: McpServer): void {
    server.registerPrompt('example-prompt', {
      title: "Example Prompt",
      description: "Generates example prompts",
      argsSchema: {
        topic: z.string().describe("Topic to generate prompt for"),
        style: z.enum(['formal', 'casual']).default('formal')
      }
    }, async (args) => {
      const prompt = this.generatePrompt(args.topic, args.style);
      
      return {
        description: `Generated prompt for ${args.topic}`,
        messages: [{
          role: "user",
          content: { type: "text", text: prompt }
        }]
      };
    });
  }

  private generatePrompt(topic: string, style: string): string {
    const prefix = style === 'formal' ? 'Please analyze' : 'Hey, check out';
    return `${prefix} this topic: ${topic}`;
  }
}
```

### 🏭 **Production Examples**

#### Data Analysis Server
```bash
# Create comprehensive data server
npx mcp-server-generator data-analysis-server \
  --description "Advanced data analysis with AI" \
  --transport both

cd data-analysis-server

# Add specialized components
npx mcp-server-generator add tool csv-processor
npx mcp-server-generator add tool statistical-analyzer
npx mcp-server-generator add tool data-visualizer
npx mcp-server-generator add resource sample-datasets
npx mcp-server-generator add prompt analysis-report
```

**What you get:**
- 📊 **8 built-in analysis tools** (descriptive, inferential, exploratory)
- 🔢 **6 sampling strategies** (random, stratified, AI-enhanced)
- 📈 **5 analysis methodologies** 
- 📋 **Comprehensive documentation**
- 🧪 **Ready for MCP Inspector**

#### API Gateway Server
```bash
# Create enterprise API gateway
npx mcp-server-generator api-gateway \
  --description "Enterprise API gateway with MCP" \
  --transport http \
  --oauth

cd api-gateway

# Add gateway-specific tools
npx mcp-server-generator add tool api-router
npx mcp-server-generator add tool rate-limiter  
npx mcp-server-generator add tool request-transformer
npx mcp-server-generator add service auth-manager
npx mcp-server-generator add util request-logger
```

**Features:**
- 🔐 **OAuth authentication**
- 🚦 **Rate limiting** (per-user, global)
- 📊 **Request monitoring**
- 🔄 **Load balancing**
- 📝 **Comprehensive logging**

#### Content Management Server
```bash
# Create AI-powered CMS
npx mcp-server-generator cms-server \
  --description "AI-powered content management"

cd cms-server

# Add CMS components
npx mcp-server-generator add tool content-editor
npx mcp-server-generator add tool media-processor
npx mcp-server-generator add tool seo-optimizer
npx mcp-server-generator add resource content-templates
npx mcp-server-generator add prompt content-generator
```

**Capabilities:**
- ✍️ **AI-assisted writing** and editing
- 🖼️ **Media processing** and optimization
- 🔍 **SEO optimization** with AI suggestions
- 📝 **Template system** for reusable content
- 🤖 **Content generation** from prompts

### 🧪 **Testing Patterns**

#### Component Testing
```bash
# Test all your components
npm run quick:test

# Test specific types
npm run test:tools      # List and test all tools
npm run test:resources  # List and test all resources
npm run test:prompts    # List and test all prompts

# Interactive testing
npm run inspector       # Visual UI testing
npm run inspector:cli   # Command line testing
```

#### Integration Testing
```bash
# Claude Desktop integration
npm run dev:stdio

# Web service integration
npm run dev:http
curl http://localhost:3000/health

# Test specific functionality
npm run inspector:cli -- --tool your-tool-name \
  --args '{"param": "value"}'
```

#### Production Testing
```bash
# Build and test production bundle
npm run build
npm run start:stdio

# Performance testing
npm run test:performance

# Load testing
npm run test:load
```

### 🐳 **Deployment Patterns**

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install system dependencies for complex operations
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["npm", "run", "start:http"]
```

```bash
# Build and deploy
docker build -t my-mcp-server .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e API_KEY=your-key \
  my-mcp-server
```

#### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mcp-server
  template:
    metadata:
      labels:
        app: mcp-server
    spec:
      containers:
      - name: mcp-server
        image: my-mcp-server:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

#### Production Configuration
```typescript
// config/production.ts
export const productionConfig = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    destination: process.env.LOG_FILE || '/var/log/mcp-server.log'
  },
  security: {
    oauth: {
      enabled: true,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET
    },
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(','),
      credentials: true
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000 // requests per window
    }
  },
  monitoring: {
    enabled: true,
    endpoint: process.env.METRICS_ENDPOINT,
    interval: 30000
  }
};
```

## 🔧 **Troubleshooting Guide**

### Common Issues

#### Component Not Registering
```bash
# Check component registration
npx mcp-server-generator list

# Verify imports and exports
npm run build
npm run test
```

#### Build Errors
```bash
# Clean rebuild
npm run clean
npm install  
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Verify dependencies
npm audit fix
```

#### Runtime Errors
```bash
# Enable debug logging
LOG_LEVEL=debug npm run dev:stdio

# Check server logs
tail -f logs/server.log

# Test with Inspector
npm run inspector:cli -- --test-all
```

#### Performance Issues
```bash
# Profile the server
npm run profile

# Monitor resource usage
npm run monitor

# Analyze bundle size
npm run analyze
```

### Debug Patterns

#### Enable Verbose Logging
```typescript
// src/utils/logger.ts
export const logger = {
  debug: (msg: string, meta?: any) => {
    if (process.env.LOG_LEVEL === 'debug') {
      console.log(`🐛 DEBUG: ${msg}`, meta || '');
    }
  },
  info: (msg: string, meta?: any) => {
    console.log(`ℹ️  INFO: ${msg}`, meta || '');
  },
  error: (msg: string, error?: Error) => {
    console.error(`❌ ERROR: ${msg}`, error || '');
  }
};
```

#### Monitor Performance
```typescript
// src/utils/performance.ts
export function measureTime<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  
  return fn().finally(() => {
    const duration = Date.now() - start;
    logger.debug(`⏱️  ${operation} took ${duration}ms`);
  });
}
```

## 🎯 **What's Next?**

### Extend Your Learning
- **Add authentication** to your servers
- **Integrate with databases** for persistence
- **Build custom transports** for special protocols
- **Create monitoring dashboards** for production

### Join the Community
- **Share your projects** in [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)
- **Contribute examples** to help other developers
- **Report issues** and suggest improvements
- **Write tutorials** for your use cases

### Advanced Topics
- **Performance optimization** and caching strategies
- **Security hardening** for production deployments
- **Multi-tenant architectures** for enterprise use
- **Custom AI integrations** beyond Claude Desktop

---

:::tip Start Your MCP Journey
Ready to build your first MCP server? Start with the [Task Manager tutorial](./tutorial-builds/task-manager-mcp.md) - it only takes 15 minutes and you'll have a working AI-integrated todo list!
:::

**Happy building!** 🚀
