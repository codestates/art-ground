import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

const PurchaseModal = ({closeModal}) => {
  return (
    <section className={styles.modalContainer}>
        <div className={styles.modalWrap}>
          <span className={styles.modalContent}>작품의 구매정보는<br></br>운영자에게 문의 부탁드립니다.</span>
          <p className={styles.modalSubContent}>CONTACT 페이지로<br></br>이동하시겠어요?</p>
          <div className={styles.ok}>
            <Link to="/contact">
              <button className={styles.okBtn} onClick={closeModal}>네</button>
            </Link>
            <button className={styles.okBtn} onClick={closeModal}>아니요</button>
          </div>
        </div>
      </section>
  )
}

export default PurchaseModal;