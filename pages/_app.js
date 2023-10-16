import Head from "next/head";
import React, { Suspense } from "react";
import "@/styles/globals.css";
import NavBar from "@/components/util/Nav_bar";
import Context from "@/components/store/context";
import IsLoading from "./isLoading";
export default function App({ Component, pageProps }) {
  return (
    <Context>
      <div className="Container">
        <Head>
          <title>BIGBREW</title>
        </Head>
        <NavBar />
        <Suspense fallback={<IsLoading />}>
          <Component {...pageProps} />;
        </Suspense>
      </div>
    </Context>
  );
}
