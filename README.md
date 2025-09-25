# MCP Server Generator Documentation

This is the official documentation website for **MCP Server Generator**, a modern CLI tool for generating and extending production-ready Model Context Protocol (MCP) servers.

🌐 **Live Documentation**: [mcp-server-generator.com](https://mcp-server-generator.com)

## About

This documentation site provides comprehensive guides, examples, and API references for:

- **🚀 Project Generation** - Creating new MCP servers with comprehensive features
- **➕ Component Extension** - Adding tools, resources, prompts, services, transports, and utilities
- **📚 Developer Guides** - Installation, CLI commands, and best practices  
- **🔧 API Reference** - Complete technical documentation
- **💡 Examples** - Real-world use cases and implementation patterns

## Built With

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator that provides:

- **📱 Responsive Design** - Works on all devices
- **🌙 Dark/Light Mode** - Theme switching support
- **🔍 Built-in Search** - Fast content discovery
- **📖 Versioning** - Multiple documentation versions
- **🌐 Internationalization** - Multi-language support

## Development

### Prerequisites

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** or **yarn** - Package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/LinuxDevil/Create-MCP.git
cd Create-MCP/docs

# Install dependencies
npm install
# or
yarn install
```

### Local Development

```bash
# Start development server
npm start
# or
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

**Local URL**: http://localhost:3000

### Build

```bash
# Generate static content
npm run build
# or
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

#### GitHub Pages

```bash
# Using SSH
USE_SSH=true npm run deploy
# or
USE_SSH=true yarn deploy

# Using HTTPS
GIT_USER=<Your GitHub username> npm run deploy
# or
GIT_USER=<Your GitHub username> yarn deploy
```

#### Other Hosting Services

The `build` directory can be deployed to:
- **Vercel** - `vercel --prod`
- **Netlify** - Drag and drop `build` folder
- **AWS S3** - Upload `build` contents
- **Cloudflare Pages** - Connect GitHub repository

## Documentation Structure

```
docs/
├── intro.md                    # Getting started
├── installation.md             # Installation guide
├── cli-commands.md             # CLI reference
├── examples.md                 # Usage examples
├── components/                 # Component guides
│   └── overview.md            # Component overview
├── api/                       # API reference
│   └── overview.md            # API documentation
blog/                          # Blog posts
├── authors.yml                # Author information
└── 2025-09-25-component-extension-release.md
```

## Contributing to Documentation

We welcome contributions to improve the documentation:

### Content Updates

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b docs/improve-examples`
3. **Edit** markdown files in the `docs/` directory
4. **Test** locally: `npm start`
5. **Commit** changes: `git commit -m 'Improve examples documentation'`
6. **Push** to branch: `git push origin docs/improve-examples`
7. **Open** a Pull Request

### Adding New Pages

1. **Create** new `.md` file in appropriate directory
2. **Update** `sidebars.ts` to include the new page
3. **Add** internal links from related pages
4. **Test** navigation and links locally

### Blog Posts

1. **Create** new file: `blog/YYYY-MM-DD-post-title.md`
2. **Add** frontmatter with title, authors, tags
3. **Write** content with code examples
4. **Update** `authors.yml` if adding new author

### Style Guide

- **Use** clear, concise language
- **Include** code examples for technical concepts
- **Add** emojis for visual appeal (sparingly)
- **Structure** content with proper headings
- **Link** to related documentation

## Links

- **🏠 Homepage**: [mcp-server-generator.com](https://mcp-server-generator.com)
- **📦 NPM Package**: [mcp-server-generator](https://www.npmjs.com/package/mcp-server-generator)
- **🐙 GitHub Repository**: [LinuxDevil/Create-MCP](https://github.com/LinuxDevil/Create-MCP)
- **🐛 Issues**: [GitHub Issues](https://github.com/LinuxDevil/Create-MCP/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)
- **🌐 MCP Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io)

## License

This documentation is part of the MCP Server Generator project and is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
