import {
  Layout,
  NavigatorButton,
  PostThumb,
  Seo,
  VideoThumb,
} from "components";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { getVideos } from "libs";
import React from "react";
import { Post, SiteMetadata } from "types/gatsby";
import { YouTubeVideo } from "types/youtube";

const Index = ({
  serverData: { videos },
}: {
  serverData: {
    videos: YouTubeVideo[];
  };
}) => {
  const {
    site: {
      siteMetadata: {
        author,
        social: { youtube },
      },
    },
    allMarkdownRemark: { nodes: posts },
  } = useStaticQuery<{
    site: {
      siteMetadata: SiteMetadata;
    };
    allMarkdownRemark: {
      nodes: Post[];
    };
  }>(graphql`
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
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 6
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
  `);

  return (
    <Layout className="Main">
      <section className="Main_me">
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
        <div className="Main_summary">
          <p>{author.summary}</p>
        </div>
      </section>
      <section className="Main_listSection">
        <h2 className="Shades_red">YouTube</h2>
        <div className="Main_listSectionSubtitle">Watch my latest videos</div>
        <div className="Main_listContainer">
          {(videos ?? []).map(video => (
            <VideoThumb key={video.id.videoId} video={video} />
          ))}
        </div>
        <div className="Main_listLink">
          <NavigatorButton
            link={youtube}
            text="Go to my channel"
            arrow="right"
            isInternalLink={false}
          />
        </div>
      </section>
      <section className="Main_listSection">
        <h2 className="Shades_green">Blog</h2>
        <div className="Main_listSectionSubtitle">
          Pretty much the same YouTube content, but written!
        </div>
        <div className="Main_listContainer">
          {posts.map(post => (
            <PostThumb key={post.fields.slug} post={post} />
          ))}
        </div>
        <div className="Main_listLink">
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

export const Head = () => <Seo />;

export const getServerData = async () => {
  const videos = await getVideos();

  return {
    props: {
      foo: "bar",
      videos,
    },
  };
};
