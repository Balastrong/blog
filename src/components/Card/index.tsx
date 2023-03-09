import React from "react";
import "./Card.scss";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`Card${className ? " " + className : ""}`}>{children}</div>
  );
}
