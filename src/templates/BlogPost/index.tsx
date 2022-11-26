import { Bio, Layout, Navigator, PostMeta, Seo, TagList } from "components";
import { graphql, Link } from "gatsby";
import * as React from "react";
import { Post, SiteMetadata } from "types/gatsby";
import "./BlogPost.scss";
import { DiscussionEmbed } from "disqus-react";

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
}: {
  data: {
    previous: Post;
    next: Post;
    site: {
      siteMetadata: SiteMetadata;
    };
    markdownRemark: Post;
  };
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`;
  const disqusConfig = {
    shortname: "leonardomontini",
    config: { identifier: post.fields.slug, title: post.frontmatter.title },
  };

  return (
    <Layout section="blog" title={siteTitle}>
      <article
        className="BlogPost"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="BlogPost_header">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <PostMeta post={post} />
        </header>
        <section
          className="BlogPost_content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <section>
          <DiscussionEmbed {...disqusConfig} />
        </section>
      </article>
      <footer className="BlogPost_footer">
        <h3 style={{ marginTop: 0 }}>Read next</h3>
        <Navigator
          leftButton={
            previous
              ? {
                  link: `/${previous.fields.slug}`,
                  text: previous.frontmatter.title,
                }
              : undefined
          }
          rightButton={
            next
              ? {
                  link: `/${next.fields.slug}`,
                  text: next.frontmatter.title,
                }
              : undefined
          }
        />
      </footer>
    </Layout>
  );
};

export const Head = ({
  data: { markdownRemark: post },
}: {
  data: {
    markdownRemark: Post;
  };
}) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 250)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
