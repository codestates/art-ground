import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

const GalleryModal = ({premiumBlocked, closeModal}) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        {premiumBlocked ? (
          <span className={styles.modalContent}>
            Premium 전시를 관람하려면<br></br>로그인이 필요합니다!
          </span>
        ) : (
          <span className={styles.modalContent}>
            전시회를 찜하려면<br></br>로그인이 필요합니다!
          </span>
        )}
        <p className={styles.modalSubContent}>
          로그인 페이지로 이동하시겠어요?
        </p>
        <div className={styles.ok}>
          <Link to="/signin">
            <button className={styles.okBtn}>네</button>
          </Link>
          <button className={styles.okBtn} onClick={closeModal}>
            아니요
          </button>
        </div>
      </div>
    </section>
  )
}

export default GalleryModal;