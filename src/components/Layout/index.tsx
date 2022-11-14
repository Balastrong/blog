import { Footer, Header } from "components";
import * as React from "react";
import { Section } from "types/gatsby";
import "./Layout.scss";

export function Layout({
  section,
  title,
  children,
}: {
  section?: Section;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="Layout">
      <Header section={section} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
