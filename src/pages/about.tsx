import {
  Layout,
  NavigatorButton,
  PostThumb,
  Seo,
  VideoThumb,
} from "components";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { getVideos } from "libs";
import React from "react";
import { Post, SiteMetadata } from "types/gatsby";
import { YouTubeVideo } from "types/youtube";

const About = ({
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
    <Layout section="about" title="About me" className="About">
      <section className="About_me">
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
        <div className="About_summary">
          <p>{author.summary}</p>
        </div>
      </section>
      <section className="About_listSection">
        <h2 className="Shades_red">YouTube</h2>
        <small>Watch my latest videos</small>
        <div className="About_listContainer">
          {videos.map((video, i) => (
            <VideoThumb key={i} video={video} />
          ))}
        </div>
        <div className="About_listLink">
          <NavigatorButton
            link={youtube}
            text="Go to my channel"
            arrow="right"
            isInternalLink={false}
          />
        </div>
      </section>
      <section className="About_listSection">
        <h2 className="Shades_green">Blog</h2>
        <small>Pretty much the same YouTube content, but written!</small>
        <div className="About_listContainer">
          {posts.map(post => (
            <PostThumb key={post.fields.slug} post={post} />
          ))}
        </div>
        <div className="About_listLink">
          <NavigatorButton link={"/"} text="Go to all articles" arrow="right" />
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

export const getServerData = async () => {
  return {
    props: {
      videos: await getVideos(),
    },
  };
};
