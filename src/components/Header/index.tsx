import { LinkIcon } from "components/LinkIcon";
import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import {
  FaDev,
  FaDiscord,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Section } from "types/gatsby";
import "./Header.scss";

export function Header({ section }: { section: Section | undefined }) {
  const {
    site: {
      siteMetadata: {
        social: { twitter, youtube, devto, linkedin, discord },
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
              discord
            }
          }
        }
      }
    `
  );

  return (
    <header className="Header">
      <div className="Header_container">
        <div className="Header_left">
          <div className="Header_logo">
            <Link to="/">
              <StaticImage
                src="../../images/propic_blue.jpg"
                alt="Logo"
                layout="fixed"
                width={50}
                height={50}
                quality={100}
              />
            </Link>
          </div>
          <nav className="Header_nav">
            <NavLink to="/page/1" active={section === "blog"}>
              Blog
            </NavLink>
            <NavLink to="/youtube" active={section === "youtube"}>
              YouTube
            </NavLink>
            <NavLink to="/open-source" active={section === "opensource"}>
              Open Source
            </NavLink>
          </nav>
        </div>
        <div className="Header_right">
          <LinkIcon href={youtube}>
            <FaYoutube style={{ color: "red" }} />
          </LinkIcon>
          <LinkIcon href={twitter}>
            <FaTwitter style={{ color: "#1DA1F2" }} />
          </LinkIcon>
          <LinkIcon href={devto}>
            <FaDev style={{ color: "black" }} />
          </LinkIcon>
          <LinkIcon href={linkedin}>
            <FaLinkedin style={{ color: "#0A66C2" }} />
          </LinkIcon>
          <LinkIcon href={discord}>
            <FaDiscord style={{ color: "#7289DA" }} />
          </LinkIcon>
        </div>
      </div>
    </header>
  );
}

const NavLink = ({
  to,
  active,
  children,
}: {
  to: string;
  active?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="NavLink">
      <Link
        to={to}
        className={`NavLink_link ${active && "NavLink___active"}`}
        title={to}
        aria-label={to}
      >
        {children}
      </Link>
    </div>
  );
};
