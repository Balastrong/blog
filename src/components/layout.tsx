import * as React from "react";
import { Header } from "components/Header";
import { Section } from "types/gatsby";

const Layout = ({
  section,
  title,
  children,
}: {
  section?: Section;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="global-wrapper">
      <Header section={section} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
