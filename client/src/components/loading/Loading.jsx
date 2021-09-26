import styles from "./Loading.module.css";

import React from "react";

const Loading = () => {
  return (
    <section className={styles.container}>
      <div className={styles.loader}>Loading...</div>
    </section>
  );
};

export default Loading;
