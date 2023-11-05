import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { getSortedTipsData } from "../lib/tips";

// By returning allPostsData inside the props object in getStaticProps, the blog posts will be passed to the Home component as a prop.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allTipsData = getSortedTipsData();
  return {
    props: {
      allPostsData,
      allTipsData,
    },
  };
}

export default function Home({ allPostsData, allTipsData }) {
  return (
    <Layout home>
      <Head>
        <title> {siteTitle} </title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          ☝️ is my lovely Cosie, a one-year-old german shephard dog. He shares
          the love of hiking 🥾 with me and he now lies quietly under the
          standing table while I am coding. We are building something that we
          will feel proud of. Just sit back and check out now and then, I
          promise it'll be fun.
        </p>
        <p></p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              {/* use small tag */}
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Tips & Tricks</h2>
        <ul className={utilStyles.list}>
          {allTipsData.map(({ id, title, update }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/tips/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={update} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
