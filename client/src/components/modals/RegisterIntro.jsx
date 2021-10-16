import React from 'react';
import styles from './RegisterIntro.module.css'

const RegisterIntro = ({ closeModal }) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <div className={styles.closeWrap} onClick={closeModal}>
          <img className={styles.closeIcon} 
          src="../../../images/closeIcon.png"
          alt="closeIcon"/>
        </div>
        <div className={styles.imgWrap}>
          <img className={styles.checkIcon}
          src="../../../images/checkboxIcon.png"
          alt="checkIcon"></img>
        </div>
        <span className={styles.modalContent}>전시 신청 전 확인해주세요!</span>
        <div className={styles.contentWrap}>
        <p className={styles.modalSubContent}>
          □  마이페이지에서 프로필 이미지와 <br></br>&nbsp;&nbsp;&nbsp;&nbsp;작가 소개를 꼭 등록해주세요.
        </p>
        <p className={styles.modalSubContent}>
          □  전시 신청 후 영업일 기준 3일 이내 <br></br>&nbsp;&nbsp;&nbsp;&nbsp;관리자의 승인이 이루어집니다.
          </p>
        </div>
      </div>
    </section>
  )
}

export default RegisterIntro;