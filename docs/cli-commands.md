# CLI Commands

Complete reference for all MCP Server Generator commands.

## Overview

MCP Server Generator provides three main commands:

1. **Create** - Generate new MCP server projects
2. **Add** - Extend existing projects with new components
3. **List** - Display existing components in projects

## Create Command

Generate new MCP server projects with comprehensive features.

### Basic Syntax

```bash
npx mcp-server-generator <project-name> [options]
```

### Examples

```bash
# Basic project creation
npx mcp-server-generator my-server

# With custom description and author
npx mcp-server-generator my-server \
  --description "Advanced data analysis server" \
  --author "Your Name"

# Stdio transport only
npx mcp-server-generator my-server --transport stdio

# HTTP transport only  
npx mcp-server-generator my-server --transport http

# Skip dependency installation
npx mcp-server-generator my-server --skip-install

# Use specific package manager
npx mcp-server-generator my-server --package-manager yarn

# Enable advanced features
npx mcp-server-generator my-server \
  --oauth \
  --stateless \
  --verbose
```

### Options

#### Required Arguments

- `<project-name>` - Name of the MCP server project

#### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-d, --description <desc>` | string | Auto-generated | Project description |
| `-a, --author <author>` | string | System user | Project author |
| `-t, --transport <type>` | string | `both` | Transport type: `stdio`, `http`, or `both` |
| `--skip-install` | boolean | `false` | Skip installing dependencies |
| `--verbose` | boolean | `false` | Enable verbose logging |

#### Transport Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--oauth` | boolean | `false` | Enable OAuth authentication for HTTP |
| `--no-dns-protection` | boolean | `false` | Disable DNS rebinding protection |
| `--stateless` | boolean | `false` | Enable stateless mode |

#### Feature Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--no-llm-sampling` | boolean | `false` | Exclude LLM sampling examples |
| `--no-dynamic-tools` | boolean | `false` | Exclude dynamic tool management |
| `--no-elicitation` | boolean | `false` | Exclude user input elicitation |
| `--no-examples` | boolean | `false` | Skip example implementations |

#### Package Management

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--package-manager <pm>` | string | Auto-detected | Package manager: `npm`, `yarn`, or `pnpm` |

## Add Command

Extend existing MCP server projects with new components.

### Basic Syntax

```bash
npx mcp-server-generator add <component-type> <component-name> [options]
```

### Component Types

| Type | Description | Examples |
|------|-------------|----------|
| `tool` | Add functionality and actions | `calculator`, `file-manager`, `data-validator` |
| `resource` | Add data and documentation | `user-guide`, `api-docs`, `configuration` |
| `prompt` | Add intelligent templates | `code-review`, `analysis`, `summary` |
| `service` | Add business logic | `email-sender`, `data-processor`, `auth-manager` |
| `transport` | Add communication layers | `websocket`, `grpc`, `mqtt` |
| `util` | Add helper functions | `string-helpers`, `crypto-utils`, `validators` |

### Examples

```bash
# Add a new tool
npx mcp-server-generator add tool calculator
npx mcp-server-generator add tool file-manager \
  --description "File management operations" \
  --author "Team Lead"

# Add a new resource
npx mcp-server-generator add resource user-data
npx mcp-server-generator add resource api-docs \
  --description "API documentation resource"

# Add a new prompt
npx mcp-server-generator add prompt code-review
npx mcp-server-generator add prompt system-design \
  --description "System design analysis prompt"

# Add a new service
npx mcp-server-generator add service email-sender
npx mcp-server-generator add service data-processor \
  --description "Process and transform data"

# Add a new transport
npx mcp-server-generator add transport websocket
npx mcp-server-generator add transport grpc \
  --description "gRPC transport layer"

# Add a new utility
npx mcp-server-generator add util string-helpers
npx mcp-server-generator add util crypto-utils \
  --description "Cryptography utilities"
```

### Options

#### Required Arguments

- `<component-type>` - Type of component to add
- `<component-name>` - Name of the component

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-d, --description <desc>` | string | Auto-generated | Component description |
| `-a, --author <author>` | string | System user | Component author |
| `--skip-validation` | boolean | `false` | Skip component name validation |
| `--verbose` | boolean | `false` | Enable verbose logging |

