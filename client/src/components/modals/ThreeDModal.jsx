import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

const ThreeDModal = ({closeModal}) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <span className={styles.modalContent}>HOW TO</span>
        <p className={styles.modalSubContent}>마우스 위로 스크롤: 앞으로 이동<br></br>마우스 아래로 스크롤: 뒤로 이동</p>
        <p className={styles.modalSubContent}>마우스 드래그: 방향 회전</p>
        <div className={styles.ok}>
          <button className={styles.okBtn} 
          onClick={closeModal}
          >입장하기</button>
          <Link to="/gallerydetail">
            <button className={styles.okBtn}>나가기</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ThreeDModal;