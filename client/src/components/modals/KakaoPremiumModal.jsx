import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

const KakaoPremiumModal = () => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <span className={styles.modalContent}>
          Premium 전시를 관람하려면<br></br>로그인이 필요합니다!
        </span>
        <p className={styles.modalSubContent}>
          로그인 페이지로 이동하시겠어요?
        </p>
        <div className={styles.ok}>
          <Link to="/signin">
            <button className={styles.okBtn}>네</button>
          </Link>
          <Link to="/">
            <button className={styles.okBtn}>아니요</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default KakaoPremiumModal;