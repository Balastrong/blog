import { PostPreview } from "components/PostPreview";
import React from "react";
import { Post } from "types/gatsby";
import "./PostPreviewList.scss";

export function PostPreviewList({ posts }: { posts: Post[] }) {
  return (
    <div className="PostPreviewList">
      <ol>
        {posts.map((post: Post, i) => {
          return (
            <li key={post.fields.slug}>
              <PostPreview post={post} />
              {i < posts.length - 1 && <hr />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
