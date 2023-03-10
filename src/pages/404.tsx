import { Layout, Seo } from "components";
import { graphql, Link } from "gatsby";
import * as React from "react";
import { SiteMetadata } from "types/gatsby";

const NotFoundPage = ({
  data: {
    site: { siteMetadata },
  },
}: {
  data: { site: { siteMetadata: SiteMetadata } };
}) => {
  const {
    social: { twitter, discord },
  } = siteMetadata;

  return (
    <Layout>
      <h1>404: Not Found</h1>
      <p>
        Looks like the page you were looking for does not exist, how did that
        happen? 🙃
      </p>
      <p>
        If you think that page should exist, please let me know (on{" "}
        <a href={twitter} target="_blank">
          Twitter
        </a>
        ?{" "}
        <a href={discord} target="_blank">
          Discord
        </a>
        ? a{" "}
        <a href="https://github.com/Balastrong/blog" target="_blank">
          GitHub issue
        </a>
        ? Even a flying carrier pigeon would do) and I'll fix it.
      </p>
      <p>
        In the meantime, you might want to get in safer places like the{" "}
        <Link to="/">homepage</Link>.
      </p>
    </Layout>
  );
};

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          twitter
          discord
        }
      }
    }
  }
`;
