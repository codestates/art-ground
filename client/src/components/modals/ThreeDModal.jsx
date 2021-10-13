import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './login.module.css'

const ThreeDModal = ({ closeModal, threeDSelected}) => {

  const history = useHistory();

  const goDetailPage = () => { 
    history.goBack();
  }

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
          <button onClick={goDetailPage} className={styles.okBtn}>나가기</button>
        </div>
      </div>
    </section>
  )
}

export default ThreeDModal;