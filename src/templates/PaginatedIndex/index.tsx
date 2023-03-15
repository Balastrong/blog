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
  const posts: Post[] = data.allMarkdownRemark.nodes;

  return (
    <Layout section="blog">
      <div className="PaginatedIndex">
        <main className="PaginatedIndex_postPreview">
          <PostPreviewList posts={posts} />
          <Paginator context={pageContext} />
        </main>
      </div>
    </Layout>
  );
};

export default PaginatedPosts;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title={"Blog"} />;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
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
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
