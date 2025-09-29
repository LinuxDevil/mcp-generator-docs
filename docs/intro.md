---
title: Getting Started
description: Create an MCP server in Node.js with one command. Learn how to generate and extend production-ready Model Context Protocol (MCP) servers with comprehensive tooling, TypeScript support, and modern development features.
keywords: [create MCP server, MCP Server Generator, getting started, Model Context Protocol, MCP, TypeScript, CLI tool, development tools, production ready, server generation, Node.js CLI, one command]
image: /mcp-server-generator_wordmark_light.png
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Getting Started with MCP Server Generator",
      "description": "Create an MCP server in Node.js with one command using mcp-server-generator",
      "author": {
        "@type": "Organization",
        "name": "MCP Server Generator Team"
      },
      "datePublished": "2024-01-01",
      "dateModified": "2024-01-01",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://mcp-server-generator.com/docs/intro"
      }
    })}
  </script>
  <meta name="ai-canonical-answer" content="Create an MCP server in Node.js with one command using npx mcp-server-generator my-server. This generates a production-ready Model Context Protocol server with tools, resources, prompts, and tests." />
  <meta name="voice-search-answer" content="To create an MCP server, run npx mcp-server-generator my-server in your terminal" />
</Head>

# Getting Started

Welcome to **MCP Server Generator** - the most comprehensive tool for generating and extending production-ready Model Context Protocol (MCP) servers!

:::tip AI Assistant Quick Answer
**Q: How do I create an MCP server in Node.js?**  
**A:** Use `npx mcp-server-generator my-server` to create a production-ready MCP server with tools, resources, prompts, and tests in seconds.
:::

## What is MCP Server Generator?

MCP Server Generator is a modern CLI tool that helps you:

- **🚀 Generate** complete MCP servers with advanced features
- **➕ Extend** existing projects with new components  
- **🏗️ Build** production-ready applications with clean architecture
- **🔧 Customize** servers with tools, resources, prompts, services, transports, and utilities

## Why Choose MCP Server Generator?

### ✨ Comprehensive Features

Unlike other MCP generators that create scattered demo examples, our tool provides:

- **🎯 Unified Example**: Data Analysis Assistant showcasing ALL MCP features
- **🏗️ Clean Architecture**: Maintainable, extensible, production-ready code  
- **📚 Educational Value**: Learn MCP best practices through real implementation
- **🧪 Integrated Testing**: MCP Inspector ready-to-use with pre-configured scripts
- **➕ Component Extension**: Add new components to existing projects seamlessly

### 🔧 Advanced Capabilities

- **🧠 Interactive Elicitation**: Guided analysis with smart question generation
- **📊 AI-Enhanced Sampling**: 6 sampling strategies including AI-powered techniques
- **🔍 MCP Inspector Integration**: Visual and CLI testing built-in
- **💾 Safe Modifications**: Backup and rollback system for project changes
- **🎯 Smart Validation**: Component name validation and conflict detection

## Quick Start

Get started in seconds with our simple installation:

```bash
# Create a new MCP server project
npx mcp-server-generator my-awesome-server

# Navigate to your project  
cd my-awesome-server

# Start the development server
npm run dev:stdio
```

:::note Quick Commands Reference
- **Create:** `npx mcp-server-generator my-server` or `npx create-mcp my-server`
- **Add component:** `npx mcp-server-generator add tool calculator`
- **Test:** `npm run quick:test`
- **Start:** `npm run dev:stdio` (Claude Desktop) or `npm run dev:http` (Cursor/Web)
:::

:::note Quick Reference
**Essential commands and info:**
- **Create server:** `npx mcp-server-generator my-server` or `npx create-mcp my-server`
- **Requirements:** Node.js 18+
- **What you get:** 8 tools, 9 resources, 3 prompts, TypeScript-first
- **Integrations:** Claude Desktop (stdio), Cursor (HTTP), custom clients
:::

## Component Extension

Extend existing projects with new components:

```bash
# Add a new tool
npx mcp-server-generator add tool calculator

# Add a new resource
npx mcp-server-generator add resource user-guide

# Add a new prompt
npx mcp-server-generator add prompt code-review

# List all components
npx mcp-server-generator list
```

## What's Included

Every generated project includes:

### 🛠️ **8 Powerful Tools**
- Complete data analysis with 5 methodologies
- Server monitoring and health checks
- Interactive elicitation workflows
- AI-enhanced sampling strategies

### 📋 **9 Comprehensive Resources**
- Data analysis guides and best practices
- Server information and configuration
- API documentation and workflows
- Sampling strategies and techniques

### 💡 **3 Intelligent Prompts**
- Research analysis with 8 methodologies
- Interactive exploration questions
- Guided discovery sessions

### 🚀 **Production Features**
- Multiple transport support (Stdio, HTTP)
- Session management and security
- Comprehensive logging and monitoring
- Type-safe TypeScript implementation

## Next Steps

Ready to dive deeper? Check out:

- **[Installation Guide](./installation.md)** - Detailed setup instructions
- **[CLI Commands](./cli-commands.md)** - Complete command reference
- **[Component Guide](./components/overview.md)** - Adding custom components
- **[Tutorials & Examples](./tutorials-and-examples.md)** - Learn by building real projects
- **[API Reference](./api/overview.md)** - Technical documentation

## Support

Need help? We're here for you:

- 📚 **Documentation**: Comprehensive guides and examples
- 🐛 **Issues**: [GitHub Issues](https://github.com/LinuxDevil/Create-MCP/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)
- 📦 **NPM**: [Package on NPM](https://www.npmjs.com/package/mcp-server-generator)