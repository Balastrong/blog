import { Layout, PostThumb, Seo } from "components";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { Post, SiteMetadata } from "types/gatsby";

const About = ({
  data: {
    site: {
      siteMetadata: { author },
    },
    allMarkdownRemark: { nodes: posts },
  },
}: {
  data: {
    site: {
      siteMetadata: SiteMetadata;
    };
    allMarkdownRemark: {
      nodes: Post[];
    };
  };
}) => {
  return (
    <Layout section="about" title="About me">
      <section className="About_me">
        <h2>{author.name}</h2>
        <StaticImage
          layout="fixed"
          formats={["auto", "png"]}
          src="../images/propic_blue.jpg"
          width={175}
          height={175}
          quality={100}
          alt="Profile picture"
        />
        <div className="About_summary">
          <p>{author.summary}</p>
        </div>
      </section>
      <section>
        <h2>Latest YouTube Videos</h2>
      </section>
      <section>
        <h2>Latest Blog Posts</h2>
        <div className="About_listContainer">
          {posts.map(post => (
            <PostThumb key={post.fields.slug} post={post} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default About;

export const Head = () => <Seo title="About me" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          youtube
        }
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 6) {
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
