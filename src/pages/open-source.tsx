import { Layout, RepositoryCard, Seo } from "components";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { RepositoryFrontmatter } from "types/gatsby";

const OpenSource = () => {
  const {
    allMarkdownRemark: { nodes: repositories },
  } = useStaticQuery<{
    allMarkdownRemark: {
      nodes: {
        frontmatter: RepositoryFrontmatter;
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
            owner
            description
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
        <div className="Main_listSectionSubtitle">
          Some projects I contributed to
        </div>
        <div className="Main_listContainer">
          {repositories.map(repository => (
            <RepositoryCard repository={repository.frontmatter} />
          ))}
        </div>
      </section>
      <section className="Main_listSection">
        <h2 className="Shades_green">Personal Projects</h2>
        <div className="Main_listSectionSubtitle">
          Some projects I own or maintain
        </div>
        <div className="Main_listContainer">blabla</div>
      </section>
    </Layout>
  );
};

export default OpenSource;

export const Head = () => <Seo title="Open Source" />;
