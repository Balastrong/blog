import { LinkIcon } from "components/LinkIcon";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { FaDev, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.scss";

export function Footer() {
  const {
    site: {
      siteMetadata: {
        social: { twitter, youtube, devto, linkedin },
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              twitter
              youtube
              devto
              linkedin
            }
          }
        }
      }
    `
  );

  return (
    <footer className="Footer">
      <div className="Footer_headline">
        <span>Let's stay in touch!</span>
      </div>
      <div className="Footer_buttons">
        <LinkIcon href={youtube}>
          <FaYoutube />
        </LinkIcon>
        <LinkIcon href={twitter}>
          <FaTwitter />
        </LinkIcon>
        <LinkIcon href={devto}>
          <FaDev />
        </LinkIcon>
        <LinkIcon href={linkedin}>
          <FaLinkedin />
        </LinkIcon>
      </div>
    </footer>
  );
}
