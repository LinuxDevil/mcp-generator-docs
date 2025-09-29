---
title: Create a Code Review MCP Server
description: Step-by-step guide to building a code review MCP server using mcp-server-generator with custom tools, resources, and prompts.
keywords: [code review, MCP server, tutorial, mcp-server-generator, tools, resources, prompts, Claude Desktop, Cursor, AI code review, automated code analysis]
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Create a Code Review MCP Server",
      "description": "Complete tutorial for building an AI-powered code review server using mcp-server-generator",
      "totalTime": "PT30M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Node.js 18+"
        },
        {
          "@type": "HowToSupply",
          "name": "Text editor or IDE"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "mcp-server-generator CLI"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Scaffold the Project",
          "text": "Create the base MCP server project using npx mcp-server-generator code-review-server",
          "url": "https://mcp-server-generator.com/docs/tutorial-basics/create-code-review-mcp#step-1-scaffold-the-project"
        },
        {
          "@type": "HowToStep", 
          "name": "Add Code Review Components",
          "text": "Add specialized tools for code review, security scanning, and performance analysis",
          "url": "https://mcp-server-generator.com/docs/tutorial-basics/create-code-review-mcp#step-2-add-code-review-components"
        },
        {
          "@type": "HowToStep",
          "name": "Customize and Test",
          "text": "Customize the generated tools and test with MCP Inspector",
          "url": "https://mcp-server-generator.com/docs/tutorial-basics/create-code-review-mcp#step-4-run-mcp-inspector"
        },
        {
          "@type": "HowToStep",
          "name": "Integrate with AI Tools",
          "text": "Wire the server into Claude Desktop and Cursor for AI-powered code reviews",
          "url": "https://mcp-server-generator.com/docs/tutorial-basics/create-code-review-mcp#step-5-wire-into-claude-desktop"
        }
      ]
    })}
  </script>
  <meta name="ai-tutorial-type" content="step-by-step-guide" />
  <meta name="ai-difficulty" content="intermediate" />
  <meta name="ai-time-required" content="30 minutes" />
  <meta name="ai-final-outcome" content="Working code review MCP server with AI-powered analysis tools" />
</Head>

# Create a Code Review MCP Server

This tutorial walks you through creating a complete code review MCP server using `mcp-server-generator`. You'll learn how to scaffold the project, add custom components, test with MCP Inspector, and integrate with Claude Desktop or Cursor.

## What You'll Build

**Clear outcome:** By the end of this tutorial, you'll have a working code review MCP server that can analyze JavaScript/TypeScript code for common issues, provide actionable feedback with line numbers and suggestions, and integrate with Claude Desktop for AI-powered code reviews.

**Key features you'll implement:**
- **Code review tool** that detects style, security, and basic quality issues
- **Error reporting** with line numbers and fix suggestions  
- **Multiple review types** (basic, security-focused, style-focused)
- **Rich output formatting** with emojis and clear categorization
- **Claude Desktop integration** for natural language code review requests

**Skills you'll learn:**
- MCP tool creation and input validation
- Basic static code analysis techniques
- Error handling and user-friendly reporting
- AI integration patterns for development tools

## Prerequisites

- Node.js 18+ installed
- Basic familiarity with TypeScript/JavaScript
- Text editor or IDE (VS Code recommended)

## Step 1: Scaffold the Project

Start by creating a new MCP server project focused on code review:

```bash
# Create the project with descriptive details
npx mcp-server-generator code-review-server \
  --description "Advanced code review MCP server with AI-powered analysis" \
  --author "Your Name" \
  --transport both

# Navigate to the project
cd code-review-server
```

This creates a complete MCP server with:
- 8 default tools for data analysis and server management
- 9 resources with documentation and guides
- 3 prompts for research and analysis
- Both stdio and HTTP transport support
- MCP Inspector integration
- TypeScript configuration

## Step 2: Add Code Review Components

Extend the base project with specialized code review components:

### Add Code Review Tool

```bash
npx mcp-server-generator add tool code-reviewer \
  --description "Analyze code for quality, security, and best practices"
```

### Add Security Scanner Tool

```bash
npx mcp-server-generator add tool security-scanner \
  --description "Scan code for security vulnerabilities and issues"
```

