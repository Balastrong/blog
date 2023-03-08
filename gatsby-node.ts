/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { GatsbyNode, Node } from "gatsby";
import { Post } from "./src/@types/gatsby";

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Define the template for blog post
const postTemplate = path.resolve(`./src/templates/BlogPost/index.tsx`);
const tagTemplate = path.resolve(`./src/templates/Tag/index.tsx`);
const paginatedIndexTemplate = path.resolve(
  "./src/templates/PaginatedIndex/index.tsx"
);

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const { errors, data } = await graphql<{
    allMarkdownRemark: {
      nodes: Post[];
    };
  }>(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          excerpt
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, errors);
    return;
  }

  if (!data) {
    reporter.panicOnBuild(`There was no data returned from your blog posts`);
    return;
  }

  const posts: Post[] = data.allMarkdownRemark.nodes;
  const tagsMap: Map<string, Set<Post>> = new Map();

  if (posts.length > 0) {
    // Create paginated index pages
    const postsPerPage = 8;
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: paginatedIndexTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i,
        },
      });
    });

    // Create blog post pages
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: postTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });

      post.frontmatter.tags?.forEach(tag => {
        if (!tagsMap.has(tag)) {
          tagsMap.set(tag, new Set());
        }

        tagsMap.get(tag)?.add(post);
      });
    });

    // Create tag pages
    Array.from(tagsMap.entries()).forEach(([tag, posts]) => {
      createPage({
        path: `/tag/${tag}`,
        component: tagTemplate,
        context: {
          tag,
          posts: Array.from(posts),
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

    const slug = formatSlug(node, value);

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

function formatSlug(node: Node, filePath: string) {
  return (
    (node.frontmatter as Post["frontmatter"]).slug ||
    filePath.split("_")[1] ||
    filePath
  );
}

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
      siteImage: File @fileByRelativePath
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
      featuredImage: File @fileByRelativePath
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
