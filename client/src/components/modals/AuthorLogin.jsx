import React from 'react';
import styles from './login.module.css'

const AuthorLogin = ({goBack}) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <p className={styles.modalContent}>관람객 회원은<br></br>전시 신청이 불가합니다!</p>
        <span className={styles.modalSubContent}>작가 회원으로 로그인 해주세요.</span>
        <div className={styles.ok}>
          <button className={styles.okBtn} onClick={goBack}>닫기</button>
        </div>
      </div>
    </section>
  )
}
export default AuthorLogin;