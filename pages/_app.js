import Head from "next/head";
import { useRouter } from "next/router";
import React, { Suspense } from "react";
import "@/styles/globals.css";
import NavBar from "@/components/util/Nav_bar";
import Context from "@/components/store/context";
import IsLoading from "./isLoading";
import Admiv_nav from "@/components/util/admiv_nav";
export default function App({ Component, pageProps }) {
  const router = useRouter();

  const currentPath = router.asPath;
  const isAdminPage = currentPath.startsWith("/admin");

  return (
    <Context>
      <Suspense fallback={<IsLoading />}>
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
        </Head>
        {isAdminPage ? (
          <>
            <Head>
              <title>BIGBREW ( Admin)</title>
            </Head>
            <div className="admin_container">
              <Admiv_nav />
              <Component {...pageProps} />
            </div>
          </>
        ) : (
          <>
            <Head>
              <title>BIGBREW</title>
            </Head>
            <div className="Container">
              <NavBar />

              <Component {...pageProps} />
            </div>
          </>
        )}
      </Suspense>
    </Context>
  );
}
