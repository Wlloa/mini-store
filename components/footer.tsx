import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

export const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className={styles.footer}>
      <a
        href="https://sleepy-lovelace-d6b11d.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          {t("footer")} <strong>Wlloa</strong>
        </span>
        <p>{new Date().getFullYear()}</p>
        {/* <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span> */}
      </a>
    </footer>
  );
};
