import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { SiteMetadata } from "types/gatsby";
import { getImage } from "gatsby-plugin-image";

export function Seo({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const {
    site: { siteMetadata },
  }: {
    site: {
      siteMetadata: SiteMetadata;
    };
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            siteImage {
              childImageSharp {
                gatsbyImageData(width: 1024)
              }
            }
            social {
              twitterHandle
            }
          }
        }
      }
    `
  );

  const metaDescription = description || siteMetadata.description;
  const defaultTitle = siteMetadata?.title;
  const imageSrc = getImage(siteMetadata.siteImage)?.images.fallback?.src;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={siteMetadata?.social?.twitterHandle || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {imageSrc && (
        <meta
          property="og:image"
          content={`${siteMetadata?.siteUrl}${imageSrc}`}
        />
      )}

      {children}
    </>
  );
}
