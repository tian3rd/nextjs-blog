import Layout from "../../components/layout";
import { getAllTipIds, getTipData } from "../../lib/tips";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  const tipData = await getTipData(params.id);
  return {
    props: {
      tipData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllTipIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Tip({ tipData }) {
  return (
    <Layout>
      <Head>
        <title>{tipData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{tipData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={tipData.update} />
        </div>
        <div className={utilStyles.tagText}>{tipData.tags}</div>
        <div dangerouslySetInnerHTML={{ __html: tipData.contentHtml }} />
      </article>
    </Layout>
  );
}
