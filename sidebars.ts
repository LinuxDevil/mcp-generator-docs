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
      label: 'Components',
      collapsed: false,
      items: [
        'components/overview',
      ],
    },
    'examples',
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