### Add Performance Analyzer Tool

```bash
npx mcp-server-generator add tool performance-analyzer \
  --description "Analyze code performance and optimization opportunities"
```

### Add Review Guidelines Resource

```bash
npx mcp-server-generator add resource review-guidelines \
  --description "Comprehensive code review guidelines and checklists"
```

### Add Best Practices Resource

```bash
npx mcp-server-generator add resource coding-standards \
  --description "Language-specific coding standards and conventions"
```

### Add Review Templates Prompt

```bash
npx mcp-server-generator add prompt review-template \
  --description "Generate structured code review templates"
```

## Step 3: Test Your Generated Tools

Let's verify that our code review server is working properly:

```bash
# Build the project
npm run build

# Quick test to see all tools
npm run quick:test
```

You should see output showing your new tools:
- `code-reviewer` - Main code analysis tool
- `security-scanner` - Security vulnerability scanner  
- `performance-analyzer` - Performance analysis tool

## Step 4: Understand the Code Review Architecture

Before we implement the code review logic, let's understand what we're building:

**Our code review tool will:**
1. **Accept code input** with language and review type parameters
2. **Analyze line-by-line** for common patterns and issues
3. **Categorize problems** by type (style, security, quality)
4. **Generate reports** with line numbers and suggestions
5. **Return formatted results** that are easy to read

**Why this approach works:**
- ✅ **Simple pattern matching** - No complex AST parsing needed
- ✅ **Extensible design** - Easy to add new rules
- ✅ **Clear feedback** - Users get actionable information
- ✅ **Fast execution** - Line-by-line analysis is quick

## Step 5: Implement the Tool Schema

Let's start by defining our tool's interface. Edit `src/tools/code-reviewer-tool.ts`:

```typescript title="src/tools/code-reviewer-tool.ts (Tool Registration)"
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export class CodeReviewerTool {
  register(server: McpServer): void {
    server.registerTool(
      'code-reviewer',
      {
        title: "Code Reviewer", 
        description: "Analyze code for style, security, and quality issues",
        inputSchema: {
          code: z.string().describe("JavaScript/TypeScript code to review"),
          language: z.string().describe("Programming language (javascript, typescript)"),
          reviewType: z.enum(['basic', 'security', 'style']).default('basic')
            .describe("Focus area: basic (all), security (vulnerabilities), style (formatting)")
        }
      },
      async (args) => {
        // We'll implement this next
        return { content: [{ type: "text", text: "Implementation coming next..." }] };
      }
    );
  }
}
```

**What this does:**
- 🔧 **Registers the tool** with the MCP server
- 📝 **Defines inputs** using Zod schemas for validation
- 🎯 **Sets expectations** with clear descriptions
- 🛡️ **Validates input** automatically before our code runs

## Step 6: Add the Analysis Logic

Now let's add the core analysis functionality:

```typescript title="src/tools/code-reviewer-tool.ts (Analysis Methods)"
export class CodeReviewerTool {
  // ... previous registration code ...

  register(server: McpServer): void {
    server.registerTool('code-reviewer', {
      // ... schema definition ...
    }, async (args) => {
      // Main analysis flow
      const issues = this.findBasicIssues(args.code, args.reviewType);
      
      if (issues.length === 0) {
        return {
          content: [{
            type: "text",
            text: "✅ **No issues found!**\n\nYour code looks good. Great job following best practices!"
          }]
        };
      }

      const report = this.generateReport(issues, args.language);
      return { content: [{ type: "text", text: report }] };
    });
  }

  private findBasicIssues(code: string, reviewType: string) {
    const issues = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Check each line for issues based on review type
      if (reviewType === 'basic' || reviewType === 'style') {
        issues.push(...this.checkStyleIssues(line, lineNum));
      }
      
      if (reviewType === 'basic' || reviewType === 'security') {
        issues.push(...this.checkSecurityIssues(line, lineNum));
      }
    });

    return issues;
  }
}
```

**Why this structure:**
- 🔄 **Clear flow** - Input → Analysis → Report → Output
- 🎯 **Focused methods** - Each method has one responsibility
- ✅ **Easy testing** - Each piece can be tested independently
- 📈 **Extensible** - Easy to add new check types

