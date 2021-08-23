import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/ui/Layout";
import store from "../redux/store";
import "../styles/main.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import { useState } from "react";
import { useRouter } from "next/router";
import Preloader from "../components/ui/Animation/Preloader";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  // const pageIsReady = useRouter().isReady;
  // console.log(router.isReady);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
            <div className='scroll-to-top'>
              <ScrollToTop
                smooth
                color='white'
                className='scroll-to-top__button'
              />
            </div>
          </Layout>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
