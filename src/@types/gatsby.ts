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
    twitterHandle: string;
    youtube: string;
    devto: string;
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

export type Section = "blog" | "youtube" | "about";
