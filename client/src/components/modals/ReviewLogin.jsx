import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

const ReviewLogin = ({closeModal}) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
      <span className={styles.modalContent}>리뷰를 작성하려면<br></br>로그인이 필요합니다!</span>
        <p className={styles.modalSubContent}>로그인 페이지로 이동하시겠어요?</p>
        <div className={styles.ok}>
          <Link to="/signin">
            <button className={styles.okBtn}>네</button>
          </Link>
          <button className={styles.okBtn} 
          onClick={closeModal}
          >아니오</button>
          
        </div>
      </div>
    </section>
  )
}

export default ReviewLogin;