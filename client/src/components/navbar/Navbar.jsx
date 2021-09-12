import React from "react";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <section className={styles.container}>
      <ul className={styles.btns}>
        <li className={styles.btn}>로그인</li>
        <li className={styles.btn}>회원가입</li>
        <li className={styles.btn}>마이페이지</li>
      </ul>
      <div className={styles.logo}>
        <span className={styles.logoborder}>
          ART-GROUND
          {/* <img src="" alt="" className={styles.img}></img> */}
        </span>
      </div>
      <div className={styles.category}>
        <ul className={styles.categoryBox}>
          <li className={styles.title}>ABOUT</li>
          <li className={styles.title}>GALLERY</li>
          <li className={styles.title}>REVIEW</li>
          <li className={styles.title}>EXHIBITION??</li>
          <li className={styles.title}>CONTACT</li>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
