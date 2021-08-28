import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import Preloader from "../components/ui/Animation/Preloader";
import Layout from "../components/ui/Layout";
import store from "../redux/store";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  const router = useRouter();
  console.log(router.asPath);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <>
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      {!loading && router?.asPath && (
        <Provider store={store}>
          <Layout>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router?.asPath} />
            </AnimatePresence>
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
