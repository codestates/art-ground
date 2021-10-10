import React from 'react';
import styles from './login.module.css'

const MobileBlocked = ({ goBack }) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <p className={styles.modalContent}>로그인 후 서비스 이용은<br></br>모바일 브라우저에서 불가합니다!</p>
        <span className={styles.modalSubContent}>웹 브라우저에서 로그인해주세요.</span>
        <div className={styles.ok}>
          <button className={styles.okBtn} onClick={goBack}>닫기</button>
        </div>
      </div>
    </section>
  )
}
export default MobileBlocked;