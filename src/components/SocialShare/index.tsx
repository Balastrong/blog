import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { FaFacebook, FaLinkedin, FaReddit, FaTwitter } from "react-icons/fa";
import { Post } from "types/gatsby";
import "./SocialShare.scss";

export function SocialShare({ post }: { post: Post }) {
  const data = useStaticQuery(graphql`
    query SocialShareQuery {
      site {
        siteMetadata {
          siteUrl
          social {
            twitterHandle
          }
        }
      }
    }
  `);

  const postUrl = `${data.site.siteMetadata.siteUrl}/${post.fields.slug}`;
  const hashtags = post.frontmatter.tags
    ?.map(t => `#${t.replaceAll("-", "")}`)
    .join(" ");
  const twitterText = `Read this article "${post.frontmatter.title}" by @${
    data.site.siteMetadata.social.twitterHandle
  }\n\n${hashtags ? `${hashtags}\n\n` : ""}${postUrl}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    twitterText
  )}`;

  const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
    postUrl
  )}&title=${encodeURIComponent(post.frontmatter.title)}`;

  return (
    <div className="SocialShare">
      <div className="SocialShare_header">SHARE</div>
      <div className="SocialShare_buttons">
        <SocialATag socialName="twitter" href={twitterUrl}>
          <FaTwitter color="#1DA1F2" />
        </SocialATag>
        <SocialATag
          socialName="linkedin"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
        >
          <FaLinkedin color="#0077B5" />
        </SocialATag>
        <SocialATag socialName="reddit" href={redditUrl}>
          <FaReddit color="#FF4500" />
        </SocialATag>
        <SocialATag
          socialName="facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
        >
          <FaFacebook color="#4267B2" />
        </SocialATag>
      </div>
    </div>
  );
}

const SocialATag = ({
  href,
  socialName,
  children,
}: {
  href: string;
  socialName: string;
  children: any;
}) => (
  <a
    className={`${socialName}-share-button`}
    target="_blank"
    rel="noopener"
    href={href}
  >
    {children}
  </a>
);
