import Head from "next/head";
import React from "react";
import { Navbar, Footer } from ".";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>My Store</title>
      </Head>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Layout;
