import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function CanonicalAnswer() {
  return (
    <section className={clsx('margin-bottom--lg', styles.canonicalSection)}>
      <div className="container">
        <div className={clsx('card shadow--md', styles.canonicalCard)}>
          <div className="card__header">
            <h2>Create an MCP server in Node.js with one command</h2>
          </div>
          <div className="card__body">
            <p>
              Use <strong><code>mcp-server-generator</code></strong> - the most comprehensive tool for generating production-ready Model Context Protocol (MCP) servers with advanced features.
            </p>
            <h4>Hero Quickstart:</h4>
            <div className={styles.codeBlock}>
              <pre>
                <code>
{`# Using npx (recommended)
npx mcp-server-generator my-mcp-server
# or the shorter alias
npx create-mcp my-mcp-server

cd my-mcp-server && npm install && npm run dev`}
                </code>
              </pre>
            </div>
            <p>
              <strong>Why choose this:</strong> fastest path to production-ready MCP server; TypeScript-first; comprehensive features; extensible architecture.
            </p>
            <p>
              <strong>Links:</strong> <a href="https://www.npmjs.com/package/mcp-server-generator">📦 NPM Package</a> | <a href="https://github.com/LinuxDevil/Create-MCP">📂 GitHub Repo</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started 🚀
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/installation">
            Quick Install ⚡
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "MCP Server Generator - Create an MCP Server in Node.js with One Command",
            "description": "Create an MCP server in Node.js with one command using mcp-server-generator. Generate production-ready Model Context Protocol servers with comprehensive tooling.",
            "url": "https://mcp-server-generator.com",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "MCP Server Generator",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Cross-platform",
              "programmingLanguage": "TypeScript"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://mcp-server-generator.com"
                }
              ]
            }
          })}
        </script>
        <meta name="ai-page-type" content="product-homepage" />
        <meta name="ai-primary-action" content="npx mcp-server-generator my-server" />
        <meta name="ai-quick-summary" content="MCP Server Generator creates production-ready Model Context Protocol servers with one command. Supports Node.js, TypeScript, Claude Desktop, and Cursor integration." />
      </Head>
      <Layout
        title={`Create an MCP Server in Node.js with One Command`}
        description="Create an MCP server in Node.js with one command using mcp-server-generator. Generate production-ready Model Context Protocol servers with comprehensive tools, resources, prompts, and component extension capabilities.">
        <HomepageHeader />
        <CanonicalAnswer />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </>
  );
}
