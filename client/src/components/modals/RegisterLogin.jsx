import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

const RegisterLogin = ({goBack}) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <p className={styles.modalContent}>전시를 신청하려면<br></br>로그인이 필요합니다!</p>
        <span className={styles.modalSubContent}>로그인 페이지로 이동하시겠어요?</span>
        <div className={styles.ok}>
          <Link to="/signin">
            <button className={styles.okBtn}>네</button>
          </Link>
          <button className={styles.okBtn} onClick={goBack}>아니요</button>
          
        </div>
      </div>
    </section>
  )
}

export default RegisterLogin;