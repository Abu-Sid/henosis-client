import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/ui/Layout";
import store from "../redux/store";
import "../styles/main.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <div className='scroll-to-top'>
          <ScrollToTop smooth color='white' className='scroll-to-top__button' />
        </div>
      </Layout>
    </Provider>
  );
}

export default MyApp;
