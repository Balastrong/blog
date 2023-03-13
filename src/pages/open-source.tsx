import { Layout, Seo } from "components";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Repository } from "types/gatsby";

const OpenSource = () => {
  const {
    allMarkdownRemark: { nodes: repositories },
  } = useStaticQuery<{
    allMarkdownRemark: {
      nodes: {
        frontmatter: Repository;
      }[];
    };
  }>(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/contributing/" } }
        sort: { frontmatter: { name: ASC } }
      ) {
        nodes {
          frontmatter {
            name
            url
            mainLanguage
          }
        }
      }
    }
  `);

  return (
    <Layout section="opensource" className="">
      <section className="Main_listSection">
        <h2 className="Shades_blue">Contributions</h2>
        <small>Some projects I contributed to</small>
        <div className="Main_listContainer">
          {repositories.map(repository => (
            <div className="Main_listItem">
              <h3 className="Main_listItemTitle">
                <a
                  href={`https://github.com/${repository.frontmatter.url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {repository.frontmatter.name}
                </a>
              </h3>
            </div>
          ))}
        </div>
      </section>
      <section className="Main_listSection">
        <h2 className="Shades_green">Personal Projects</h2>
        <small>Some projects I contributed to</small>
        <div className="Main_listContainer">blabla</div>
      </section>
    </Layout>
  );
};

export default OpenSource;

export const Head = () => <Seo title="Open Source" />;
