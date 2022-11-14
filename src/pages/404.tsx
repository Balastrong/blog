import { Layout, Seo } from "components";
import { graphql } from "gatsby";
import * as React from "react";

const NotFoundPage = ({ data, location }: any) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
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
      }
    }
  }
`;
