import { Layout, Seo } from "components";
import { graphql } from "gatsby";

import React from "react";

const YouTube = () => {
  return (
    <Layout section="youtube" title="YouTube">
      <h1>YouTube</h1>
      <p>Coming soon...</p>
    </Layout>
  );
};

export default YouTube;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="YouTube" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
