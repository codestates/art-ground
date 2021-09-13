import styles from "./Modify.module.css";

import React from "react";

const Modify = () => {
  return (
    <section className={styles.container}>
      <div className={styles.imgBox}>
        <label for="imgFile" className={styles.imgBorder}>
          <img className={styles.ProfileView} src="" alt=""></img>
        </label>
        <input
          type="file"
          id="imgFile"
          accept="image/*"
          className={styles.imgInput}
        ></input>
      </div>
      <div className={styles.modiBox}>내정보 수정파트</div>
      <div className={styles.modiBox}>작가소개 수정파트</div>
    </section>
  );
};

export default Modify;
