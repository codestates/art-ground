import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeDDetail from '../../components/3dDetail/ThreeDDetail';
import styles from './ThreeDGallery.module.css'


const ThreeDGallery = (props) => {

  const [modalOpen, setModalOpen] = useState(true);
  
  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <> 
      <ThreeDDetail modal={modalOpen}/>
      {modalOpen?
      <section className={styles.modalContainer}>
        <div className={styles.modalWrap}>
          <span className={styles.modalContent}>HOW TO</span>
          <p className={styles.modalSubContent}>마우스 위로 스크롤: 앞으로 이동<br></br>마우스 아래로 스크롤: 뒤로 이동</p>
          <p className={styles.modalSubContent}>마우스 드래그: 방향 회전</p>
          <div className={styles.ok}>
            <button className={styles.okBtn} 
            onClick={()=>setModalOpen(false)}
            >입장하기</button>
            <Link to="/gallerydetail">
              <button className={styles.okBtn}>나가기</button>
            </Link>
          </div>
        </div>
      </section>
      : null}
    </>
  );

}

export default ThreeDGallery;