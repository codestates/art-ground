import styles from "./SignUp.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const CryptoJS = require("crypto-js");

axios.defaults.withCredentials = true;
const SignUp = ({ isAudienceJoined, isAuthorJoined }) => {
  const history = useHistory();

  const [audInfo, setAudInfo] = useState({
    userEmail: "",
    nickname: "",
    password: "",
    password2: "",
    userType: "",
  });
  console.log(audInfo);
  // const [authInfo, setAuthInfo] = useState({
  //   authorEmail: "",
  //   name: "",
  //   password: "",
  //   password2: "",
  //   userType: "",
  // });
  const [passOpen, setPassOpen] = useState(false);
  const [passOpen2, setPassOpen2] = useState(false);

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

  const [errorMessage, setErrorMessage] = useState("");
  const checkPass = (asValue) => {
    const regExp = /^[a-zA-z0-9]{4,12}$/;
    return regExp.test(asValue);
  };
  const checkEmail = (asValue) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };

  const secretKey = "Klassiker";
  const clickAudJoin = () => {
    // 관람객회원가입버튼클릭시
    // 유효성검사
    const { userEmail, nickname, password, password2, userType } = audInfo;
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

    // 임시
    // alert("가입이 완료되었습니다");
    // history.push("/");

    const encryptedPassword = CryptoJS.AES.encrypt(
      JSON.stringify(password),

      secretKey
    ).toString();

    // axios 요청하기
    const userData = {
      userEmail,
      nickname,
      password: encryptedPassword,
      userType: 1,
    };

    axios
      // .post("https://localhost:5000/sign-up/user", userData)
      // .post("https://art-ground.link/sign-up/user", userData)
      .post("https://localhost:5000/sign-up/user", userData)
      .then((result) => {
        if (result.data.message === "sign-up ok") {
          console.log(result, "-----관람객요청");
          history.push("/about");
        }
      })
      .cathch((err) => {
        setErrorMessage("이미 존재하는 사용자입니다.");
      });
  };

  const clickAuthJoin = () => {
    // 작가회원가입버튼클릭시
    // 유효성검사
    const { userEmail, nickname, password, password2, userType } = audInfo;
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

    // axios 요청하기
    const userData = {
      authorEmail: userEmail,
      name: nickname,
      password: encryptedPassword,
      userType: 2,
    };
    axios
      .post("https://localhost:5000/sign-up/author", userData)
      .then((result) => {
        console.log(result, "-----작가요청");
        //history.push("/about");
      });
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
              <button className={styles.confirm}>인증하기</button>
            </li>

            <li className={styles.columnBox}>
              <span className={styles.imgBorder}>
                <img
                  src="../../../images/required.png"
                  alt=""
                  className={styles.icon}
                />
              </span>
              <label className={styles.columnText}>닉네임</label>
            </li>
            <li className={styles.inputBox}>
              <div className={styles.nickBox}>
                <input
                  type="text"
                  className={styles.text}
                  placeholder="닉네임을 입력해주세요"
                  onChange={handleInputValue("nickname")}
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
            <li className={styles.columnBox}>
              <span className={styles.imgBorder}>
                <img
                  src="../../../images/required.png"
                  alt=""
                  className={styles.icon}
                />
              </span>
              <label className={styles.columnText}>비밀번호 확인</label>
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
