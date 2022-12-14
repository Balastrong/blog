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
    linkedin: string;
    discord: string;
  };
};

export type Post = {
  id: string;
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    slug?: string;
    tags?: string[];
  };
  fields: {
    slug: string;
  };
  excerpt: string;
  html: string;
};

export type Section = "blog" | "youtube" | "about";

export type PaginatedIndexContext = {
  currentPage: number;
  numPages: number;
  limit: number;
  skip: number;
};
