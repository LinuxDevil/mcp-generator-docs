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
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'mcp-server-generator_wordmark_light.png',
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
