import styles from './SignInDetail.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

axios.defaults.withCredentials = true;

const SignInDetail = ({
  isAuthorLogin,
  isAudienceLogin,
  handleResponseSuccess
}) => {
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    user_email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요');
    }

    if (!checkEmail(user_email)) {
      setErrorMessage('이메일 형식을 맞춰주세요');
      return false;
    }

    setErrorMessage('');
    // axios
    //   .post("/sign-in", loginInfo)
    //   .then((result) => {});
    handleResponseSuccess();
    history.push('/landing');
  };
  const clickAuthLogin = () => {
    if (!user_email || !password) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요');
    } else {
      setErrorMessage('');
      // axios
      //   .post("http://www.art-ground.net/sign-in", loginInfo)
      //   .then((result) => {});
      handleResponseSuccess();
      // history.push("/");
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
    }
  };

  const [passOpen, setPassOpen] = useState(false);
  const clickEye = () => {
    setPassOpen(!passOpen);
  };

  return (
    <section className={styles.container}>
      <div className={styles.loginBox}>
        <form onSubmit={(e) => e.preventDefault()}>
          <ul className={styles.inputbox}>
            <li className={styles.title}>로그인</li>

            <li className={styles.info}>
              <img src='../../../images/required.png' alt='' />
              <span className={styles.infoText}>이메일</span>
            </li>
            <li className={styles.input}>
              <input
                type='text'
                placeholder='email 입력해주세요'
                onChange={handleInputValue('user_email')}
              />
            </li>
            <li className={styles.info}>
              <img src='../../../images/required.png' alt='' />
              <span className={styles.infoText}>비밀번호</span>
            </li>

            <li className={styles.passinput}>
              {!passOpen
                ? (
                  <input
                    type='password'
                    placeholder='비밀번호는 4-12자의 영문과숫자만 가능합니다.'
                    onChange={handleInputValue('password')}
                    className={styles.passborder}
                  />
                  )
                : (
                  <input
                    type='text'
                    placeholder='비밀번호는 4-12자의 영문과숫자만 가능합니다.'
                    onChange={handleInputValue('password')}
                    className={styles.passborder}
                  />
                  )}
              <div className={styles.visibility} onClick={clickEye}>
                {!passOpen
                  ? (
                    <img
                      src='../../../images/visibility.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                    )
                  : (
                    <img
                      src='../../../images/visibility_off.svg'
                      alt=''
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

            {errorMessage
              ? (
                <li className={`${styles.input} ${styles.errmsg}`}>
                  {errorMessage}
                </li>
                )
              : null}
            {isAudienceLogin
              ? (
                <li className={styles.loginBtns}>
                  <button
                    className={styles.loginbtn}
                    onClick={clickAudLogin}
                    onKeyPress={onKeyPress}
                  >
                    관람객 로그인하기
                  </button>
                </li>
                )
              : null}
            {isAuthorLogin
              ? (
                <li className={styles.loginBtns}>
                  <button
                    className={styles.loginbtn}
                    onClick={clickAuthLogin}
                    onKeyPress={onKeyPress}
                  >
                    작가 로그인하기
                  </button>
                </li>
                )
              : null}
          </ul>
        </form>
      </div>
    </section>
  );
};

export default SignInDetail;
