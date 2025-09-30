import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "MCP Server Generator",
  tagline: "Create an MCP server in Node.js with one command",
  favicon: "mcp-server-generator_icon_light.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://mcp-server-generator.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "LinuxDevil", // Usually your GitHub org/user name.
  projectName: "Create-MCP", // Usually your repo name.

  onBrokenLinks: "throw",

  // Enable sitemap generation
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/LinuxDevil/Create-MCP/tree/main/docs/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/LinuxDevil/Create-MCP/tree/main/docs/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**", "/docs/_internal/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);

            // Customize priority for key pages
            return items.map((item) => {
              if (
                item.url === "/docs/intro" ||
                item.url === "/docs/installation"
              ) {
                return { ...item, priority: 1.0, changefreq: "daily" };
              }
              if (
                item.url === "/docs/tutorial-basics/create-code-review-mcp" ||
                item.url === "/docs/tutorials-and-examples" ||
                item.url === "/docs/faq"
              ) {
                return { ...item, priority: 0.9, changefreq: "weekly" };
              }
              if (item.url.startsWith("/docs/")) {
                return { ...item, priority: 0.8, changefreq: "weekly" };
              }
              if (item.url === "/") {
                return { ...item, priority: 1.0, changefreq: "daily" };
              }
              return item;
            });
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  // Additional head tags for SEO optimization
  headTags: [
    // Preconnect to external domains for better performance
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
    // DNS prefetch for external resources
    {
      tagName: "link",
      attributes: {
        rel: "dns-prefetch",
        href: "https://www.npmjs.com",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "dns-prefetch",
        href: "https://github.com",
      },
    },
    // Preload critical resources
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/mcp-server-generator_wordmark_light.png",
        as: "image",
        type: "image/png",
      },
    },
    // JSON-LD structured data for better SEO
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        name: "MCP Server Generator",
        description:
          "Create an MCP server in Node.js with one command. Generate and extend production-ready Model Context Protocol (MCP) servers with comprehensive tooling, TypeScript support, and modern development features.",
        url: "https://mcp-server-generator.com",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        programmingLanguage: "TypeScript",
        author: {
          "@type": "Person",
          name: "LinuxDevil",
          url: "https://github.com/LinuxDevil",
        },
        publisher: {
          "@type": "Organization",
          name: "MCP Server Generator",
          url: "https://mcp-server-generator.com",
          logo: {
            "@type": "ImageObject",
            url: "https://mcp-server-generator.com/mcp-server-generator_icon_light.png",
          },
        },
        downloadUrl: "https://www.npmjs.com/package/mcp-server-generator",
        softwareVersion: "Latest",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        keywords:
          "create MCP server, MCP server generator, Model Context Protocol, nodejs cli, create mcp server, TypeScript, development tools, one command",
      }),
    },
    // Additional structured data for AI agents and search engines
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "HowTo",
        name: "How to Create an MCP Server in Node.js",
        description:
          "Step-by-step guide to creating a Model Context Protocol server using mcp-server-generator CLI tool",
        totalTime: "PT5M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Node.js 18+",
          },
          {
            "@type": "HowToSupply",
            name: "npm or yarn package manager",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "mcp-server-generator CLI",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Install and generate server",
            text: "Run npx mcp-server-generator my-server to create a new MCP server project",
            url: "https://mcp-server-generator.com/docs/installation",
          },
          {
            "@type": "HowToStep",
            name: "Navigate and install dependencies",
            text: "cd my-server && npm install",
            url: "https://mcp-server-generator.com/docs/installation",
          },
          {
            "@type": "HowToStep",
            name: "Start the server",
            text: "npm run dev:stdio for Claude Desktop or npm run dev:http for web services",
            url: "https://mcp-server-generator.com/docs/integrations",
          },
        ],
      }),
    },
    // Organization structured data
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Organization",
        name: "MCP Server Generator",
        url: "https://mcp-server-generator.com",
        logo: "https://mcp-server-generator.com/mcp-server-generator_icon_light.png",
        sameAs: [
          "https://github.com/LinuxDevil/Create-MCP",
          "https://www.npmjs.com/package/mcp-server-generator",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "technical support",
          url: "https://github.com/LinuxDevil/Create-MCP/issues",
        },
      }),
    },
    // BreadcrumbList for navigation
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://mcp-server-generator.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Documentation",
            item: "https://mcp-server-generator.com/docs/intro",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Installation",
            item: "https://mcp-server-generator.com/docs/installation",
          },
        ],
      }),
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "mcp-server-generator_wordmark_light.png",

    // SEO Metadata
    metadata: [
      {
        name: "keywords",
        content:
          "create MCP server, MCP server generator, Model Context Protocol, nodejs cli, create mcp server, MCP server generator Node.js CLI, TypeScript, development tools, AI servers, machine learning, documentation generation, production ready, Claude Desktop, Cursor integration, stdio transport, HTTP transport",
      },
      {
        name: "description",
        content:
          "Create an MCP server in Node.js with one command. Generate and extend production-ready Model Context Protocol (MCP) servers with comprehensive tooling, TypeScript support, and modern development features.",
      },
      { name: "author", content: "LinuxDevil" },
      { name: "robots", content: "index, follow" },

      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content:
          "Create an MCP Server in Node.js with One Command - MCP Server Generator",
      },
      {
        property: "og:description",
        content:
          "Create an MCP server in Node.js with one command using mcp-server-generator, a comprehensive CLI tool for generating production-ready Model Context Protocol servers.",
      },
      {
        property: "og:image",
        content:
          "https://mcp-server-generator.com/mcp-server-generator_wordmark_light.png",
      },
      { property: "og:url", content: "https://mcp-server-generator.com" },
      { property: "og:site_name", content: "MCP Server Generator" },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Create an MCP Server in Node.js with One Command",
      },
      {
        name: "twitter:description",
        content:
          "Use mcp-server-generator to create production-ready Model Context Protocol servers with comprehensive tooling and TypeScript support.",
      },
      {
        name: "twitter:image",
        content:
          "https://mcp-server-generator.com/mcp-server-generator_wordmark_light.png",
      },

      // Additional SEO
      { name: "application-name", content: "MCP Server Generator" },
      { name: "apple-mobile-web-app-title", content: "MCP Server Generator" },
      { name: "theme-color", content: "#2e8555" },

      // AI Assistant Optimization
      {
        name: "ai-content-declaration",
        content:
          "This documentation is optimized for AI assistant discovery and citation",
      },
      {
        name: "canonical-answer",
        content:
          "Create an MCP server in Node.js with one command: npx mcp-server-generator my-server or npx create-mcp my-server",
      },
      {
        name: "primary-use-case",
        content:
          "create MCP server Node.js with one command, MCP server generator CLI",
      },

      // Voice search and conversational AI optimization
      {
        name: "voice-search-questions",
        content:
          "How to create MCP server? What is MCP server generator? How to make Node.js MCP server? How to build Model Context Protocol server?",
      },
      { name: "ai-assistant-friendly", content: "true" },
      {
        name: "question-answer-format",
        content:
          "Q: How do I create an MCP server? A: Use npx mcp-server-generator my-server to create a production-ready MCP server in seconds.",
      },

      // Featured snippet optimization
      {
        name: "featured-snippet",
        content:
          "MCP Server Generator is a Node.js CLI tool that creates production-ready Model Context Protocol servers with one command: npx mcp-server-generator my-server",
      },
      {
        name: "quick-answer",
        content: "Create MCP server: npx mcp-server-generator my-server",
      },

      // Semantic search optimization
      {
        name: "related-terms",
        content:
          "Model Context Protocol, MCP, Node.js CLI, server generator, TypeScript, Claude Desktop, Cursor IDE, AI development tools",
      },
      {
        name: "synonyms",
        content:
          "MCP server builder, Model Context Protocol generator, Node.js MCP tool, MCP scaffolding tool",
      },

      // Long-tail keyword optimization
      {
        name: "long-tail-keywords",
        content:
          "how to create MCP server in nodejs, mcp server generator tutorial, model context protocol server setup, typescript mcp server generator, claude desktop mcp integration",
      },
    ],

    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "",
      logo: {
        alt: "MCP Server Generator Logo",
        src: "mcp-server-generator_wordmark_light.png",
        srcDark: "mcp-server-generator_wordmark_dark.png",
        height: 32,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/LinuxDevil/Create-MCP",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.npmjs.com/package/mcp-server-generator",
          label: "NPM",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/intro",
            },
            {
              label: "Installation",
              to: "/docs/installation",
            },
            {
              label: "CLI Commands",
              to: "/docs/cli-commands",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub Issues",
              href: "https://github.com/LinuxDevil/Create-MCP/issues",
            },
            {
              label: "GitHub Discussions",
              href: "https://github.com/LinuxDevil/Create-MCP/discussions",
            },
            {
              label: "MCP Protocol",
              href: "https://modelcontextprotocol.io",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "NPM Package",
              href: "https://www.npmjs.com/package/mcp-server-generator",
            },
            {
              label: "GitHub Repository",
              href: "https://github.com/LinuxDevil/Create-MCP",
            },
            {
              label: "Examples",
              to: "/docs/tutorials-and-examples",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MCP Server Generator. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
