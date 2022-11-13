export type SiteMetadata = {
  title: string;
  author: {
    name: string;
    summary: string;
  };
  description: string;
  siteUrl: string;
  social: {
    twitter: string;
  };
};

export type Post = {
  id: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
  };
  fields: {
    slug: string;
  };
  excerpt: string;
  html: string;
};
