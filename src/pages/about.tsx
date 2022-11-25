import { Layout, Seo } from "components";
import { graphql } from "gatsby";

import React from "react";

const About = () => {
  return (
    <Layout section="about" title="About me">
      <h2>About</h2>
      <p>This page is still... empty!</p>
      <p>
        Don't worry though, I've got great plans for it! You can follow the
        process on{" "}
        <a href="https://github.com/Balastrong/blog/issues/11" target="_blank">
          GitHub
        </a>{" "}
        ;)
      </p>
    </Layout>
  );
};

export default About;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="About me" />;

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
