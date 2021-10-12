import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

const ConfirmRegister = ({ closeModal }) => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <span className={styles.modalContent}>전시 신청이 완료되었습니다!</span>
        <p className={styles.modalSubContent}>영업일 기준 3일 이내<br></br>관리자의 승인이 이루어질 예정입니다.</p>
        <div className={styles.ok}>
        <Link to="/gallery">
          <button className={styles.okBtn} 
          onClick={closeModal}>확인</button>
        </Link>
        </div>
      </div>
    </section>
  )
}

export default ConfirmRegister;