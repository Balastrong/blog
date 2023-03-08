import { Card, PostMeta } from "components";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { Post } from "types/gatsby";
import "./PostThumb.scss";

export function PostThumb({ post }: { post: Post }) {
  const title = post.frontmatter.title || post.fields.slug;
  const image = getImage(post.frontmatter.featuredImage);
  const url = `/${post.fields.slug}`;

  return (
    <Link to={url} className="PostThumb">
      <Card>
        <article className="PostThumb_content">
          {image && (
            <div className="PostThumb_image">
              <GatsbyImage
                image={image}
                alt={post.frontmatter.title}
                className="PostThumb_img"
              />
            </div>
          )}
          <h4 className="PostThumb_title">{title}</h4>
          <small>{post.frontmatter.date}</small>
        </article>
      </Card>
    </Link>
  );
}
