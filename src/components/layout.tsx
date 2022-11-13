import * as React from "react";
import { Header } from "components/Header";

const Layout = ({ location, title, children }: any) => {
  return (
    <div className="global-wrapper">
      <Header />
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
