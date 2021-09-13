import styles from "./SignIn.module.css";
import React from "react";
import { Link } from "react-router-dom";

const SignIn = ({ setIsAuthorLogin, setIsAudienceLogin }) => {
  const audienceClicked = () => {
    setIsAuthorLogin(false);
    setIsAudienceLogin(true);
  };

  const authorClicked = () => {
    setIsAuthorLogin(true);
    setIsAudienceLogin(false);
  };
  return (
    <section className={styles.container}>
      <div className={styles.joinbox}>
        <Link to="/signin/detail">
          <button className={styles.btn} onClick={audienceClicked}>
            관람객 로그인
          </button>
        </Link>
        <Link to="/signin/detail">
          <button
            className={`${styles.btn} ${styles.second}`}
            onClick={authorClicked}
          >
            작가 로그인
          </button>
        </Link>
        <div className={styles.oauthBox}>
          <span className={styles.oauthBtn1}>
            <img
              src="../../../images/googleicon.png"
              alt="google"
              className={styles.google}
            ></img>
          </span>
          <span className={styles.oauthBtn2}>
            <img
              src="../../../images/kakaoicon.jpg"
              alt="kakao"
              className={styles.kakao}
            ></img>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
