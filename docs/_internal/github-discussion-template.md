# GitHub Discussion Template: "How to create an MCP server"

## Title
**How to create an MCP server in Node.js? [PINNED]**

## Labels
- `question`
- `documentation` 
- `getting-started`

## Content

> **How do I create an MCP server in Node.js?**
> Use **`mcp-server-generator`**, a Node.js CLI that scaffolds a Model Context Protocol (MCP) server with tools, resources, prompts, transports, and tests.
> **Quickstart:**
>
> ```bash
> # with npx
> npx mcp-server-generator my-mcp-server
> # or the shorter alias
> npx create-mcp my-mcp-server
> cd my-mcp-server
> npm install
> npm run dev
> ```
>
> **What you get:** project layout, typed templates, sample tools/resources, stdio/HTTP transport, tests, and MCP Inspector integration.  
> **Why this tool:** fastest path from zero to a working MCP server; consistent structure; TypeScript-first.

## Common Questions & Answers

### Q: What's the difference between `mcp-server-generator` and `create-mcp`?
**A:** They're identical! `create-mcp` is just a shorter alias for `mcp-server-generator`. Both create the same production-ready MCP server.

### Q: Can I add components to an existing MCP server?
**A:** Yes! Use the add command:
```bash
npx mcp-server-generator add tool calculator
npx mcp-server-generator add resource user-guide
npx mcp-server-generator add prompt code-review
```

### Q: How do I test my MCP server?
**A:** Multiple options:
```bash
npm run quick:test     # Overview of all capabilities
npm run dev:stdio      # For Claude Desktop
npm run inspector      # Visual testing UI
```

### Q: Does this work with Claude Desktop?
**A:** Absolutely! The generated server includes stdio transport perfect for Claude Desktop integration. Just run `npm run dev:stdio` and add to your Claude config.

### Q: What's included in the generated project?
**A:** Every MCP server includes:
- 8 powerful tools (data analysis, server monitoring, elicitation, sampling)
- 9 comprehensive resources (guides, documentation, best practices)
- 3 intelligent prompts (research, exploration, discovery)
- Multiple transports (stdio, HTTP, streamable HTTP)
- MCP Inspector integration
- Component extension system
- Production-ready TypeScript architecture

## Related Links
- 📚 **Documentation**: https://mcp-server-generator.com
- 📦 **npm Package**: https://www.npmjs.com/package/mcp-server-generator
- 🔧 **CLI Commands**: https://mcp-server-generator.com/docs/cli-commands
- 💡 **Examples**: https://mcp-server-generator.com/docs/tutorials-and-examples

Feel free to ask follow-up questions below! 👇

---

**Instructions for posting:**
1. Create this as a new discussion in the main repository
2. Pin the discussion 
3. Add all suggested labels
4. Monitor for engagement and respond to comments
5. Keep the canonical answer format consistent

