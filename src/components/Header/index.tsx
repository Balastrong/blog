import { Section } from "types/gatsby";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import "./Header.scss";
import { StaticImage } from "gatsby-plugin-image";
import { GrYoutube, GrTwitter } from "react-icons/gr";
import { FaDev } from "react-icons/fa";

export const Header = ({ section }: { section: Section | undefined }) => {
  const {
    site: {
      siteMetadata: {
        social: { twitter, youtube, devto },
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
            }
          }
        }
      }
    `
  );

  return (
    <header className="Header">
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
        <SocialIcon href={youtube}>
          <GrYoutube size={35} style={{ color: "red" }} />
        </SocialIcon>
        <SocialIcon href={twitter}>
          <GrTwitter size={35} style={{ color: "#1DA1F2" }} />
        </SocialIcon>
        <SocialIcon href={devto}>
          <FaDev size={35} style={{ color: "black" }} />
        </SocialIcon>
      </div>
    </header>
  );
};

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

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a href={href} target="_blank" rel="nofollow" className="SocialIcon">
      {children}
    </a>
  );
};
