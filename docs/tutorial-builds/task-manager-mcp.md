---
title: Build a Task Manager MCP (15 minutes)
description: Build a practical task manager MCP server step-by-step. Perfect first tutorial with real-world functionality you'll actually use.
keywords: [task manager, todo list, MCP tutorial, build along, interactive tutorial, beginner MCP, practical MCP]
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Build a Task Manager MCP Server in 15 Minutes",
      "description": "Step-by-step interactive tutorial to build a practical task manager MCP server",
      "totalTime": "PT15M",
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
          "name": "Terminal/Command prompt"
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
  <meta name="tutorial-difficulty" content="beginner" />
  <meta name="tutorial-duration" content="15 minutes" />
</Head>

# 📝 Build a Task Manager MCP (15 minutes)

:::tip Perfect First Tutorial
This is an ideal first MCP tutorial! Everyone understands todo lists, and you'll build something immediately useful. By the end, you'll have a working task manager that integrates with Claude Desktop.
:::

## 🎯 What You'll Build

**Clear outcome:** By the end of this tutorial, you'll have a working task manager MCP server that persists tasks to a JSON file, integrates with Claude Desktop for AI task management, and can be extended with additional features.

**Features you'll implement:**
- ✅ **Add tasks** with descriptions and priorities
- ✅ **Mark tasks complete** or incomplete  
- ✅ **List tasks** with filtering options
- ✅ **Export tasks** to different formats
- ✅ **Claude Desktop integration** - manage tasks through AI chat

**Time:** 15 minutes | **Difficulty:** Beginner 🟢 | **Cost:** Free

## 📋 Prerequisites & Materials

### **Skills Required:**
- ✅ **Beginner level** - No MCP experience needed
- ✅ **Basic terminal usage** - Can run commands
- ✅ **Text editing** - Can edit files in any editor

### **Software & Accounts:**
- ✅ **Node.js 18.0.0+** ([Download here](https://nodejs.org/))
- ✅ **Terminal/Command Prompt** (built into your OS)
- ✅ **Text editor** (VS Code, Notepad++, nano, vim - your choice)
- ✅ **Claude Desktop** (optional, for AI integration)

### **Hardware Requirements:**
- ✅ **Any modern computer** (Windows, macOS, Linux)
- ✅ **100MB disk space** for project files
- ✅ **Internet connection** for downloading packages

### **Cost Breakdown:**
- 💰 **Total cost: $0 (completely free)**
- ✅ All tools and services are free
- ✅ No API keys or paid accounts required

**Environment Check:**
```bash
node --version
# Should show v18.0.0 or higher

npm --version
# Should show 8.0.0 or higher
```

**Tested Versions:**
- Node.js: 18.0.0 - 20.x
- npm: 8.0.0 - 10.x
- mcp-server-generator: Latest

## 🚀 Step 1: Create the Project (2 minutes)

Let's start by generating our task manager MCP server:

```bash
# Create the task manager project
npx mcp-server-generator task-manager \
  --description "Personal task management system with AI integration" \
  --transport stdio

# Navigate into the project
cd task-manager
```

**✅ Checkpoint - You should see:**
```
✨ MCP Server project 'task-manager' created successfully!

📁 Project structure:
├── src/
│   ├── tools/
│   ├── resources/  
│   ├── prompts/
│   └── server.ts
├── package.json
└── README.md

🚀 Next steps:
  cd task-manager
  npm install
  npm run dev:stdio
```

If you see this output, you're ready for the next step! 

:::note Troubleshooting
**Problem:** "npx command not found"  
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

**Problem:** Permission errors  
**Solution:** Try `sudo npx mcp-server-generator` on macOS/Linux
:::

## 🛠️ Step 2: Add Task Management Tools (5 minutes)

Now let's add the core functionality for managing tasks:

```bash
# Add a tool to create new tasks
npx mcp-server-generator add tool add-task \
  --description "Add a new task with priority and due date"

# Add a tool to list tasks  
npx mcp-server-generator add tool list-tasks \
  --description "List all tasks with filtering options"

# Add a tool to complete tasks
npx mcp-server-generator add tool complete-task \
  --description "Mark a task as complete or incomplete"

# Add a tool to export tasks
npx mcp-server-generator add tool export-tasks \
  --description "Export tasks to different formats"
```

**✅ Checkpoint - You should see:**
```
✅ Tool 'add-task' created successfully!
✅ Tool 'list-tasks' created successfully!
✅ Tool 'complete-task' created successfully! 
✅ Tool 'export-tasks' created successfully!
```

Let's verify what we've created:
```bash
# Quick test to see all our tools
npm run quick:test
```

**✅ Expected output:**
```
🛠️ Available Tools:
════════════════════════════════════════
✅ add-task - Add a new task with priority and due date
✅ list-tasks - List all tasks with filtering options
✅ complete-task - Mark a task as complete or incomplete
✅ export-tasks - Export tasks to different formats
✅ data-analysis - Complete data analysis (built-in)
✅ server-status - Get server health information (built-in)
```

Perfect! Our tools are created. Now let's add some functionality.

## 💾 Step 3: Add Task Storage Resource (3 minutes)

We need a way to store our tasks. Let's add a resource for task data:

```bash
# Add a resource to store task data
npx mcp-server-generator add resource task-storage \
  --description "Persistent task storage and retrieval"
```

**✅ Checkpoint - Verify the resource was created:**
```bash
npm run test:resources
```

**You should see:**
```
📋 Available Resources:
══════════════════════════════════════
✅ task-storage - Persistent task storage and retrieval
✅ data-analysis-guide - Comprehensive analysis guide (built-in)
✅ server-info - Server configuration and status (built-in)
```

## 🔧 Step 4: Implement Simple Task Logic (5 minutes)

Now let's add basic functionality to our task tools. We'll edit one tool to show you the pattern:

**Edit `src/tools/add-task-tool.ts`:**

```typescript title="src/tools/add-task-tool.ts"
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export class AddTaskTool {
  private tasksFile = join(process.cwd(), 'tasks.json');

  constructor(private name: string = 'add-task') {}

  register(server: McpServer): void {
    server.registerTool(
      this.name,
      {
        title: "Add Task",
        description: "Add a new task with description, priority, and due date",
        inputSchema: {
          description: z.string().describe("Task description"),
          priority: z.enum(['low', 'medium', 'high']).default('medium').describe("Task priority"),
          dueDate: z.string().optional().describe("Due date (YYYY-MM-DD format)"),
          tags: z.array(z.string()).optional().describe("Task tags/categories")
        }
      },
      async (args) => {
        try {
          const task = {
            id: Date.now().toString(),
            description: args.description,
            priority: args.priority,
            dueDate: args.dueDate,
            tags: args.tags || [],
            completed: false,
            createdAt: new Date().toISOString()
          };

          // Load existing tasks
          const tasks = this.loadTasks();
          tasks.push(task);
          
          // Save tasks
          this.saveTasks(tasks);

          return {
            content: [{
              type: "text",
              text: `✅ Task added successfully!\n\n` +
                    `📝 **Description:** ${task.description}\n` +
                    `🔥 **Priority:** ${task.priority}\n` +
                    `📅 **Due:** ${task.dueDate || 'No due date'}\n` +
                    `🏷️ **Tags:** ${task.tags.join(', ') || 'None'}\n` +
                    `🆔 **ID:** ${task.id}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: `❌ Error adding task: ${error.message}`
            }]
          };
        }
      }
    );
  }

  private loadTasks(): any[] {
    if (!existsSync(this.tasksFile)) {
      return [];
    }
    try {
      const data = readFileSync(this.tasksFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private saveTasks(tasks: any[]): void {
    writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));
  }
}
```

**✅ Checkpoint - Test the implementation:**
```bash
# Build the project
npm run build

