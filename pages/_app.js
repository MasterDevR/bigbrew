import Head from "next/head";
import { useRouter } from "next/router";
import React, { Suspense, useState, useEffect } from "react";
import "@/styles/globals.css";
import NavBar from "@/components/util/Nav_bar";
import Context from "@/components/store/context";
import IsLoading from "./isLoading";
import Admiv_nav from "@/components/util/admiv_nav";
export default function App({ Component, pageProps }) {
  const [isLogin, setLogin] = useState(false);
  const router = useRouter();

  const currentPath = router.asPath;
  const isAdminPage = currentPath.startsWith("/admin");
  useEffect(() => {
    const local = localStorage.getItem("isLogIn");
    if (local) {
      setLogin(true);
    }
  }, []);
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
            {!isLogin ? (
              <div className="admin_container">
                <div className="admin_container_wrapper">
                  <Admiv_nav />
                </div>
                <Component {...pageProps} />
              </div>
            ) : (
              <> </>
            )}
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
