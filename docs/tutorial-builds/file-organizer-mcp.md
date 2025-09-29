---
title: Build a File Organizer MCP (30 minutes)
description: Create a smart file organizer with AI assistance for managing files by type, date, project, and workspace integration using mcp-server-generator.
keywords: [file organizer MCP, file management, AI file organization, workspace integration, batch operations, duplicate detection]
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Build a File Organizer MCP Server",
      "description": "Create a smart file organizer with AI assistance",
      "totalTime": "PT30M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Node.js 18+"
        },
        {
          "@type": "HowToSupply", 
          "name": "File system access"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "mcp-server-generator CLI"
        }
      ]
    })}
  </script>
  <meta name="tutorial-type" content="build-along" />
  <meta name="tutorial-difficulty" content="intermediate" />
  <meta name="tutorial-duration" content="30 minutes" />
</Head>

# 📁 Build a File Organizer MCP (30 minutes)

:::info Practical Intermediate Tutorial
Perfect for learning file system operations and AI assistance! Build a file organizer that you'll use daily. This tutorial assumes you understand MCP basics from previous tutorials.
:::

## 🎯 What You'll Build

**Clear outcome:** By the end of this tutorial, you'll have a production-ready file organizer MCP server that intelligently organizes files by type, date, and project, detects duplicates, performs batch operations, and integrates with VS Code workspace for seamless development workflow.

**Features you'll implement:**
- 📂 **Smart organization** by file type, date, or project structure
- 🔍 **Duplicate detection** with size and content comparison
- ⚡ **Batch operations** for renaming, moving, and organizing
- 🧠 **AI-powered suggestions** for organization patterns
- 🔧 **VS Code integration** for workspace management
- 📊 **Organization reports** with before/after statistics
- 🛡️ **Safe operations** with backup and undo capabilities

**Time:** 30 minutes | **Difficulty:** Intermediate 🟡 | **Cost:** Free

## 📋 Prerequisites & Materials

:::note Before You Start
This tutorial assumes basic MCP knowledge. If you're new to MCP, start with the [Task Manager tutorial](./task-manager-mcp.md) first.
:::

### **Skills Required:**
- ✅ **Intermediate level** - Basic MCP understanding
- ✅ **File system basics** - Understand files, folders, paths
- ✅ **Command line comfort** - Can navigate directories

