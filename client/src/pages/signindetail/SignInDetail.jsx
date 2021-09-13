import styles from "./SignInDetail.module.css";

import React from "react";

const SignInDetail = ({ isAuthorLogin, isAudienceLogin }) => {
  return (
    <section className={styles.container}>
      <div className={styles.loginBox}>
        <ul className={styles.inputbox}>
          <li className={styles.title}>로그인</li>

          <li className={styles.info}>
            <img src="../../../images/required.png" alt=""></img>
            <span className={styles.infoText}>이메일</span>
          </li>
          <li className={styles.input}>
            <input type="text" placeholder="email 입력해주세요"></input>
          </li>

          <li className={styles.info}>
            <img src="../../../images/required.png" alt=""></img>
            <span className={styles.infoText}>비밀번호</span>
          </li>
          <li className={styles.input}>
            <input type="password" placeholder="password 입력해주세요"></input>
          </li>
          <li className={styles.input}>유효성검사none</li>
          {isAudienceLogin ? (
            <li className={styles.loginBtns}>
              <button className={styles.loginbtn}>관람객 로그인하기</button>
            </li>
          ) : null}
          {isAuthorLogin ? (
            <li className={styles.loginBtns}>
              <button className={styles.loginbtn}>작가 로그인하기</button>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
};

export default SignInDetail;
