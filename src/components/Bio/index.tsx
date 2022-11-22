/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import classNames from "classnames";
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
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;

  return (
    <div className="Bio">
      <div className="Bio_image">
        <StaticImage
          className="Bio_avatar"
          layout="fixed"
          formats={["auto", "png"]}
          src="../../images/propic.jpg"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
      </div>
      {author?.name && (
        <div className="Bio_content">
          <strong>{author.name}</strong>
          <p>{author?.summary || null}</p>
        </div>
      )}
    </div>
  );
}
