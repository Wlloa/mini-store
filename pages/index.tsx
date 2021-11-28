import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Navbar } from "../components/navbar";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/footer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Store</title>
        <meta
          name="description"
          content="personal mini store template project"
        />
        <link rel="icon" href="/shop.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}></main>
      <Footer />
    </div>
  );
};

export default Home;
