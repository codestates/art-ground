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
            <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/signin&client_id=712078359002-ms5bo3h03tenocjb8sib9mdq6q46jdet.apps.googleusercontent.com">
              <img
                src="../../../images/googleicon.png"
                alt="google"
                className={styles.google}
              ></img>
            </a>
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
