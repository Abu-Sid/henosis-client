import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/ui/Layout";
import store from "../redux/store";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
