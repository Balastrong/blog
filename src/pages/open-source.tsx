import { Layout, RepositoryCard, Seo } from "components";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { RepositoryFrontmatter } from "types/gatsby";

const OpenSource = () => {
  const {
    contributing: { nodes: contributingRepositories },
    maintaining: { nodes: maintainingRepositories },
  } = useStaticQuery<{
    contributing: {
      nodes: {
        frontmatter: RepositoryFrontmatter;
      }[];
    };
    maintaining: {
      nodes: {
        frontmatter: RepositoryFrontmatter;
      }[];
    };
  }>(graphql`
    {
      contributing: allMarkdownRemark(
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
      maintaining: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/maintaining/" } }
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
          {contributingRepositories.map(repository => (
            <RepositoryCard repository={repository.frontmatter} />
          ))}
        </div>
      </section>
      <section className="Main_listSection">
        <h2 className="Shades_green">Personal Projects</h2>
        <div className="Main_listSectionSubtitle">
          Some projects I own or maintain
        </div>
        <div className="Main_listContainer">
          {maintainingRepositories.map(repository => (
            <RepositoryCard repository={repository.frontmatter} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default OpenSource;

export const Head = () => <Seo title="Open Source" />;
