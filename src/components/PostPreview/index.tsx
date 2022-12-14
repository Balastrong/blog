import { PostMeta } from "components";
import { Link } from "gatsby";
import React from "react";
import { Post } from "types/gatsby";
import "./PostPreview.scss";

export function PostPreview({ post }: { post: Post }) {
  const title = post.frontmatter.title || post.fields.slug;

  return (
    <article className="PostPreview">
      <header>
        <h3 className="PostPreview_title">
          <Link to={`/${post.fields.slug}`}>{title}</Link>
        </h3>
        <PostMeta post={post} />
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: post.frontmatter.description || post.excerpt,
          }}
        />
      </section>
      <Link to={post.fields.slug} className="PostPreview_button">
        Read more...
      </Link>
    </article>
  );
}
