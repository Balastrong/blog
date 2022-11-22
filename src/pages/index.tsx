import { graphql, Link } from "gatsby";
import * as React from "react";
import { Post } from "types/gatsby";
import {
  Bio,
  Layout,
  PostPreview,
  PostPreviewList,
  Seo,
  Tag,
  TagList,
} from "components";
import "./Pages.scss";

const BlogIndex = ({ data, location }: any) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts: Post[] = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout section="blog" title="Blog Leonardo">
        <Bio orientation="horizontal" />
      </Layout>
    );
  }

  return (
    <Layout section="blog" title={siteTitle}>
      <div className="Index">
        <PostPreviewList posts={posts} />
        <div className="Index_bio">
          <Bio orientation="vertical" />
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Blog Leonardo" />;

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
          tags
        }
      }
    }
  }
`;
