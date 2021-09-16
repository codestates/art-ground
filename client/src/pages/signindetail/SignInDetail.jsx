import styles from "./SignInDetail.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const SignInDetail = ({
  isAuthorLogin,
  isAudienceLogin,
  handleResponseSuccess,
}) => {
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    user_email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const checkEmail = (asValue) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };

  const { user_email, password } = loginInfo;
  const clickAudLogin = () => {
    if (!user_email || !password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요");
    }

    if (!checkEmail(user_email)) {
      setErrorMessage("이메일 형식을 맞춰주세요");
      return false;
    }

    setErrorMessage("");
    // axios
    //   .post("/sign-in", loginInfo)
    //   .then((result) => {});
    handleResponseSuccess();
    // history.push("/landing");
  };
  const clickAuthLogin = () => {
    if (!user_email || !password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요");
    } else {
      setErrorMessage("");
      // axios
      //   .post("http://www.art-ground.net/sign-in", loginInfo)
      //   .then((result) => {});
      handleResponseSuccess();
      // history.push("/");
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
    }
  };

  const [passOpen, setPassOpen] = useState(false);
  const clickEye = () => {
    setPassOpen(!passOpen);
  };

  const goToGoogle = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/signin/google&client_id=712078359002-ms5bo3h03tenocjb8sib9mdq6q46jdet.apps.googleusercontent.com";
  };

  return (
    <section className={styles.container}>
      <div className={styles.loginBox}>
        <form onSubmit={(e) => e.preventDefault()}>
          <ul className={styles.inputbox}>
            <li className={styles.title}>로그인</li>

            <li className={styles.info}>
              <img src="../../../images/required.png" alt="" />
              <span className={styles.infoText}>이메일</span>
            </li>
            <li className={styles.input}>
              <input
                type="text"
                placeholder="email 입력해주세요"
                onChange={handleInputValue("user_email")}
              />
            </li>
            <li className={styles.info}>
              <img src="../../../images/required.png" alt="" />
              <span className={styles.infoText}>비밀번호</span>
            </li>

            <li className={styles.passinput}>
              {!passOpen ? (
                <input
                  type="password"
                  placeholder="비밀번호는 4-12자의 영문과숫자만 가능합니다."
                  onChange={handleInputValue("password")}
                  className={styles.passborder}
                />
              ) : (
                <input
                  type="text"
                  placeholder="비밀번호는 4-12자의 영문과숫자만 가능합니다."
                  onChange={handleInputValue("password")}
                  className={styles.passborder}
                />
              )}
              <div className={styles.visibility} onClick={clickEye}>
                {!passOpen ? (
                  <img
                    src="https://user-images.githubusercontent.com/80307779/133570708-c6628e88-1f9c-41f8-8f96-1338e9d79a53.png"
                    alt=""
                    className={styles.eyeimg}
                  />
                ) : (
                  <img
                    src="https://user-images.githubusercontent.com/80307779/133570716-32070dec-2879-4bb2-8103-bf8886e433fe.png"
                    alt=""
                    className={styles.eyeimg}
                  />
                )}
              </div>
            </li>

            {/* <li className={styles.input}>
              <input
                type="password"
                placeholder="password 입력해주세요"
                onChange={handleInputValue("password")}
              ></input>
            </li> */}

            {errorMessage ? (
              <li className={`${styles.input} ${styles.errmsg}`}>
                {errorMessage}
              </li>
            ) : null}
            {isAudienceLogin ? (
              <>
                <li className={styles.loginBtns}>
                  <button
                    className={styles.loginbtn}
                    onClick={clickAudLogin}
                    onKeyPress={onKeyPress}
                  >
                    관람객 로그인하기
                  </button>
                </li>
                <li className={styles.oauthBox}>
                  <button className={styles.oauthBtn1} onClick={goToGoogle}>
                    <img
                      src="https://user-images.githubusercontent.com/80307779/133566129-82f293e5-b9ac-4d1d-88db-ebaca10ceebc.png"
                      alt="google"
                      className={styles.google}
                    ></img>

                    <span style={{ "margin-left": "10px" }}>구글 로그인</span>
                  </button>
                  <Link to="/signin/kakao">
                    <button className={styles.oauthBtn2}>
                      <img
                        src="https://user-images.githubusercontent.com/80307779/133569270-cfffa7b1-7fa3-4a68-989e-5acddaf5c9c9.png"
                        alt="kakao"
                        className={styles.kakao}
                      />
                      <span>카카오톡 로그인</span>
                    </button>
                  </Link>
                </li>
              </>
            ) : null}
            {isAuthorLogin ? (
              <li className={styles.loginBtns}>
                <button
                  className={styles.loginbtn}
                  onClick={clickAuthLogin}
                  onKeyPress={onKeyPress}
                >
                  작가 로그인하기
                </button>
              </li>
            ) : null}
          </ul>
        </form>
      </div>
    </section>
  );
};

export default SignInDetail;
