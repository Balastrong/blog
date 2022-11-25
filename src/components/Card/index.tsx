import React from "react";
import "./Card.scss";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="Card">{children}</div>;
}
