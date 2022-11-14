import { LinkIcon } from "components/LinkIcon";
import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { FaDev, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { GrTwitter, GrYoutube } from "react-icons/gr";
import { Section } from "types/gatsby";
import "./Header.scss";

export function Header({ section }: { section: Section | undefined }) {
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
    <header className="Header">
      <div className="Header_container">
        <div className="Header_left">
          <div className="Header_logo">
            <Link to="/">
              <StaticImage
                src="../../images/propic.jpg"
                alt="Logo"
                layout="fixed"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <nav className="Header_nav">
            <NavLink to="/" active={section === "blog"}>
              Blog
            </NavLink>
            <NavLink to="/youtube" active={section === "youtube"}>
              YouTube
            </NavLink>
            <NavLink to="/about" active={section === "about"}>
              About
            </NavLink>
          </nav>
        </div>
        <div className="Header_right">
          <LinkIcon href={youtube}>
            <FaYoutube size={35} style={{ color: "red" }} />
          </LinkIcon>
          <LinkIcon href={twitter}>
            <FaTwitter size={35} style={{ color: "#1DA1F2" }} />
          </LinkIcon>
          <LinkIcon href={devto}>
            <FaDev size={35} style={{ color: "black" }} />
          </LinkIcon>
          <LinkIcon href={linkedin}>
            <FaLinkedin size={35} style={{ color: "#0A66C2" }} />
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
    <div>
      <Link to={to} className={`NavLink ${active && "NavLink___active"}`}>
        {children}
      </Link>
    </div>
  );
};
