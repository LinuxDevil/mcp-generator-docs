import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🚀 Generate Complete Servers',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Create production-ready MCP servers in seconds with comprehensive 
        Data Analysis Assistant showcasing <strong>ALL MCP features</strong> - 
        tools, resources, prompts, and advanced capabilities like elicitation and sampling.
      </>
    ),
  },
  {
    title: '➕ Extend with Components',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Seamlessly add new components to existing projects. Generate tools, resources, 
        prompts, services, transports, and utilities with intelligent automation 
        and <strong>automatic integration</strong>.
      </>
    ),
  },
  {
    title: '🏗️ Production Architecture',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Built with clean architecture and TypeScript. Includes comprehensive testing, 
        MCP Inspector integration, multiple transports, and <strong>deployment-ready</strong> 
        configurations for immediate production use.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  // Generate accessible alt text based on the title
  const altText = `Illustration for ${title.replace(/[🚀➕🏗️]/g, '').trim()}`;
  
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" aria-label={altText} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
