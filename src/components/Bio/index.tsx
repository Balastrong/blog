/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import "./Bio.scss";

export function Bio() {
  const data = useStaticQuery(graphql`
    query BioQuery {
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
    }
  `);

  const { author, social } = data.site.siteMetadata;

  return (
    <div className="Bio">
      <div className="Bio_image">
        <StaticImage
          className="Bio_avatar"
          layout="fixed"
          formats={["auto", "png"]}
          src="../../images/propic_white.jpg"
          width={125}
          height={125}
          quality={100}
          alt="Profile picture"
        />
      </div>
      <div className="Bio_content">
        <div className="Bio_author">
          <strong>{author.name}</strong>
        </div>
        <p>{author?.summary || null}</p>
        <span className="Bio_extended">
          <p>
            Learn by doing, in public. The outcome is{" "}
            {social?.youtube ? (
              <a href={social?.youtube} target="_blank">
                YouTube videos
              </a>
            ) : (
              "YouTube videos"
            )}{" "}
            and articles for my blog.
          </p>
          <p>
            Cats <strong>&gt;</strong> Dogs, that's the truth.
          </p>
        </span>
      </div>
    </div>
  );
}
