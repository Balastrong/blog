import { Layout, Navigator, PostMeta, Seo, SocialShare } from "components";
import { DiscussionEmbed } from "disqus-react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";
import { Post, SiteMetadata } from "types/gatsby";
import "./BlogPost.scss";

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
  const image = getImage(post.frontmatter.featuredImage);

  return (
    <Layout section="blog">
      <article
        className="BlogPost"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="BlogPost_header">
          <div className="BlogPost_headerImage">
            {image && (
              <GatsbyImage
                image={image}
                alt={post.frontmatter.title}
                style={{ maxWidth: "750px" }}
                imgStyle={{ objectFit: "contain" }}
              />
            )}
          </div>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <PostMeta post={post} />
        </header>
        <section
          className="BlogPost_content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <section>
          <SocialShare post={post} />
        </section>
        <section>
          <DiscussionEmbed
            shortname={"leonardomontini"}
            config={{
              url: `${site.siteMetadata.siteUrl}${post.fields.slug}`,
              identifier: post.fields.slug,
              title: post.frontmatter.title,
            }}
          />
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
  data: {
    markdownRemark: post,
    site: {
      siteMetadata: { siteUrl },
    },
  },
}: {
  data: {
    markdownRemark: Post;
    site: { siteMetadata: SiteMetadata };
  };
}) => {
  const image = getImage(post.frontmatter.featuredImage);
  const imageSrc = image?.images.fallback?.src;
  const imageHeight = "" + image?.height;
  const imageWidth = "" + image?.width;

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    >
      <meta property="og:type" content="article" />
      {imageSrc && (
        <meta property="og:image" content={`${siteUrl}${imageSrc}`} />
      )}
      {imageWidth && <meta property="og:image:width" content={imageWidth} />}
      {imageHeight && <meta property="og:image:height" content={imageHeight} />}
      <meta property="og:image:alt" content={post.frontmatter.title} />
      <meta property="og:url" content={`${siteUrl}/${post.fields.slug}`} />
      <meta property="og:site_name" content="Leonardo Montini" />
      <meta property="article:published_time" content={post.frontmatter.date} />
      <meta property="article:modified_time" content={post.frontmatter.date} />
      <meta property="article:author" content="Leonardo Montini" />
      <meta property="article:section" content="Blog" />
    </Seo>
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
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 400)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 1024
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
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
