import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const history = useHistory();
  const clickLogo = () => {
    history.push("/");
  };
  return (
    <section className={styles.container}>
      <ul className={styles.btns}>
        <Link to="/signin">
          <li className={styles.btn}>로그인</li>
        </Link>
        <Link to="/join">
          <li className={styles.btn}>회원가입</li>
        </Link>
        <Link to="/mypage">
          <li className={styles.btn}>마이페이지</li>
        </Link>
      </ul>
      <div className={styles.logo}>
        <span className={styles.logoborder} onClick={clickLogo}>
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
