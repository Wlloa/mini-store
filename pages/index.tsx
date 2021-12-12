import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Navbar } from "../components/navbar";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/footer";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Store</title>
        <meta name="description" content="personal store" />
        <link rel="icon" href="/shop.ico" />
      </Head>
      <main></main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req: req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  }

  return {
    props: { session: session },
  };
};

export default Home;
