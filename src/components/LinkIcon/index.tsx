import React from "react";
import "./LinkIcon.scss";

export function LinkIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow"
      className="LinkIcon"
      aria-label={href}
    >
      {children}
    </a>
  );
}
