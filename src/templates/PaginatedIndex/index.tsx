import { PostPreviewList, Bio, Layout, Seo, Paginator } from "components";
import { graphql } from "gatsby";
import React from "react";
import { PaginatedIndexContext, Post } from "types/gatsby";
import "./PaginatedIndex.scss";

const PaginatedPosts = ({
  data,
  pageContext,
}: {
  data: any;
  pageContext: PaginatedIndexContext;
}) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts: Post[] = data.allMarkdownRemark.nodes;
  const isFirstPage = pageContext.currentPage === 0;

  return (
    <Layout section="blog" title={siteTitle}>
      <div className="PaginatedIndex">
        <main className="PaginatedIndex_postPreview">
          {isFirstPage && <Bio />}
          <PostPreviewList posts={posts} />
          <Paginator context={pageContext} />
        </main>
      </div>
      {isFirstPage && (
        /* Backlink to verify on Mastodon */
        <a rel="me" href="https://fosstodon.org/@balastrong"></a>
      )}
    </Layout>
  );
};

export default PaginatedPosts;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title={"Leonardo Montini"} />;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
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
