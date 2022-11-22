import { Link } from "gatsby";
import React from "react";

export function Tag({ tag }: { tag: string }) {
  return (
    <Link to={`/tag/${tag}`} className="Tag">
      #{tag}
    </Link>
  );
}
