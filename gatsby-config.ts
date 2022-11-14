/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

import { PluginRef } from "gatsby";
import { SiteMetadata } from "./src/@types/gatsby";

export const siteMetadata: SiteMetadata = {
  title: `Leonardo's Blog`,
  author: {
    name: `Leonardo Montini`,
    summary: `Web Developer, Open Source enthusiast and Content Creator.`,
  },
  description: `Leonardo Montini's official website`,
  siteUrl: `https://charming-strudel-f0618b.netlify.app/`,
  social: {
    twitter: `https://twitter.com/balastrong`,
    twitterHandle: `balastrong`,
    youtube: "https://www.youtube.com/@DevLeonardo",
    devto: "https://dev.to/balastrong",
    linkedin: "https://www.linkedin.com/in/leonardo-montini/",
  },
};
export const plugins: PluginRef[] = [
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/blog`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 630,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        `gatsby-remark-prismjs`,
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }: any) => {
            return allMarkdownRemark.nodes.map((node: any) => {
              return Object.assign({}, node.frontmatter, {
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              });
            });
          },
          query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
          output: "/rss.xml",
          title: "Leonardo's Blog RSS Feed",
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Leonardo's Blog`,
      short_name: `Leonardo`,
      start_url: `/`,
      background_color: `#ffffff`,
      // This will impact how browsers show your PWA/website
      // https://css-tricks.com/meta-theme-color-and-trickery/
      // theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    },
  },
  "gatsby-plugin-sass",
];
