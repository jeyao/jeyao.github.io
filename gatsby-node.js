const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require(`fs`);
const urljoin = require(`url-join`);

const { normalizeBasePath, resolveLink } = require(`./src/@rocketseat/gatsby-theme-docs-core/util/url`);
const withDefault = require(`./src/@rocketseat/gatsby-theme-docs-core/util/with-default`);

function generateRepositoryEditLink(themeOptions, relativePath) {

  const { baseDir, docsPath, repositoryUrl, githubUrl, branch } = withDefault(
    themeOptions,
  );

  const repoUrl = !repositoryUrl && githubUrl ? githubUrl : repositoryUrl;
  const pathToFile = path.join(branch, baseDir, docsPath);

  if (repoUrl.includes('github')) {
    return {
      editUrl: urljoin(repoUrl, `tree`, pathToFile, relativePath),
      provider: `GitHub`,
    };
  }

  if (repoUrl.includes('gitlab')) {
    return {
      editUrl: urljoin(repoUrl, '-', 'blob', pathToFile, relativePath),
      provider: `GitLab`,
    };
  }

  if (repoUrl.includes('bitbucket')) {
    return {
      editUrl: urljoin(repoUrl, 'src', pathToFile, relativePath),
      provider: `BitBucket`,
    };
  }

  return {
    editUrl: null,
    provider: null,
  };
}

exports.createPages = (
  { graphql, actions: { createPage }, reporter },
) => {
  reporter.success(`onCreateDocs`);

  const themeOptions = require(`./src/config/site.js`);
  const { basePath, githubUrl, repositoryUrl } = withDefault(themeOptions);

  const docsTemplate = require.resolve(`./src/@rocketseat/gatsby-theme-docs/src/templates/docs-query.js`);
  const homeTemplate = require.resolve(`./src/@rocketseat/gatsby-theme-docs/src/templates/homepage-query.js`);

  return graphql(
    `
      {
        files: allFile(filter: { extension: { in: ["md", "mdx"] } }) {
          edges {
            node {
              id
              relativePath
              childMdx {
                fields {
                  slug
                }
              }
            }
          }
        }
        sidebar: allSidebarItems {
          edges {
            node {
              label
              link
              items {
                label
                link
              }
              id
            }
          }
        }
      }
    `,
  ).then((result) => {
    if (result.errors) {
      reporter.panic(
        `docs: there was an error loading the docs folder!`,
        result.errors,
      );
      return;
    }

    if (!repositoryUrl && githubUrl) {
      reporter.warn(
        `@rocketseat/gatsby-theme-docs: The option \`githubUrl\` was deprecated in favor of \`repositoryUrl\`. \nTo remove this warning, replace \`githubUrl\` with \`repositoryUrl\`.`,
      );
    }

    createPage({
      path: basePath,
      component: homeTemplate,
    });

    // Generate prev/next items based on sidebar.yml file
    const sidebar = result.data.sidebar.edges;
    const listOfItems = [];

    sidebar.forEach(({ node: { label, link, items } }) => {
      if (Array.isArray(items)) {
        items.forEach((item) => {
          listOfItems.push({
            label: item.label,
            link: resolveLink(item.link, basePath),
          });
        });
      } else {
        listOfItems.push({
          label,
          link: resolveLink(link, basePath),
        });
      }
    });

    // Generate docs pages
    const docs = result.data.files.edges;
    docs.forEach((doc) => {
      const {
        childMdx: {
          fields: { slug },
        },
        relativePath,
      } = doc.node;

      // Get the file edit link based on the repository url
      const repositoryEditUrl = generateRepositoryEditLink(
        themeOptions,
        relativePath,
      );

      const pageLink = slug.slice(0, slug.length - 1);
      const currentPageIndex = listOfItems.findIndex(
        (page) => page.link === pageLink,
      );

      const prev = listOfItems[currentPageIndex - 1];
      const next = listOfItems[currentPageIndex + 1];

      createPage({
        path: slug,
        component: docsTemplate,
        context: {
          slug,
          prev,
          next,
          repositoryEditUrl: repositoryEditUrl.editUrl || '',
          repositoryProvider: repositoryEditUrl.provider || '',
        },
      });
    });

    reporter.success(`docs pages created`);
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MdxFrontmatter {
      title: String!
      description: String
      image: String
      disableTableOfContents: Boolean
      next: String
    }
  `);

  createTypes(`
    type SidebarItems implements Node {
      label: String!
      link: String
      items: [SidebarItemsItems]
    }

    type SidebarItemsItems {
      label: String
      link: String
    }
  `);
};

exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
  const { configPath, docsPath } = withDefault(themeOptions);
  const { program } = store.getState();

  const dirs = [
    path.join(program.directory, configPath),
    path.join(program.directory, docsPath),
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.success(`docs: intialized the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

exports.onCreateNode = (
  { node, actions: { createNodeField }, getNode },
  themeOptions,
) => {
  if (node.internal.type !== `Mdx`) {
    return;
  }

  const { basePath } = withDefault(themeOptions);

  let value = createFilePath({ node, getNode });
  if (value === 'index') value = '';

  createNodeField({
    name: `slug`,
    node,
    value: normalizeBasePath(basePath, value),
  });

  createNodeField({
    name: `id`,
    node,
    value: node.id,
  });
};
