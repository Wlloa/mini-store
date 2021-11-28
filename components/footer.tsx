import React from "react";
import styles from './Footer.module.css';
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://sleepy-lovelace-d6b11d.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Created by <strong>Wlloa</strong></span>
        <p>{new Date().getFullYear()}</p>
        {/* <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span> */}
      </a>
    </footer>
  );
};