## Step 7: Implement Specific Checks

Now let's add the actual issue detection:

```typescript title="src/tools/code-reviewer-tool.ts (Issue Detection)"
export class CodeReviewerTool {
  // ... previous code ...

  private checkStyleIssues(line: string, lineNum: number) {
    const issues = [];
    
    // Debug statements that shouldn't be in production
    if (line.includes('console.log') || line.includes('console.debug')) {
      issues.push({
        type: 'style',
        severity: 'low',
        line: lineNum,
        message: 'Remove console statements before production',
        suggestion: 'Use a proper logging library instead'
      });
    }
    
    // Long lines that hurt readability
    if (line.length > 120) {
      issues.push({
        type: 'style',
        severity: 'low', 
        line: lineNum,
        message: `Line too long (${line.length} characters)`,
        suggestion: 'Break into multiple lines for better readability'
      });
    }
    
    return issues;
  }

  private checkSecurityIssues(line: string, lineNum: number) {
    const issues = [];
    
    // Dangerous eval usage
    if (line.includes('eval(')) {
      issues.push({
        type: 'security',
        severity: 'critical',
        line: lineNum,
        message: 'eval() usage detected - major security risk',
        suggestion: 'Use JSON.parse() or a safe expression evaluator'
      });
    }
    
    // XSS vulnerability via innerHTML
    if (line.includes('innerHTML') && line.includes('=')) {
      issues.push({
        type: 'security',
        severity: 'high',
        line: lineNum,
        message: 'innerHTML assignment can lead to XSS attacks',
        suggestion: 'Use textContent or a sanitization library'
      });
    }
    
    return issues;
  }
}
```

**Key concepts:**
- 🔍 **Pattern matching** - Look for specific dangerous patterns
- 📊 **Severity levels** - Help users prioritize fixes
- 💡 **Actionable suggestions** - Tell users what to do, not just what's wrong
- 🎯 **Focused checks** - Each method checks for related issues

## Step 8: Create the Report Generator

Finally, let's format the results nicely:

```typescript title="src/tools/code-reviewer-tool.ts (Report Generation)"
export class CodeReviewerTool {
  // ... previous code ...

  private generateReport(issues: any[], language: string): string {
    let report = `# 🔍 Code Review Report (${language})\n\n`;
    report += `**Found ${issues.length} issue(s) that need attention:**\n\n`;

    // Group issues by type for better organization
    const byType = this.groupIssuesByType(issues);
    
    Object.entries(byType).forEach(([type, typeIssues]) => {
      report += `## ${this.getTypeEmoji(type)} ${type.charAt(0).toUpperCase() + type.slice(1)} Issues\n\n`;
      
      typeIssues.forEach((issue, index) => {
        const severityEmoji = this.getSeverityEmoji(issue.severity);
        report += `**${index + 1}.** ${severityEmoji} **Line ${issue.line}** - ${issue.message}\n`;
        if (issue.suggestion) {
          report += `   💡 *Suggestion: ${issue.suggestion}*\n`;
        }
        report += `\n`;
      });
    });

    report += `---\n`;
    report += `*💡 Tip: Fix critical and high severity issues first for maximum impact.*`;
    
    return report;
  }

  private groupIssuesByType(issues: any[]) {
    return issues.reduce((groups, issue) => {
      const type = issue.type;
      if (!groups[type]) groups[type] = [];
      groups[type].push(issue);
      return groups;
    }, {});
  }

  private getTypeEmoji(type: string): string {
    const emojis = { style: '🎨', security: '🔒', quality: '⚡' };
    return emojis[type] || '🔧';
  }

  private getSeverityEmoji(severity: string): string {
    const emojis = { low: '⚠️', medium: '🔶', high: '🔴', critical: '🚨' };
    return emojis[severity] || '⚠️';
  }
}
```

**Why good reporting matters:**
- 📊 **Organized output** - Group related issues together
- 🎨 **Visual hierarchy** - Use emojis and formatting for clarity
- 🎯 **Actionable guidance** - Provide specific suggestions
- 📈 **Prioritization** - Help users focus on what matters most

:::tip Complete Implementation
Put all these pieces together in your `src/tools/code-reviewer-tool.ts` file. Each section builds on the previous one to create a complete, working code review tool.
:::

## Step 9: Run MCP Inspector

Test your code review server using the built-in MCP Inspector:

```bash
# Build the project
npm run build

