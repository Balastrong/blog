import { Footer, Header } from "components";
import * as React from "react";
import { Section } from "types/gatsby";
import "./Layout.scss";

export function Layout({
  section,
  children,
  className,
}: {
  section?: Section;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="Layout">
      <Header section={section} />
      <main className={`Layout_main ${className ?? ""}`}>{children}</main>
      <Footer />
    </div>
  );
}
