import React from "react";
import { Seo, Layout } from "components";
import { Link } from "gatsby";
import { Post } from "types/gatsby";

const TagTemplate = ({
  pageContext: { tag, posts },
}: {
  pageContext: {
    tag: string;
    posts: Post[];
  };
}) => {
  const totalCount = posts.length;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  return (
    <Layout title={tag}>
      <Seo title={tag} />
      <h1>{tagHeader}</h1>
      <ul>
        {posts.map(post => {
          // TODO: Make it a proper post preview component, maybe reuse the one from the homepage
          return (
            <li key={post.id}>
              <Link to={`/${post.fields.slug}`}>{post.frontmatter.title}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default TagTemplate;
