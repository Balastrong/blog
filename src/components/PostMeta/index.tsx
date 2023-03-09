import { TagList } from "components";
import React from "react";
import { Post } from "types/gatsby";
import "./PostMeta.scss";

export function PostMeta({ post }: { post: Post }) {
  return (
    <span className="PostMeta">
      {post.frontmatter.date}
      {post.frontmatter.tags && (
        <>
          <span>&#183;</span>
          <TagList tags={post.frontmatter.tags} />
        </>
      )}
    </span>
  );
}
