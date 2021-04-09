const withDefault = require(`./src/@rocketseat/gatsby-theme-docs-core/util/with-default`);

const siteConfig = require(`./src/config/site.js`);
const { basePath, configPath, docsPath } = withDefault(siteConfig);

const domain = `jeyao.github.io`;
const siteUrl = `https://${domain}`;

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteTitle: `Jeyao Docs`,
    defaultTitle: `Jeyao Docs`,
    siteTitleShort: `Jeyao Docs`,
    siteDescription: `Out of the box Gatsby Theme for creating documentation websites easily and quickly`,
    siteUrl,
    siteAuthor: `jeyao`,
    siteImage: `/banner.png`,
    siteLanguage: `cn`,
    themeColor: `#1f3696`,
    basePath,
    footer: `© ${new Date().getFullYear()}`,
  },
  plugins: [
    `gatsby-alias-imports`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: docsPath,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `config`,
        path: configPath,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `SidebarItems`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jeyao Website`,
        short_name: `Jeyao`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-external-links`,
          `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              withWebp: true,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,
          'gatsby-remark-graphviz'
        ],
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-external-links`,
          `gatsby-remark-images`,
          'gatsby-remark-graphviz'
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-antd',
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://rocketdocs.netlify.app`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
