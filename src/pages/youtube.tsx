import { Layout, Seo } from "components";
import { StaticImage } from "gatsby-plugin-image";

import React, { useEffect } from "react";
import { siteMetadata } from "../../gatsby-config";

const YouTube = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = siteMetadata.social.youtube;
    }, 2000);
  }, []);

  return (
    <Layout section="youtube" title="YouTube">
      <StaticImage
        src="../images/youtube-meme.png"
        alt="YouTube"
        placeholder="blurred"
        layout="fullWidth"
      />
    </Layout>
  );
};

export default YouTube;

export const Head = () => <Seo title="YouTube" />;
