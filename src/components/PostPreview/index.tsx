import { PostMeta } from "components";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { Post } from "types/gatsby";
import "./PostPreview.scss";

export function PostPreview({ post }: { post: Post }) {
  const title = post.frontmatter.title || post.fields.slug;
  const image = getImage(post.frontmatter.featuredImage);
  const url = `/${post.fields.slug}`;

  return (
    <article className="PostPreview">
      <div className="PostPreview_card">
        <header className="PostPreview_header">
          {image && (
            <div className="PostPreview_image">
              <GatsbyImage
                image={image}
                alt={post.frontmatter.title}
                className="PostPreview_img"
              />
            </div>
          )}
          <div className="PostPreview_heading">
            <h3 className="PostPreview_title">
              <Link to={url}>{title}</Link>
            </h3>
            <PostMeta post={post} />
          </div>
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
      </div>
    </article>
  );
}
