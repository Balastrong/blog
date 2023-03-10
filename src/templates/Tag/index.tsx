import React from "react";
import { Seo, Layout, PostPreviewList } from "components";
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
    <Layout>
      <Seo title={tag} />
      <h1>{tagHeader}</h1>
      <PostPreviewList posts={posts} />
    </Layout>
  );
};

export default TagTemplate;
