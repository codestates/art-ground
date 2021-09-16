import styles from './SignUp.module.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import AWS from 'aws-sdk'

axios.defaults.withCredentials = true
const SignUp = ({ isAudienceJoined, isAuthorJoined }) => {
  const history = useHistory()

  const [audInfo, setAudInfo] = useState({
    userEmail: '',
    nickname: '',
    password: '',
    password2: ''
  })
  const [authInfo, setAuthInfo] = useState({
    authorEmail: '',
    name: '',
    password: '',
    password2: '',
    authorDesc: '',
    authorImg: null
  })
  const [passOpen, setPassOpen] = useState(false)
  const [passOpen2, setPassOpen2] = useState(false)
  const clickEye = () => {
    setPassOpen(!passOpen)
  }
  const clickEye2 = () => {
    setPassOpen2(!passOpen2)
  }

  const [errorMessage, setErrorMessage] = useState('')
  const checkPass = (asValue) => {
    const regExp = /^[a-zA-z0-9]{4,12}$/
    return regExp.test(asValue)
  }
  const checkEmail = (asValue) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    return regExp.test(asValue)
  }

  const clickAudJoin = () => {
    // 관람객회원가입버튼클릭시
    // 유효성검사
    const { userEmail, nickname, password, password2 } = audInfo
    if (!userEmail || !nickname || !password || !password2) {
      setErrorMessage('모든 항목을 입력해주세요')
      return false
    }
    if (password !== password2) {
      setErrorMessage('비밀번호를 확인해주세요')
      return false
    }
    if (!checkPass(password)) {
      setErrorMessage('비밀번호는 4-12자리의 숫자,영문입니다.')
      return false
    }
    if (!checkEmail(userEmail)) {
      setErrorMessage('이메일 형식을 맞춰주세요')
      return false
    }

    // 임시
    alert('가입이 완료되었씁니다')
    history.push('/')

    // axios 요청하기
    const userData = {
      userEmail,
      nickname,
      password
    }
    // axios.post(``, userData);
  }

  const clickAuthJoin = () => {
    // 작가회원가입버튼클릭시
    // 유효성검사
    const { authorEmail, name, password, password2, authorDesc, authorImg } =
      authInfo
    if (!authorEmail || !name || !password || !password2) {
      setErrorMessage('기본 정보는 모두 입력해야합니다')
      return false
    }
    if (password !== password2) {
      setErrorMessage('비밀번호를 확인해주세요')
      return false
    }
    if (!checkPass(password)) {
      setErrorMessage('비밀번호는 4-12자리의 숫자,영문입니다.')
      return false
    }
    if (!checkEmail(authorEmail)) {
      setErrorMessage('이메일 형식을 맞춰주세요')
      return false
    }

    // 임시
    alert('가입이 완료되었씁니다')
    history.push('/')

    // axios 요청하기
    const userData = {
      authorEmail,
      name,
      password,
      authorDesc,
      authorImg
    }
    // axios.post(``, userData);
  }

  AWS.config.update({
    region: 'ap-northeast-2',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:a17da5be-96ef-4046-aaa8-62455cef2362'
    })
  })

  const imgHandle = (event) => {}

  const audInputValue = (key) => (e) => {
    setAudInfo({
      ...audInfo,
      [key]: e.target.value
    })
  }
  const authInputValue = (key) => (e) => {
    setAuthInfo({
      ...authInfo,
      [key]: e.target.value
    })
  }

  return (
    <section className={styles.container}>
      {isAudienceJoined ? (
        <div className={styles.audiencBox}>
          <form onSubmit={(e) => e.preventDefault()}>
            <ul className={styles.inputbox}>
              <li className={styles.title}>관람객 회원가입</li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>이메일</span>
              </li>
              <li className={styles.input}>
                <input
                  type='text'
                  placeholder='이메일을 입력해주세요'
                  className={styles.email}
                  onChange={audInputValue('userEmail')}
                />
                <button className={styles.mailckBtn}>인증하기</button>
              </li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>닉네임</span>
              </li>
              <li className={styles.input}>
                <input
                  type='text'
                  placeholder='닉네임을 입력해주세요'
                  onChange={audInputValue('nickname')}
                />
              </li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>비밀번호</span>
              </li>
              <li className={styles.passinput}>
                {!passOpen ? (
                  <input
                    type='password'
                    placeholder='비밀번호는 4-12자의 영문과숫자만 가능합니다.'
                    onChange={audInputValue('password')}
                    className={styles.passborder}
                  />
                ) : (
                  <input
                    type='text'
                    placeholder='비밀번호는 4-12자의 영문과숫자만 가능합니다.'
                    onChange={audInputValue('password')}
                    className={styles.passborder}
                  />
                )}
                <div className={styles.visibility} onClick={clickEye}>
                  {!passOpen ? (
                    <img
                      src='../../../images/visibility.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  ) : (
                    <img
                      src='../../../images/visibility_off.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  )}
                </div>
              </li>

              <li className={styles.passinput}>
                {!passOpen2 ? (
                  <input
                    type='password'
                    placeholder='비밀번호를 한번더 입력해주세요'
                    onChange={audInputValue('password2')}
                    className={styles.passborder}
                  />
                ) : (
                  <input
                    type='text'
                    placeholder='비밀번호를 한번더 입력해주세요'
                    onChange={audInputValue('password2')}
                    className={styles.passborder}
                  />
                )}
                <div className={styles.visibility} onClick={clickEye2}>
                  {!passOpen2 ? (
                    <img
                      src='../../../images/visibility.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  ) : (
                    <img
                      src='../../../images/visibility_off.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  )}
                </div>
              </li>

              {errorMessage ? (
                <li className={styles.errmsg}>{errorMessage}</li>
              ) : null}

              <li className={styles.joinBtn}>
                <button className={styles.realJoin} onClick={clickAudJoin}>
                  가입하기
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : null}

      {isAuthorJoined ? (
        <div className={styles.authorBox}>
          <form onSubmit={(e) => e.preventDefault()}>
            <ul className={styles.inputbox}>
              <li className={styles.title}>작가 회원가입</li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>이메일</span>
              </li>
              <li className={styles.input}>
                <input
                  type='text'
                  placeholder='email입력해주세요'
                  className={styles.email}
                  onChange={authInputValue('authorEmail')}
                />
                <button className={styles.mailckBtn}>인증하기</button>
              </li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>닉네임</span>
              </li>
              <li className={styles.input}>
                <input
                  type='text'
                  placeholder='nickname 입력해주세요'
                  onChange={authInputValue('name')}
                />
              </li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>비밀번호</span>
              </li>

              <li className={styles.passinput}>
                {!passOpen ? (
                  <input
                    type='password'
                    placeholder='비밀번호는 4-12자의 영문과숫자만 가능합니다.'
                    onChange={authInputValue('password')}
                    className={styles.passborder}
                  />
                ) : (
                  <input
                    type='text'
                    placeholder='비밀번호는 4-12자의 영문과숫자만 가능합니다.'
                    onChange={authInputValue('password')}
                    className={styles.passborder}
                  />
                )}
                <div className={styles.visibility} onClick={clickEye}>
                  {!passOpen ? (
                    <img
                      src='../../../images/visibility.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  ) : (
                    <img
                      src='../../../images/visibility_off.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  )}
                </div>
              </li>

              <li className={styles.passinput}>
                {!passOpen2 ? (
                  <input
                    type='password'
                    placeholder='비밀번호를 한번더 입력해주세요'
                    onChange={authInputValue('password2')}
                    className={styles.passborder}
                  />
                ) : (
                  <input
                    type='text'
                    placeholder='비밀번호를 한번더 입력해주세요'
                    onChange={authInputValue('password2')}
                    className={styles.passborder}
                  />
                )}
                <div className={styles.visibility} onClick={clickEye2}>
                  {!passOpen2 ? (
                    <img
                      src='../../../images/visibility.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  ) : (
                    <img
                      src='../../../images/visibility_off.svg'
                      alt=''
                      className={styles.eyeimg}
                    />
                  )}
                </div>
              </li>

              {errorMessage ? (
                <li className={styles.errmsg}>{errorMessage}</li>
              ) : null}

              {/* 프로필사진 */}
              <li className={styles.info}>
                <span className={styles.noRequiredText}>프로필이미지</span>
              </li>

              <li className={styles.profileBox}>
                <label for='imgFile' className={styles.imgBorder}>
                  <img
                    className={styles.ProfileView}
                    // src={authorImg}
                    alt=''
                  />
                </label>
                <label className={styles.editbox} for='imgFile'>
                  <img
                    src='../../../images/camera.svg'
                    alt=''
                    className={styles.edit}
                    onChange={imgHandle}
                  />
                </label>
                <input
                  type='file'
                  id='imgFile'
                  accept='image/*'
                  className={styles.imgInput}
                />

                {/* <div className={styles.imgBox} />
              <input type="file" className={styles.addImg} /> */}
              </li>

              <li className={styles.info}>
                <span className={styles.noRequiredText}>작가소개</span>
              </li>
              <li className={styles.introInfoBox}>
                <textarea
                  placeholder='마이페이지에서 수정이 가능합니다.'
                  className={styles.introInfo}
                  onChange={authInputValue('authorDesc')}
                />
              </li>
              <li className={styles.joinBtn}>
                <button className={styles.realJoin2} onClick={clickAuthJoin}>
                  가입하기
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : null}
    </section>
  )
}

export default SignUp
