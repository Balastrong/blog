import { Card, PostPreview } from "components";

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
              <Card>
                <PostPreview post={post} />
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
