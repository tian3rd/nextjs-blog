import styles from "./layout.module.css";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Image from "next/image";

const name = "Tian";
export const siteTitle = "Day day up";

// add home in Layout({})
export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        {/* link tag */}
        <link rel="icon" href="/favicon.io" />
        {/* meta og:image? meta tags (like og:image), which are used to describe a page's content*/}
        <meta
          property="og:image"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        {/* what about this twitter meta? */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* header: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header */}
      <header className={styles.header}>
        {home ? (
          <>
            {/* what is priority? https://nextjs.org/docs/api-reference/next/image#priority */}
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/"> ← Back to home </Link>
        </div>
      )}
    </div>
  );
}
