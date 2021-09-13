import styles from "./MyPage.module.css";

import React from "react";

const MyPage = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.side}>사이드바컴포넌트</div>
      <div className={styles.content}>내용</div>
    </section>
  );
};

export default MyPage;
