import styles from './SignUp.module.css';

import React from 'react';

const SignUp = ({ isAudienceJoined, isAuthorJoined }) => {
  return (
    <section className={styles.container}>
      {isAudienceJoined
        ? (
          <div className={styles.audiencBox}>
            <ul className={styles.inputbox}>
              <li className={styles.title}>관람객 회원가입</li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>이메일</span>
              </li>
              <li className={styles.input}>
                <input
                  type='text'
                  placeholder='email입력해주세요'
                  className={styles.email}
                />
                <button className={styles.mailckBtn}>인증하기</button>
              </li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>닉네임</span>
              </li>
              <li className={styles.input}>
                <input type='text' placeholder='nickname 입력해주세요' />
              </li>
              <li className={styles.info}>
                <img src='../../../images/required.png' alt='' />
                <span className={styles.infoText}>비밀번호</span>
              </li>
              <li className={styles.input}>
                <input type='text' placeholder='password 입력해주세요' />
              </li>
              <li className={styles.input}>
                <input type='text' placeholder='password 확인해주세요' />
              </li>
              <li className={styles.input}>유효성검사none</li>
              <li className={styles.joinBtn}>
                <button className={styles.realJoin}>가입하기</button>
              </li>
            </ul>
          </div>
          )
        : null}
      {isAuthorJoined ? (
        <div className={styles.authorBox}>
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
              />
              <button className={styles.mailckBtn}>인증하기</button>
            </li>
            <li className={styles.info}>
              <img src='../../../images/required.png' alt='' />
              <span className={styles.infoText}>닉네임</span>
            </li>
            <li className={styles.input}>
              <input type='text' placeholder='nickname 입력해주세요' />
            </li>
            <li className={styles.info}>
              <img src='../../../images/required.png' alt='' />
              <span className={styles.infoText}>비밀번호</span>
            </li>
            <li className={styles.input}>
              <input type='text' placeholder='password 입력해주세요' />
            </li>
            <li className={styles.input}>
              <input type='text' placeholder='password 확인해주세요' />
            </li>
            <li className={styles.input}>유효성검사none</li>
            {/* 프로필사진 */}
            <li className={styles.info}>
              <span className={styles.noRequiredText}>프로필이미지</span>
            </li>
            <li className={styles.profileBox}>
              <div className={styles.imgBox} />
              <input type='file' className={styles.addImg} />
            </li>
            {/* 작가소개 */}
            <li className={styles.info}>
              <span className={styles.noRequiredText}>작가소개</span>
            </li>
            <li className={styles.introInfoBox}>
              <textarea
                placeholder='마이페이지에서 수정이 가능합니다.'
                className={styles.introInfo}
              />
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