# Start the server in inspector mode
npm run inspector
```

This opens a visual interface where you can:
- See all available tools, resources, and prompts
- Test the code review functionality interactively
- View responses in a user-friendly format
- Debug any issues with your components

## Step 10: Test the Code Review Tool

In the MCP Inspector, test your code review tool:

1. Select the `code-reviewer` tool
2. Provide sample code to review
3. Choose the programming language
4. Select review type (comprehensive, security-focused, etc.)
5. Execute and view the detailed review report

Example test input:
```javascript
function processUser(user) {
  console.log(user);
  eval(user.code);
  document.getElementById('output').innerHTML = user.name;
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < items.length; j++) {
      for (let k = 0; k < categories.length; k++) {
        // Complex nested operation
      }
    }
  }
}
```

## Step 11: Wire into Claude Desktop

Configure Claude Desktop to use your code review server:

### Update Claude Desktop Configuration

Add to your Claude Desktop config file:

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "code-review-server": {
      "command": "node",
      "args": [
        "/path/to/your/code-review-server/dist/server.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Start the Server for Claude Desktop

```bash
# Navigate to your project
cd code-review-server

# Start in stdio mode (required for Claude Desktop)
npm run dev:stdio
```

### Test in Claude Desktop

Now you can use your code review server in Claude Desktop:

```
Hey Claude, can you review this code for security issues?

[paste your code here]
```

Claude will automatically use your code review MCP server to analyze the code and provide detailed feedback.

## Step 12: Wire into Cursor

Configure Cursor to use your MCP server:

### Cursor Configuration

Create or update `.cursorrules` in your project root:

```json title=".cursorrules"
{
  "mcp": {
    "servers": [
      {
        "name": "code-review-server",
        "url": "http://localhost:3000",
        "type": "http"
      }
    ]
  }
}
```

### Start HTTP Server for Cursor

```bash
# Start in HTTP mode for Cursor integration
npm run dev:http

# Server will be available at http://localhost:3000
```

### Use in Cursor

Cursor can now access your code review tools through its MCP integration, allowing AI-powered code reviews directly in your IDE.

## Advanced Features

### Add More Specialized Tools

```bash
# Add language-specific analyzers
npx mcp-server-generator add tool typescript-analyzer
npx mcp-server-generator add tool python-linter
npx mcp-server-generator add tool java-reviewer

# Add documentation tools
npx mcp-server-generator add tool doc-generator
npx mcp-server-generator add resource api-documentation

# Add testing tools
npx mcp-server-generator add tool test-coverage-analyzer
npx mcp-server-generator add tool unit-test-generator
```

### Customize Review Prompts

Edit `src/prompts/review-template-prompt.ts` to create sophisticated review templates:

```typescript
// Generate different types of review templates
// Include checklist items, focus areas, and custom criteria
```

## Production Deployment

### Docker Deployment

```bash
# Create production build
npm run build

# Docker deployment
docker build -t code-review-mcp .
docker run -p 3000:3000 code-review-mcp
```

### Environment Configuration

```bash
# Production environment variables
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
REVIEW_CACHE_ENABLED=true
```

## Next Steps

You now have a fully functional code review MCP server! Here's what you can do next:

1. **Enhance Analysis**: Add more sophisticated code analysis using AST parsing
2. **Add Languages**: Support for more programming languages
3. **Integration**: Connect with GitHub/GitLab for automated PR reviews
4. **AI Enhancement**: Integrate with AI models for smarter analysis
5. **Metrics**: Add code metrics and quality scoring
6. **Collaboration**: Multi-user review workflows

## Resources

- **[MCP Inspector Guide](../cli-commands.md#testing-examples)** - Advanced testing techniques
- **[Component Development](../components/overview.md)** - Building custom components
- **[Integration Tutorials](../tutorials-and-examples.md)** - Step-by-step integration guides
- **[GitHub Repository](https://github.com/LinuxDevil/Create-MCP)** - Source code and examples

Happy code reviewing! 🚀

