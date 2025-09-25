import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MCP Server Generator',
  tagline: 'Generate and extend production-ready Model Context Protocol servers',
  favicon: 'mcp-server-generator_icon_light.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mcp-server-generator.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LinuxDevil', // Usually your GitHub org/user name.
  projectName: 'Create-MCP', // Usually your repo name.

  onBrokenLinks: 'throw',
  
  // Enable sitemap generation
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LinuxDevil/Create-MCP/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LinuxDevil/Create-MCP/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Additional head tags for SEO optimization
  headTags: [
    // Preconnect to external domains for better performance
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    // JSON-LD structured data for better SEO
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'SoftwareApplication',
        name: 'MCP Server Generator',
        description: 'Generate and extend production-ready Model Context Protocol (MCP) servers with comprehensive tooling, TypeScript support, and modern development features.',
        url: 'https://mcp-server-generator.dev',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        programmingLanguage: 'TypeScript',
        author: {
          '@type': 'Person',
          name: 'LinuxDevil',
          url: 'https://github.com/LinuxDevil'
        },
        publisher: {
          '@type': 'Organization',
          name: 'MCP Server Generator',
          url: 'https://mcp-server-generator.dev',
          logo: {
            '@type': 'ImageObject',
            url: 'https://mcp-server-generator.dev/mcp-server-generator_icon_light.png'
          }
        },
        downloadUrl: 'https://www.npmjs.com/package/mcp-server-generator',
        softwareVersion: 'Latest',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        keywords: 'MCP, Model Context Protocol, server generator, CLI tool, TypeScript, development tools'
      }),
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'mcp-server-generator_wordmark_light.png',
    
    // SEO Metadata
    metadata: [
      {name: 'keywords', content: 'MCP, Model Context Protocol, server generator, CLI tool, TypeScript, development tools, AI servers, machine learning, documentation generation, production ready'},
      {name: 'description', content: 'Generate and extend production-ready Model Context Protocol (MCP) servers with comprehensive tooling, TypeScript support, and modern development features.'},
      {name: 'author', content: 'LinuxDevil'},
      {name: 'robots', content: 'index, follow'},
      
      // Open Graph / Facebook
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'MCP Server Generator - Production-Ready Model Context Protocol Servers'},
      {property: 'og:description', content: 'Generate and extend production-ready Model Context Protocol (MCP) servers with comprehensive tooling, TypeScript support, and modern development features.'},
      {property: 'og:image', content: 'https://mcp-server-generator.dev/mcp-server-generator_wordmark_light.png'},
      {property: 'og:url', content: 'https://mcp-server-generator.dev'},
      {property: 'og:site_name', content: 'MCP Server Generator'},
      
      // Twitter Cards
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'MCP Server Generator - Production-Ready MCP Servers'},
      {name: 'twitter:description', content: 'Generate and extend production-ready Model Context Protocol servers with comprehensive tooling and TypeScript support.'},
      {name: 'twitter:image', content: 'https://mcp-server-generator.dev/mcp-server-generator_wordmark_light.png'},
      
      // Additional SEO
      {name: 'application-name', content: 'MCP Server Generator'},
      {name: 'apple-mobile-web-app-title', content: 'MCP Server Generator'},
      {name: 'theme-color', content: '#2e8555'},
    ],
    
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'MCP Server Generator Logo',
        src: 'mcp-server-generator_wordmark_light.png',
        srcDark: 'mcp-server-generator_wordmark_dark.png',
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/LinuxDevil/Create-MCP',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/mcp-server-generator',
          label: 'NPM',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'CLI Commands',
              to: '/docs/cli-commands',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/LinuxDevil/Create-MCP/issues',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/LinuxDevil/Create-MCP/discussions',
            },
            {
              label: 'MCP Protocol',
              href: 'https://modelcontextprotocol.io',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'NPM Package',
              href: 'https://www.npmjs.com/package/mcp-server-generator',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/LinuxDevil/Create-MCP',
            },
            {
              label: 'Examples',
              to: '/docs/examples',
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
