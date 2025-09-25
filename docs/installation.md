# Installation

Get started with MCP Server Generator quickly and easily.

## Prerequisites

Before installing, make sure you have:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm** - Package manager (npm comes with Node.js)

## Quick Installation

### One-time Usage (Recommended)

The fastest way to get started:

```bash
npx mcp-server-generator my-project
```

This approach:
- ✅ Always uses the latest version
- ✅ No global installation required
- ✅ Perfect for trying out the tool

### Global Installation

For frequent use, install globally:

```bash
# Using npm
npm install -g mcp-server-generator

# Using yarn
yarn global add mcp-server-generator

# Using pnpm
pnpm add -g mcp-server-generator
```

Then use directly:

```bash
mcp-server-generator my-project
```

## Alternative Installation Methods

### Via npm init

```bash
npm init mcp-server-generator
```

### Via create command

```bash
# Using npm
npm create mcp-server-generator my-project

# Using yarn
yarn create mcp-server-generator my-project
```

## Project Creation

### Basic Project Creation

```bash
# Create with default settings
npx mcp-server-generator my-mcp-server

# Create with custom description
npx mcp-server-generator my-server --description "My awesome MCP server"

# Create with specific transport
npx mcp-server-generator my-server --transport stdio

# Skip dependency installation
npx mcp-server-generator my-server --skip-install
```

### Interactive Setup

When you run the command, you'll be guided through an interactive setup:

```
📝 Configure your MCP server project:

? Project description: A Model Context Protocol server for my-project
? Author name: Your Name
? Which transport types would you like to include? Both Stdio and HTTP (recommended)
? Include example tools and resources? Yes
? Enable OAuth authentication for HTTP transport? No
? Enable DNS rebinding protection? Yes
? Enable stateless mode? No
? Include LLM sampling examples? Yes
? Include dynamic tool management examples? Yes
? Include user input elicitation examples? Yes
```

## Command Options

### Project Creation Options

| Option | Description | Default |
|--------|-------------|---------|
| `<project-name>` | Name of your MCP server project | Required |
| `-d, --description <desc>` | Project description | Auto-generated |
| `-a, --author <author>` | Project author | System username |
| `-t, --transport <type>` | Transport type (`stdio`, `http`, `both`) | `both` |
| `--skip-install` | Skip dependency installation | `false` |
| `--verbose` | Enable verbose logging | `false` |
| `--oauth` | Enable OAuth for HTTP transport | `false` |
| `--no-dns-protection` | Disable DNS rebinding protection | `false` |
| `--stateless` | Enable stateless mode | `false` |

### Advanced Options

| Option | Description | Default |
|--------|-------------|---------|
| `--no-llm-sampling` | Exclude LLM sampling examples | `false` |
| `--no-dynamic-tools` | Exclude dynamic tool management | `false` |
| `--no-elicitation` | Exclude user input elicitation | `false` |
| `--package-manager <pm>` | Package manager (`npm`, `yarn`, `pnpm`) | Auto-detected |

## Post-Installation

After creating your project:

### 1. Navigate to Your Project

```bash
cd my-mcp-server
```

### 2. Install Dependencies (if skipped)

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Start Development

```bash
# For CLI tools and direct integrations
npm run dev:stdio

# For web services and remote integrations
npm run dev:http

# For stateless HTTP (best for testing)
npm run dev:http:stateless
```

### 4. Test Your Server

```bash
# Quick test - shows all components
npm run quick:test

# Test individual components
npm run test:tools
npm run test:resources
npm run test:prompts

# Use MCP Inspector
npm run inspector
```

## Verification

Verify your installation works correctly:

```bash
# Check version
npx mcp-server-generator --version

# Show help
npx mcp-server-generator --help

# Create a test project
npx mcp-server-generator test-project --skip-install
cd test-project
npm install
npm run build
```

## Troubleshooting

### Common Issues

#### Permission Errors

If you get permission errors during global installation:

```bash
# Fix npm permissions (macOS/Linux)
sudo npm install -g mcp-server-generator

# Or use a Node version manager like nvm
```

#### Node.js Version Issues

Ensure you're using Node.js 18 or higher:

```bash
# Check Node.js version
node --version

# Should show v18.0.0 or higher
```

#### Package Manager Issues

If npm is slow or has issues, try yarn or pnpm:

```bash
# Install yarn
npm install -g yarn

# Install pnpm
npm install -g pnpm

# Use with MCP Server Generator
npx mcp-server-generator my-project --package-manager yarn
```

### Getting Help

If you encounter issues:

1. **Check the logs** - Use `--verbose` flag for detailed output
2. **Search existing issues** - [GitHub Issues](https://github.com/LinuxDevil/Create-MCP/issues)
3. **Ask for help** - [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)
4. **Report bugs** - Create a new issue with details

## Next Steps

Once installed, learn how to:

- **[Use CLI Commands](./cli-commands.md)** - Master all available commands
- **[Add Components](./components/overview.md)** - Extend your projects
- **[Configure Projects](./configuration.md)** - Customize your setup
- **[Deploy Applications](./deployment.md)** - Go to production
