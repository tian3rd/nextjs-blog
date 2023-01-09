// can only import global css in _app.js not anywhere else
// Any styles imported in _app.js will be applied globally, to all pages of the application.
// Make sure you restart the development server when you update pages/_app.js.
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  // how does {Component, pageProps} work?
  return <Component {...pageProps} />;
}