### **Software & Accounts:**
- ✅ **Node.js 18.0.0+** ([Download here](https://nodejs.org/))
- ✅ **VS Code** (optional, for workspace integration)
- ✅ **Terminal/Command Prompt** access
- ✅ **Claude Desktop** (optional, for AI integration)

### **Hardware Requirements:**
- ✅ **Any modern computer** (Windows, macOS, Linux)
- ✅ **200MB disk space** for project and test files
- ✅ **File system permissions** to create/move/delete files

### **Cost Breakdown:**
- 💰 **Total cost: $0 (completely free)**
- ✅ All tools and features are free
- ✅ No API keys required

**Environment Check:**
```bash
node --version
# Should show v18.0.0 or higher

# Test file system access
mkdir test-organizer && rmdir test-organizer
# Should complete without errors
```

## 🚀 Step 1: Create the Project (4 minutes)

Create our file organizer MCP server:

```bash
# Create the file organizer project
npx mcp-server-generator file-organizer \
  --description "AI-powered file organization and management system" \
  --transport stdio

# Navigate to your project
cd file-organizer
```

**Set up test environment:**
```bash
# Create a test directory with sample files
mkdir test-files
cd test-files

# Create sample files to organize
touch document1.pdf document2.pdf report.docx
touch photo1.jpg photo2.png screenshot.png
touch script.js app.py config.json
touch old-file-2023.txt new-file-2024.txt
mkdir downloads projects documents

cd ..
```

**Verify setup:**
```bash
# Install dependencies
npm install

# Quick test
npm run quick:test
```

## 🔨 Step 2: Add File Management Tools (8 minutes)

Add specialized file organization components:

```bash
# Add file organizer tool
npx mcp-server-generator add tool file-organizer \
  --description "Organize files by type, date, or custom rules"

# Add duplicate detector tool
npx mcp-server-generator add tool duplicate-finder \
  --description "Find and manage duplicate files"

# Add batch operations tool
npx mcp-server-generator add tool batch-processor \
  --description "Perform batch rename, move, and organize operations"

# Add workspace manager tool
npx mcp-server-generator add tool workspace-manager \
  --description "Manage VS Code workspace file organization"
```

**Tools created:**
- 📂 **file-organizer** - Smart file organization by various criteria
- 🔍 **duplicate-finder** - Detect duplicate files with multiple strategies
- ⚡ **batch-processor** - Bulk file operations with safety features
- 🔧 **workspace-manager** - VS Code workspace integration

## 📚 Step 3: Add File Resources (4 minutes)

Add resources for accessing file information:

```bash
# Add file system browser resource
npx mcp-server-generator add resource file-browser \
  --description "Browse and analyze file system structure"

# Add organization rules resource
npx mcp-server-generator add resource org-rules \
  --description "File organization rules and patterns"

# Add file statistics resource
npx mcp-server-generator add resource file-stats \
  --description "File system statistics and insights"
```

**Resources created:**
- 🌳 **file-browser** - Navigate and explore file structures
- 📋 **org-rules** - Predefined and custom organization rules
- 📊 **file-stats** - Analytics about your file organization

## 🤖 Step 4: Add AI Enhancement Prompts (3 minutes)

Add prompts for AI-powered file organization:

```bash
# Add organization advisor prompt
npx mcp-server-generator add prompt org-advisor \
  --description "Get AI suggestions for file organization"

# Add naming convention prompt
npx mcp-server-generator add prompt naming-helper \
  --description "AI-powered file and folder naming suggestions"
```

**AI capabilities:**
- 🧠 **org-advisor** - Intelligent organization suggestions
- 📝 **naming-helper** - Consistent naming patterns

## 🏗️ Step 5: Understand Your Project Structure (2 minutes)

Your file organizer now has this structure:

```
file-organizer/
├── src/
│   ├── tools/
│   │   ├── file-organizer-tool.ts      # Core organization logic
│   │   ├── duplicate-finder-tool.ts    # Duplicate detection
│   │   ├── batch-processor-tool.ts     # Batch operations
│   │   └── workspace-manager-tool.ts   # VS Code integration
│   ├── resources/
│   │   ├── file-browser-resource.ts    # File system browsing
│   │   ├── org-rules-resource.ts       # Organization patterns
│   │   └── file-stats-resource.ts      # Analytics
│   ├── prompts/
│   │   ├── org-advisor-prompt.ts       # AI organization advice
│   │   └── naming-helper-prompt.ts     # Naming suggestions
│   └── utils/
│       ├── file-operations.ts          # Safe file operations
│       ├── duplicate-detection.ts      # Duplicate algorithms
│       └── organization-rules.ts       # Organization logic
├── config/
│   ├── organization-rules.json         # Default rules
│   └── file-types.json                # File type definitions
└── test-files/                        # Your test directory
```

## 🧪 Step 6: Test File Organization (5 minutes)

Let's test the file organization functionality:

```bash
# Build the project
npm run build

# Start MCP Inspector
npm run inspector
```

**In MCP Inspector, test the file-organizer tool:**

1. **🔍 Organize by file type:**
```json
{
  "source_directory": "./test-files",
  "organization_type": "by_type",
  "target_directory": "./test-files/organized",
  "create_folders": true
}
```

2. **📅 Organize by date:**
```json
{
  "source_directory": "./test-files",
  "organization_type": "by_date",
  "date_format": "YYYY-MM",
  "target_directory": "./test-files/organized-by-date"
}
```

3. **🎯 Custom organization:**
```json
{
  "source_directory": "./test-files",
  "organization_type": "custom",
  "rules": [
    {"pattern": "*.pdf", "folder": "Documents/PDFs"},
    {"pattern": "*.{jpg,png}", "folder": "Media/Images"},
    {"pattern": "*.{js,py}", "folder": "Development/Scripts"}
  ]
}
```

## 🔍 Step 7: Test Duplicate Detection (4 minutes)

**Test the duplicate-finder tool:**

```bash
# Create some duplicate files for testing
cp test-files/document1.pdf test-files/document1-copy.pdf
cp test-files/photo1.jpg test-files/downloads/photo1.jpg
```

**In MCP Inspector:**
```json
{
  "search_directory": "./test-files",
  "detection_method": "content_hash",
  "include_subdirectories": true,
  "min_file_size": 0
}
```

**Expected output:**
- 📋 List of duplicate files with paths
- 📊 Space savings potential
- 🎯 Recommendations for which duplicates to keep

## ⚡ Step 8: Test Batch Operations (4 minutes)

**Test the batch-processor tool:**

1. **Batch rename with pattern:**
```json
{
  "directory": "./test-files",
  "operation": "rename",
  "pattern": "document*.pdf",
  "new_name_template": "report-{counter:03d}.pdf",
  "dry_run": true
}
```

2. **Batch move by extension:**
```json
{
  "directory": "./test-files",
  "operation": "move",
  "file_pattern": "*.jpg",
  "target_directory": "./test-files/images",
  "create_target": true
}
```

3. **Batch organize by size:**
```json
{
  "directory": "./test-files",
  "operation": "organize",
  "criteria": "size",
  "size_thresholds": {
    "small": "< 1MB",
    "medium": "1MB - 10MB", 
    "large": "> 10MB"
  }
}
```

## 🔗 Step 9: VS Code Workspace Integration (Optional, 3 minutes)

If you use VS Code, test workspace integration:

**In MCP Inspector, test workspace-manager tool:**
```json
{
  "workspace_path": "./",
  "action": "organize_project",
  "structure": {
    "src": "Source code files",
    "docs": "Documentation",
    "tests": "Test files",
    "assets": "Static assets"
  }
}
```

## 🤖 Step 10: Connect to Claude Desktop (Optional, 2 minutes)

To use your file organizer with Claude Desktop:

### Configuration

Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "file-organizer": {
      "command": "node",
      "args": ["C:\\path\\to\\file-organizer\\dist\\server.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Test with Claude

Try these commands:
```
Please organize my Downloads folder by file type
```

```
Find duplicate files in my Documents folder
```

```
Help me organize my project files into a better structure
```

## 🎉 Success! What You've Built

You now have a powerful file organizer with:

### **✅ Smart Organization:**
- 📂 **By file type** - Automatic sorting by extension
- 📅 **By date** - Organize by creation/modification date
- 🎯 **Custom rules** - Define your own organization patterns
- 🔄 **Batch processing** - Handle hundreds of files at once

### **✅ Advanced Features:**
- 🔍 **Duplicate detection** - Multiple algorithms (size, hash, content)
- ⚡ **Batch operations** - Rename, move, organize in bulk
- 🛡️ **Safety features** - Dry run mode, backup creation
- 📊 **Analytics** - Before/after organization reports

### **✅ Integration:**
- 🤖 **AI assistance** - Smart suggestions for organization
- 🔧 **VS Code workspace** - Project structure management
- 💬 **Claude Desktop** - Natural language file operations

## 🚀 Next Steps & Extensions

### **Advanced Features:**
```bash
# Add cloud sync tool
npx mcp-server-generator add tool cloud-sync \
  --description "Sync organized files with cloud storage"

# Add file analysis tool
npx mcp-server-generator add tool file-analyzer \
  --description "Analyze file content and suggest organization"

# Add automation tool
npx mcp-server-generator add tool auto-organizer \
  --description "Set up automatic organization rules"
```

### **Integration Ideas:**
- **Git integration** - Organize by Git repository structure
- **Calendar sync** - Organize files by calendar events
- **Email attachment** - Auto-organize downloaded attachments
- **Desktop cleanup** - Scheduled desktop organization

### **Advanced Rules:**
- **Project detection** - Recognize project types and organize accordingly
- **Content analysis** - Use AI to understand file content for organization
- **Usage patterns** - Learn from your usage to suggest improvements

## 🛠️ Troubleshooting

### **Permission Issues:**
```bash
# Check file permissions
ls -la test-files/

# Fix permissions if needed (Unix/macOS)
chmod 755 test-files/
chmod 644 test-files/*

# Windows - run as administrator if needed
```

### **Large Directory Performance:**
```bash
# For directories with 1000+ files, use streaming mode
npm run build:production
node dist/server.js --stream-mode
```

### **Undo Operations:**
```bash
# All operations create backup logs
cat logs/file-operations.log

# Restore from backup
npm run restore-backup --backup-id=20240101_120000
```

## 📚 What You Learned

### **File System Operations:**
- 🔧 **Safe file operations** - Moving, copying, renaming with safety
- 📁 **Directory traversal** - Recursive file system exploration
- 🔍 **Pattern matching** - Glob patterns and regex for file selection
- 📊 **File analysis** - Size, type, content analysis

### **Advanced MCP Concepts:**
- ⚡ **Batch processing** - Handling multiple operations efficiently
- 🛡️ **Error handling** - Graceful failures and recovery
- 📋 **Resource management** - Efficient file system resource usage
- 🔄 **State management** - Tracking operations and undo capabilities

### **AI Integration:**
- 🧠 **Intelligent suggestions** - AI-powered organization advice
- 📝 **Pattern recognition** - Learning from user preferences
- 🎯 **Context awareness** - Understanding file relationships

## 🆘 Need Help?

- **🐛 Issues:** [GitHub Issues](https://github.com/LinuxDevil/Create-MCP/issues)
- **💬 Questions:** [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)
- **📚 Docs:** [Full Documentation](../intro.md)

## 📦 Complete Source Code

**Full tutorial code available:**
- 📂 **[GitHub Repository](https://github.com/LinuxDevil/Create-MCP/tree/main/examples/tutorial-builds/file-organizer)** - Complete project
- 📋 **[Code Gist](https://gist.github.com/linuxdevil/file-organizer-mcp-tutorial)** - Individual files
- 🔗 **[Live Demo](https://github.com/LinuxDevil/Create-MCP/tree/main/examples/tutorial-builds/file-organizer/demo)** - Screenshots and examples

**What's included:**
- ✅ Complete file organizer with all tools
- ✅ Organization rule templates
- ✅ VS Code workspace configurations
- ✅ Test files and examples

## 📄 License & Usage

**MIT License** - Free to use, modify, and distribute. Your files remain yours - this tool only helps organize them!

Ready to organize your digital life? 🚀
