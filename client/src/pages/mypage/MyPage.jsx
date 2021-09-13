import styles from "./MyPage.module.css";
import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import MyInfo from "../../components/myinfo/MyInfo";

const MyPage = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.side}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <MyInfo />
      </div>
    </section>
  );
};

export default MyPage;
