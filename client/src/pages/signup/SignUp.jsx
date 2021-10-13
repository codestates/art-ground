import styles from "./SignUp.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { getSingupAudRes, getSingupAuthRes } from "../../api/signApi";
const CryptoJS = require("crypto-js");
require("dotenv").config();

axios.defaults.withCredentials = true;
const SignUp = ({ isAudienceJoined }) => {
  const history = useHistory();

  const [audInfo, setAudInfo] = useState({
    userEmail: "",
    nickname: "",
    password: "",
    password2: "",
    userType: "",
  });

  const [passOpen, setPassOpen] = useState(false);
  const [passOpen2, setPassOpen2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const visibility = !passOpen
    ? "https://user-images.githubusercontent.com/80307779/133570708-c6628e88-1f9c-41f8-8f96-1338e9d79a53.png"
    : "https://user-images.githubusercontent.com/80307779/133570716-32070dec-2879-4bb2-8103-bf8886e433fe.png";
  const visibility2 = !passOpen2
    ? "https://user-images.githubusercontent.com/80307779/133570708-c6628e88-1f9c-41f8-8f96-1338e9d79a53.png"
    : "https://user-images.githubusercontent.com/80307779/133570716-32070dec-2879-4bb2-8103-bf8886e433fe.png";

  const clickEye = () => {
    setPassOpen(!passOpen);
  };
  const clickEye2 = () => {
    setPassOpen2(!passOpen2);
  };

  const checkPass = (asValue) => {
    const regExp = /^[a-zA-z0-9]{4,12}$/;
    return regExp.test(asValue);
  };
  const checkEmail = (asValue) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };

  const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;

  const clickAudJoin = () => {
    const { userEmail, nickname, password, password2 } = audInfo;
    if (!userEmail || !nickname || !password || !password2) {
      setErrorMessage("모든 항목을 입력해주세요");
      return false;
    }
    if (password !== password2) {
      setErrorMessage("비밀번호를 확인해주세요");
      return false;
    }
    if (!checkPass(password)) {
      setErrorMessage("비밀번호는 4-12자리의 숫자,영문입니다.");
      return false;
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
      nickname,
      password: encryptedPassword,
      userType: 1,
    };
    getSingupAudRes(userData, setErrorMessage, history);
  };

  const clickAuthJoin = () => {
    const { userEmail, nickname, password, password2 } = audInfo;
    if (!userEmail || !nickname || !password || !password2) {
      setErrorMessage("모든 항목을 입력해주세요");
      return false;
    }
    if (password !== password2) {
      setErrorMessage("비밀번호를 확인해주세요");
      return false;
    }
    if (!checkPass(password)) {
      setErrorMessage("비밀번호는 4-12자리의 숫자,영문입니다.");
      return false;
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
      authorEmail: userEmail,
      name: nickname,
      password: encryptedPassword,
      userType: 2,
    };
    getSingupAuthRes(userData, setErrorMessage, history);
  };

  const handleInputValue = (key) => (e) => {
    setAudInfo({
      ...audInfo,
      [key]: e.target.value,
    });
  };

  return (
    <section className={styles.container}>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className={styles.signupBox}>
          <ul className={styles.ulBox}>
            <li className={styles.titleBox}>회원가입</li>

            <li className={styles.inputBox}>
              <div className={styles.passBox}>
                <input
                  type="text"
                  className={styles.passText}
                  placeholder="이메일을 입력해주세요"
                  onChange={handleInputValue("userEmail")}
                ></input>
              </div>
            </li>

            <li className={styles.inputBox}>
              <div className={styles.passBox}>
                <input
                  type="text"
                  className={styles.passText}
                  placeholder="닉네임을 입력해주세요."
                  onChange={handleInputValue("nickname")}
                ></input>
              </div>
            </li>

            <li className={styles.inputBox}>
              <div className={styles.passBox}>
                {!passOpen ? (
                  <input
                    type="password"
                    className={styles.passText}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={handleInputValue("password")}
                  ></input>
                ) : (
                  <input
                    type="text"
                    className={styles.passText}
                    placeholder="비밀번호를 입력해주세요."
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
            <li className={styles.columnBox}>
              <label className={styles.columnText}>
                비밀번호는 4-12자리의 숫자,영문이어야 합니다.
              </label>
            </li>

            <li className={styles.inputBox}>
              <div className={styles.passBox}>
                {!passOpen2 ? (
                  <input
                    type="password"
                    className={styles.passText}
                    placeholder="비밀번호를 한번 더 입력해주세요"
                    onChange={handleInputValue("password2")}
                  ></input>
                ) : (
                  <input
                    type="text"
                    className={styles.passText}
                    placeholder="비밀번호를 한번 더 입력해주세요"
                    onChange={handleInputValue("password2")}
                  ></input>
                )}
                <span className={styles.eyeBorder}>
                  <img
                    src={visibility2}
                    alt=""
                    className={styles.eyeimg}
                    onClick={clickEye2}
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
              {isAudienceJoined ? (
                <button className={styles.joinBtn} onClick={clickAudJoin}>
                  관람객 가입하기
                </button>
              ) : (
                <button className={styles.joinBtn} onClick={clickAuthJoin}>
                  작가 가입하기
                </button>
              )}
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
