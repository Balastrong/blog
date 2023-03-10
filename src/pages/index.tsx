import {
  Layout,
  NavigatorButton,
  PostThumb,
  Seo,
  VideoThumb,
} from "components";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { getVideos } from "libs";
import React from "react";
import { Post, SiteMetadata } from "types/gatsby";
import { YouTubeVideo } from "types/youtube";

const Index = ({
  data: {
    site: {
      siteMetadata: {
        author,
        social: { youtube },
      },
    },
    allMarkdownRemark: { nodes: posts },
  },
  serverData: { videos },
}: {
  data: {
    site: {
      siteMetadata: SiteMetadata;
    };
    allMarkdownRemark: {
      nodes: Post[];
    };
  };
  serverData: {
    videos: YouTubeVideo[];
  };
}) => {
  return (
    <Layout className="Home">
      <section className="Home_me">
        <h2 className="Shades_blue">{author.name}</h2>
        <StaticImage
          layout="fixed"
          formats={["auto", "png"]}
          src="../images/propic_blue.jpg"
          width={175}
          height={175}
          quality={100}
          alt="Profile picture"
        />
        <div className="Home_summary">
          <p>{author.summary}</p>
        </div>
      </section>
      <section className="Home_listSection">
        <h2 className="Shades_red">YouTube</h2>
        <small>Watch my latest videos</small>
        <div className="Home_listContainer">
          {videos?.map(video => (
            <VideoThumb key={video.id.videoId} video={video} />
          ))}
        </div>
        <div className="Home_listLink">
          <NavigatorButton
            link={youtube}
            text="Go to my channel"
            arrow="right"
            isInternalLink={false}
          />
        </div>
      </section>
      <section className="Home_listSection">
        <h2 className="Shades_green">Blog</h2>
        <small>Pretty much the same YouTube content, but written!</small>
        <div className="Home_listContainer">
          {posts.map(post => (
            <PostThumb key={post.fields.slug} post={post} />
          ))}
        </div>
        <div className="Home_listLink">
          <NavigatorButton
            link={"/page/1"}
            text="Go to all articles"
            arrow="right"
          />
        </div>
      </section>
      {/* Backlink to verify on Mastodon */}
      <a rel="me" href="https://fosstodon.org/@balastrong"></a>
    </Layout>
  );
};

export default Index;

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
      videos,
    },
  };
};
