import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    'intro',
    'installation', 
    'cli-commands',
    {
      type: 'category',
      label: 'Tutorials & Examples',
      collapsed: false,
      items: [
        'tutorials-and-examples',
        {
          type: 'category',
          label: '🟢 Beginner Tutorials',
          collapsed: false,
          items: [
            'tutorial-builds/task-manager-mcp',
            'tutorial-builds/note-taking-mcp',
          ],
        },
        {
          type: 'category',
          label: '🟡 Intermediate Tutorials',
          collapsed: false,
          items: [
            'tutorial-builds/weather-api-mcp',
            'tutorial-basics/create-code-review-mcp',
            'tutorial-builds/file-organizer-mcp',
          ],
        },
        {
          type: 'category',
          label: '🔴 Advanced Tutorials',
          collapsed: true,
          items: [
            'tutorial-builds/git-helper-mcp',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        'components/overview',
      ],
    },
    'project-structure',
    'testing-debugging',
    'integrations',
    'faq',
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      items: [
        'api/overview',
      ],
    },
  ],
};

export default sidebars;
