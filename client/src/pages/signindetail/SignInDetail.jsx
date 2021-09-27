import styles from "./SignInDetail.module.css";
import React, { useState } from "react";
import axios from "axios";
import { getSigninRes } from "../../api/signApi";
const CryptoJS = require("crypto-js");
require("dotenv").config();

axios.defaults.withCredentials = true;

const SignInDetail = ({
  isAuthorLogin,
  isAudienceLogin,
  handleResponseSuccess,
  setisAdmin,
}) => {
  const [loginInfo, setLoginInfo] = useState({
    userEmail: "",
    password: "",
    userType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [passOpen, setPassOpen] = useState(false);
  const clickEye = () => {
    setPassOpen(!passOpen);
  };

  const visibility = !passOpen
    ? "https://user-images.githubusercontent.com/80307779/133570708-c6628e88-1f9c-41f8-8f96-1338e9d79a53.png"
    : "https://user-images.githubusercontent.com/80307779/133570716-32070dec-2879-4bb2-8103-bf8886e433fe.png";

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const checkEmail = (asValue) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };

  const { userEmail, password } = loginInfo;
  const secretKey = "Klassiker";
  const clickAudLogin = () => {
    if (!userEmail || !password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요");
    }

    if (!checkEmail(userEmail)) {
      setErrorMessage("이메일 형식을 맞춰주세요");
      return false;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      secretKey
    ).toString();

    const userData = {
      userEmail,
      password: encryptedPassword,
      userType: 1,
    };

    setErrorMessage("");
    getSigninRes(userData, handleResponseSuccess, setisAdmin);
  };
  const clickAuthLogin = () => {
    if (!userEmail || !password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요");
    }

    if (!checkEmail(userEmail)) {
      setErrorMessage("이메일 형식을 맞춰주세요");
      return false;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      secretKey
    ).toString();

    const userData = {
      userEmail,
      password: encryptedPassword,
      userType: 2,
    };
    setErrorMessage("");
    getSigninRes(userData, handleResponseSuccess);
  };

  const audonKeyPress = (e) => {
    if (e.key === "Enter") {
      clickAudLogin();
    }
  };

  const authonKeyPress = (e) => {
    if (e.key === "Enter") {
      clickAuthLogin();
    }
  };

  const clickGoole = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/signin/google&client_id=712078359002-ms5bo3h03tenocjb8sib9mdq6q46jdet.apps.googleusercontent.com";
  };

  const clickKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=a3d0f7feebf7fca1ad114ff7da1dddc5&redirect_uri=https://localhost:3000/signin/kakao&response_type=code`;
  };

  return (
    <section className={styles.container}>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className={styles.signupBox}>
          <ul className={styles.ulBox}>
            <li className={styles.titleBox}>로그인</li>

            <li className={styles.columnBox}>
              <span className={styles.imgBorder}>
                <img
                  src="../../../images/required.png"
                  alt=""
                  className={styles.icon}
                />
              </span>
              <label className={styles.columnText}>이메일</label>
            </li>
            <li className={styles.inputBox}>
              <div className={styles.mailBox}>
                <input
                  type="text"
                  className={styles.text}
                  placeholder="이메일을 입력해주세요"
                  onChange={handleInputValue("userEmail")}
                ></input>
              </div>
            </li>
            <li className={styles.columnBox}>
              <span className={styles.imgBorder}>
                <img
                  src="../../../images/required.png"
                  alt=""
                  className={styles.icon}
                />
              </span>
              <label className={styles.columnText}>비밀번호</label>
            </li>
            <li className={styles.inputBox}>
              <div className={styles.passBox}>
                {!passOpen ? (
                  <input
                    type="password"
                    className={styles.passText}
                    placeholder="비밀번호는 4-12자리의 숫자,영문입니다."
                    onChange={handleInputValue("password")}
                  ></input>
                ) : (
                  <input
                    type="text"
                    className={styles.passText}
                    placeholder="비밀번호는 4-12자리의 숫자,영문입니다."
                    onChange={handleInputValue("password")}
                  ></input>
                )}
                <span className={styles.eyeBorder}>
                  <img
                    src={visibility}
                    alt=""
                    className={styles.eyeimg}
                    onClick={clickEye}
                  />
                </span>
              </div>
            </li>

            <li>
              {errorMessage ? (
                <li className={styles.errmsg} style={{ color: "red" }}>
                  {errorMessage}
                </li>
              ) : null}
            </li>
            <li className={styles.btnBox}>
              {isAudienceLogin ? (
                <button
                  className={styles.joinBtn}
                  onClick={clickAudLogin}
                  onKeyPress={audonKeyPress}
                >
                  관람객 로그인
                </button>
              ) : (
                <button
                  className={styles.joinBtn}
                  onClick={clickAuthLogin}
                  onKeyPress={authonKeyPress}
                >
                  작가 로그인
                </button>
              )}
            </li>
            {isAudienceLogin ? (
              <li className={styles.btnBox}>
                <button className={styles.ouathBtn} onClick={clickGoole}>
                  구글 로그인
                </button>
                <button className={styles.ouathBtn} onClick={clickKakao}>
                  카카오 로그인
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
