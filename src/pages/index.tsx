import { graphql, Link } from "gatsby";
import * as React from "react";
import { Post } from "types/gatsby";
import { Bio, Layout, Seo } from "../components";
import "./Pages.scss";

const BlogIndex = ({ data, location }: any) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

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
        <div className="Index_list">
          <ol>
            {posts.map((post: Post) => {
              const title = post.frontmatter.title || post.fields.slug;

              return (
                <li key={post.fields.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <Link to={post.fields.slug} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>
                        {post.frontmatter.date}{" "}
                        {post.frontmatter.tags && (
                          <>
                            &#183;{" "}
                            {post.frontmatter.tags.map(tag => (
                              <Link to={`/tag/${tag}`}>#{tag}</Link>
                            ))}
                          </>
                        )}
                      </small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
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
