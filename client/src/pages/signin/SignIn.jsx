import styles from "./SignIn.module.css";
import React from "react";
import { useHistory } from "react-router-dom";

const SignIn = ({ setIsAuthorLogin, setIsAudienceLogin }) => {
  const history = useHistory();
  const audienceClicked = () => {
    setIsAuthorLogin(false);
    setIsAudienceLogin(true);
    history.push("/signin/detail");
  };

  const authorClicked = () => {
    setIsAuthorLogin(true);
    setIsAudienceLogin(false);
    history.push("/signin/detail");
  };

  return (
    <section className={styles.container}>
      <div className={styles.joinbox}>
        <button className={styles.btn} onClick={audienceClicked}>
          관람객 로그인
        </button>

        <button
          className={`${styles.btn} ${styles.second}`}
          onClick={authorClicked}
        >
          작가 로그인
        </button>
      </div>
    </section>
  );
};

export default SignIn;
