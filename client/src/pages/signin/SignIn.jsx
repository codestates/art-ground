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
      </div>
    </section>
  );
};

export default SignIn;