# Test our add-task tool
npm run inspector:cli -- --tool add-task \
  --args '{"description": "Buy groceries", "priority": "medium", "dueDate": "2024-02-15"}'
```

**Expected output:**
```
✅ Task added successfully!

📝 Description: Buy groceries
🔥 Priority: medium  
📅 Due: 2024-02-15
🏷️ Tags: None
🆔 ID: 1703875200000
```

Great! Your first task is working. You now have a file called `tasks.json` in your project directory containing your task data.

## 🧪 Step 5: Test with MCP Inspector (3 minutes)

Let's test our task manager with the visual MCP Inspector:

```bash
# Start the MCP Inspector
npm run inspector
```

**This will:**
1. ✅ Open your browser to http://localhost:3000
2. ✅ Show all your tools visually
3. ✅ Let you test tools interactively

**Try this in the Inspector:**
1. Click on the **"add-task"** tool
2. Fill in the form:
   - **Description:** "Learn MCP development"
   - **Priority:** "high"
   - **Due Date:** "2024-02-20"
3. Click **Execute**
4. See your task added successfully!

**✅ Checkpoint - You should see:**
- The task added with a success message
- A new entry in your `tasks.json` file
- The response formatted nicely in the Inspector

## 🔗 Step 6: Connect to Claude Desktop (2 minutes)

Now let's use our task manager with Claude Desktop:

**Add to your Claude Desktop configuration:**

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "task-manager": {
      "command": "node",
      "args": ["/absolute/path/to/your/task-manager/lib/server.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**Start your server for Claude Desktop:**
```bash
# Build first
npm run build

