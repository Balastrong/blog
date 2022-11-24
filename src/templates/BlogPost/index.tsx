import { Bio, Layout, PostMeta, Seo, TagList } from "components";
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
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <section>
          <DiscussionEmbed {...disqusConfig} />
        </section>
      </article>
      <nav className="BlogPost_nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"/" + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/" + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
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
