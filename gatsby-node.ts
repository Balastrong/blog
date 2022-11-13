/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { GatsbyNode } from "gatsby";
import { Post } from "./src/@types/gatsby";

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/BlogPost/index.tsx`);

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const result = await graphql<any>(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts: Post[] = result.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
  };

// Temporary workaround while waiting for the original package to be enabled for Gatsby v5
// Ref: https://github.com/mongkuen/gatsby-plugin-root-import/pull/19
export const onCreateWebpackConfig = (
  { actions, getConfig }: any,
  pluginOptions: any
) => {
  const hasPluginOptions = Object.keys(pluginOptions).filter(
    item => item !== "plugins"
  ).length;
  const config = getConfig();
  const contextSrc = path.join(config.context, "src");
  const defaultModules = [contextSrc, "node_modules"];

  if (hasPluginOptions) {
    const { plugins, resolveModules, ...aliasOptions } = pluginOptions;
    const modules = !resolveModules
      ? defaultModules
      : [...resolveModules, ...defaultModules];

    actions.setWebpackConfig({
      resolve: {
        alias: { src: contextSrc, ...aliasOptions },
        modules,
      },
    });
  } else {
    actions.setWebpackConfig({
      resolve: {
        alias: { src: contextSrc },
        modules: defaultModules,
      },
    });
  }
};
