// error page info: https://nextjs.org/docs/advanced-features/custom-error-page
import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout>
      <h1 className={utilStyles.lightText}> 404 - Page Not Found </h1>
    </Layout>
  );
}
