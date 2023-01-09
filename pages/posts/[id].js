// tips for dynamic routes: https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

// How does params.id from getStaticProps({ params }) know the key is named id?
// The value from the file name
// getAllPostIds() => getStaticPaths() => getStaticProps({})
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    // paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js.
    paths,
    // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {/* article tag: */}
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {/* {postData.date} */}
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
