import styles from "./SignUp.module.css";
import React, { useState } from "react";
import axios from "axios";
import crypto from "crypto-js";

const SignUp = ({ isAudienceJoined, isAuthorJoined }) => {
  const [userinfo, setUserInfo] = useState({
    user_email: "",
    nickname: "",
    password: "",
    password2: "",
  });

  const [errmsg, setErrMsg] = useState("");
  const { user_email, nickname, password, password2 } = userinfo;

  const handleInputValue = (key) => (e) => {
    setUserInfo({
      ...userinfo,
      [key]: e.target.value,
    });
  };

  //4-12자리의 숫자,영문입니다
  const checkPass = (asValue) => {
    var regExp = /^[a-zA-z0-9]{4,12}$/;
    return regExp.test(asValue);
  };

  const audJoin = () => {
    if (!user_email || !nickname || !password || !password2) {
      setErrMsg("모든항목을 입력해주세요");
      return false;
    }
    if (password !== password2) {
      setErrMsg("두 비밀번호가 같지 않습니다.");
      return false;
    }
    if (!checkPass(user_email)) {
      setErrMsg("아이디는 4-12자리의 숫자,영문입니다.");
      return false;
    }

    signUpAudRequest();
  };

  // 관람객회원가입 => axios 요청
  const signUpAudRequest = () => {
    axios
      .post(`http://www.art-ground.net/sign-up/user`, userinfo)
      .then((result) => {
        if (result.data.message === "sign-up ok") {
          //관람객 로그인모드로 바꾸기
        }
      });
  };

  return (
    <section className={styles.container}>
      {isAudienceJoined ? (
        <div className={styles.audiencBox}>
          <ul className={styles.inputbox}>
            <li className={styles.title}>관람객 회원가입</li>
            <li className={styles.info}>
              <img src="../../../images/required.png" alt=""></img>
              <span className={styles.infoText}>이메일</span>
            </li>
            <li className={styles.input}>
              <input
                type="text"
                placeholder="email입력해주세요"
                className={styles.email}
                onChange={handleInputValue("user_email")}
              ></input>
              <button className={styles.mailckBtn}>인증하기</button>
            </li>
            <li className={styles.info}>
              <img src="../../../images/required.png" alt=""></img>
              <span className={styles.infoText}>닉네임</span>
            </li>
            <li className={styles.input}>
              <input
                type="text"
                placeholder="nickname 입력해주세요"
                onChange={handleInputValue("nickname")}
              ></input>
            </li>
            <li className={styles.info}>
              <img src="../../../images/required.png" alt=""></img>
              <span className={styles.infoText}>비밀번호</span>
            </li>
            <li className={styles.input}>
              <input
                type="password"
                placeholder="password 입력해주세요"
                onChange={handleInputValue("password")}
              ></input>
            </li>
            <li className={styles.input}>
              <input
                type="password"
                placeholder="password 확인해주세요"
              ></input>
            </li>
            <li className={styles.input}>유효성검사none</li>
            <li className={styles.joinBtn}>
              <button className={styles.realJoin} onClick={audJoin}>
                가입하기
              </button>
            </li>
          </ul>
        </div>
      ) : null}
      {isAuthorJoined ? (
        <div className={styles.authorBox}>
          <ul className={styles.inputbox}>
            <li className={styles.title}>작가 회원가입</li>
            <li className={styles.info}>
              <img src="../../../images/required.png" alt=""></img>
              <span className={styles.infoText}>이메일</span>
            </li>
            <li className={styles.input}>
              <input
                type="text"
                placeholder="email입력해주세요"
                className={styles.email}
              ></input>
              <button className={styles.mailckBtn}>인증하기</button>
            </li>
            <li className={styles.info}>
              <img src="../../../images/required.png" alt=""></img>
              <span className={styles.infoText}>닉네임</span>
            </li>
            <li className={styles.input}>
              <input type="text" placeholder="nickname 입력해주세요"></input>
            </li>
            <li className={styles.info}>
              <img src="../../../images/required.png" alt=""></img>
              <span className={styles.infoText}>비밀번호</span>
            </li>
            <li className={styles.input}>
              <input type="text" placeholder="password 입력해주세요"></input>
            </li>
            <li className={styles.input}>
              <input type="text" placeholder="password 확인해주세요"></input>
            </li>
            <li className={styles.input}>유효성검사none</li>
            {/* 프로필사진 */}
            <li className={styles.info}>
              <span className={styles.noRequiredText}>프로필이미지</span>
            </li>
            <li className={styles.profileBox}>
              <div className={styles.imgBox}></div>
              <input type="file" className={styles.addImg}></input>
            </li>
            {/* 작가소개 */}
            <li className={styles.info}>
              <span className={styles.noRequiredText}>작가소개</span>
            </li>
            <li className={styles.introInfoBox}>
              <textarea
                placeholder="마이페이지에서 수정이 가능합니다."
                className={styles.introInfo}
              ></textarea>
            </li>
            <li className={styles.joinBtn}>
              <button className={styles.realJoin2}>가입하기</button>
            </li>
          </ul>
        </div>
      ) : null}
    </section>
  );
};

export default SignUp;
