import React from 'react';
import styles from './login.module.css'

const ClosedExhibition = ({ closeModal }) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <span className={styles.modalContent}>해당 전시는 마감되었습니다!</span>
        <p className={styles.modalSubContent}>다른 전시를 감상해주세요.</p>
        <div className={styles.ok}>
          <button className={styles.okBtn} 
          onClick={closeModal}>확인</button>
        </div>
      </div>
    </section>
  )
}

export default ClosedExhibition;