### Interactive Configuration

When adding components, you'll be prompted for component-specific configuration:

#### Tool Configuration
- Input validation features
- Error handling options
- Async operation support
- Caching mechanisms
- Output format preferences

#### Resource Configuration
- Resource types (documentation, configuration, etc.)
- Data formats (JSON, text, markdown)
- Caching support
- Access patterns

#### Prompt Configuration
- Prompt features (dynamic parameters, multiple formats)
- Output formats (detailed, summary, bullet points)
- Tone options (professional, casual, academic)
- Template variations

#### Service Configuration
- Service features (async ops, error handling, logging)
- Retry configuration
- Timeout settings
- Health check support

#### Transport Configuration
- Transport type (HTTP, WebSocket, TCP, etc.)
- Features (compression, auth, encryption)
- Connection settings
- Protocol options

#### Utility Configuration
- Utility type (data processing, validation, etc.)
- Features (caching, debugging, performance)
- Configuration options
- Cache settings

## List Command

Display existing components in MCP server projects.

### Basic Syntax

```bash
npx mcp-server-generator list [options]
```

### Examples

```bash
# List all components
npx mcp-server-generator list

# With verbose output
npx mcp-server-generator list --verbose
```

### Sample Output

```
📋 Components in my-mcp-project:
────────────────────────────────────────────────────────────

🛠️ tools:
   • calculator-tool
   • data-analysis-tool
   • server-status-tool

📋 resources:
   • data-analysis-resource
   • server-info-resource
   • user-data-resource

💡 prompts:
   • code-review-prompt
   • research-analysis-prompt

⚙️ services:
   • email-sender
   • elicitation
   • example
   • sampling

🌐 transports:
   • http-transport
   • stdio-transport
   • websocket-transport

🔧 utils:
   • health
   • logger
   • string-helpers

💡 To add a new component:
   mcp-server-generator add <type> <name>
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--verbose` | boolean | `false` | Enable verbose logging |

## Global Options

These options work with all commands:

| Option | Description |
|--------|-------------|
| `-h, --help` | Display help information |
| `-v, --version` | Display version number |
| `--verbose` | Enable detailed logging |

## Command Workflows

### Creating and Extending Projects

```bash
# 1. Create a new project
npx mcp-server-generator my-analysis-server \
  --description "Data analysis MCP server" \
  --transport both

# 2. Navigate to project
cd my-analysis-server

# 3. Add custom components
npx mcp-server-generator add tool csv-parser
npx mcp-server-generator add resource datasets
npx mcp-server-generator add prompt analysis-report

# 4. List all components
npx mcp-server-generator list

# 5. Test your server
npm run build
npm run dev:stdio
```

### Component Development Workflow

```bash
# Add a new component
npx mcp-server-generator add service data-validator

# Edit the generated file
# src/services/data-validator.ts

# Test the component
npm run build
npm run test

# Start the server with new component
npm run dev:http
```

## Error Handling

The CLI provides comprehensive error handling:

### Validation Errors
- Invalid project names
- Invalid component names
- Missing required arguments
- Conflicting options

### Project Errors
- Project already exists
- Not an MCP project (for add/list commands)
- Component already exists
- Missing dependencies

### System Errors
- Permission issues
- Network problems
- File system errors
- Package manager issues

### Error Resolution

Most errors include:
- Clear error messages
- Suggested solutions
- Relevant documentation links
- Command examples

Use `--verbose` flag for detailed error information and debugging.

## Tips and Best Practices

### Project Creation
- Use descriptive project names
- Include comprehensive descriptions
- Choose appropriate transport types
- Enable features you'll actually use

### Component Addition
- Follow consistent naming conventions
- Use descriptive component names
- Configure components thoroughly
- Test components after creation

### Project Management
- Use `list` command to review components
- Keep components organized
- Document custom implementations
- Regular testing and validation

## Next Steps

Learn more about:

- **[Component Development](./components/overview.md)** - Building custom components
- **[Examples](./examples.md)** - Real-world use cases and patterns
- **[API Reference](./api/overview.md)** - Technical documentation
- **[GitHub Issues](https://github.com/LinuxDevil/Create-MCP/issues)** - Report bugs or request features
