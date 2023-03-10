import { Seo } from "components";
import { graphql } from "gatsby";
import { getVideos } from "libs";
import React from "react";
import { Post, SiteMetadata } from "types/gatsby";

const Env = ({
  data: {
    site: {
      siteMetadata: {
        author,
        social: { youtube },
      },
    },
    allMarkdownRemark: { nodes: posts },
  },
  serverData,
}: {
  data: {
    site: {
      siteMetadata: SiteMetadata;
    };
    allMarkdownRemark: {
      nodes: Post[];
    };
  };
  serverData: any;
}) => {
  console.log("serverData", serverData);

  return (
    <div>
      <h1>Env</h1>
      <p>AAA{JSON.stringify(serverData)}AAA</p>
      {serverData.videos.map((video: any) => (
        <div key={video.id.videoId}>
          <p>{video.snippet.title}</p>
        </div>
      ))}
      {posts.map(post => (
        <div key={post.id}>{post.frontmatter.title}</div>
      ))}
    </div>
  );
};

export default Env;

export const Head = () => <Seo title={"Hello"} />;

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

export const getServerData = async () => {
  const videos = await getVideos();
  return {
    props: {
      foo: "bar",
      env: process.env.GATSBY_HELLO_ENV,
      videos,
    },
  };
};
