import React from "react";
import styles from "./styles.module.scss";

const FooterLayout = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerDetail}>
        <div>
          Copyright © {year} <b>Food shop</b> All rights reserved.
        </div>
        <div>Term & Conditions | Privacy & Policy</div>
      </div>
    </div>
  );
};

export default FooterLayout;