# Start in stdio mode for Claude Desktop
npm run dev:stdio
```

**✅ Test in Claude Desktop:**
Open Claude Desktop and try:
```
Hi Claude! Can you help me add a task to buy milk with high priority?
```

Claude should use your task manager tool to add the task!

## 🎉 Congratulations!

You've successfully built a working Task Manager MCP in 15 minutes! 

### ✅ What You Accomplished

- 🛠️ **Created 4 custom tools** for task management
- 💾 **Implemented task storage** with JSON persistence
- 🧪 **Tested with MCP Inspector** for visual debugging
- 🤖 **Integrated with Claude Desktop** for AI task management

### 🔄 Your Task Manager Features

- ✅ **Add tasks** with priorities and due dates
- 💾 **Persistent storage** - tasks saved to `tasks.json`
- 🔧 **Extensible architecture** - easy to add more features
- 🤖 **AI integration** - manage tasks through natural language

## 🚀 Next Steps

Ready to level up? Here are some ideas:

### 🛠️ Extend Your Task Manager
- **Edit remaining tools** (`list-tasks`, `complete-task`, `export-tasks`) using the same pattern
- **Add due date reminders** with notification tools
- **Create task categories** and filtering
- **Add task dependencies** and subtasks

### 📚 Learn More
- Try the **[Weather API Tutorial](./weather-api-mcp.md)** to learn external API integration
- Explore **[File Organizer Tutorial](./file-organizer-mcp.md)** for file system operations
- Check out **[Advanced Code Review Tutorial](../tutorial-basics/advanced-code-review-mcp.md)** for complex scenarios

### 🔧 Customize Further
- **Add a web interface** using HTTP transport
- **Integrate with calendar apps** via APIs
- **Add team collaboration** features
- **Create mobile notifications**

## 💡 Key Concepts Learned

This tutorial taught you essential MCP development concepts:

1. **Project scaffolding** with `mcp-server-generator`
2. **Tool creation** and input validation with Zod schemas
3. **Data persistence** using file system operations
4. **Testing workflows** with Inspector and CLI tools
5. **AI integration** through Claude Desktop stdio transport

## 🎯 Build Along Series

Continue your MCP journey with our other build-along tutorials:

- 🟡 **[Weather API MCP](./weather-api-mcp.md)** - External API integration (25 min)
- 🟡 **[File Organizer MCP](./file-organizer-mcp.md)** - File system operations (30 min)
- 🔴 **[Git Helper MCP](./git-helper-mcp.md)** - Advanced git workflows (35 min)

**Each tutorial builds on concepts you learned here!**

---

:::tip Share Your Success!
Built something cool? Share it in our [Community Showcase](https://github.com/LinuxDevil/Create-MCP/discussions/categories/showcase)!
:::

## ❓ Need Help?

- **🐛 Issues:** [GitHub Issues](https://github.com/LinuxDevil/Create-MCP/issues)
- **💬 Questions:** [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)
- **📚 Documentation:** [Full MCP Server Generator Docs](../intro.md)

## 📦 Complete Source Code

**Full tutorial code available:**
- 📂 **[GitHub Repository](https://github.com/LinuxDevil/Create-MCP/tree/main/examples/tutorial-builds/task-manager)** - Complete working project
- 📋 **[Code Gist](https://gist.github.com/linuxdevil/task-manager-mcp-tutorial)** - Individual files
- 🔗 **[Live Demo](https://github.com/LinuxDevil/Create-MCP/tree/main/examples/tutorial-builds/task-manager/demo)** - Screenshots and videos

**What's included:**
- ✅ Complete `task-manager` project with all tools implemented
- ✅ `package-lock.json` with pinned dependency versions
- ✅ Test cases and example tasks
- ✅ Docker configuration for containerized deployment
- ✅ Claude Desktop configuration examples

## 📄 License & Usage

**Code License:**
- ✅ **MIT License** - Free to use, modify, and distribute
- ✅ **Commercial use allowed** - Use in your projects or products
- ✅ **Attribution appreciated** but not required

**Tutorial Content:**
- ✅ **Creative Commons CC BY 4.0** - Share and adapt freely
- ✅ **Link back to original** when sharing

**Third-party Dependencies:**
- All npm packages use their respective licenses (mostly MIT/Apache 2.0)
- MCP SDK: Apache 2.0 License
- Node.js: MIT License

**Data & Privacy:**
- ✅ **No external data collection** - Tasks stored locally only
- ✅ **No telemetry or tracking** - Completely private
- ✅ **GDPR compliant** - User owns all data

## 🔄 Maintenance & Updates

**Currency Promise:**
- ✅ **Updated monthly** - Kept current with latest MCP SDK
- ✅ **Version tested** - Works with stated Node.js/npm versions
- ✅ **Breaking changes** - Documented in tutorial updates

**Migration Guide:**
- **Newer Node.js**: Should work with any 18+ version
- **Older versions**: May work with Node.js 16+, but not tested
- **MCP SDK updates**: Check [migration guide](../api/overview.md) for breaking changes

Happy coding! 🚀
