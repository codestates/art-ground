import styles from './MyExhibit.module.css';

import React from 'react';

const MyExhibit = () => {
  return (
    <section className={styles.container}>
      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img
            src='../../../images/exhibit.webp'
            alt=''
            className={styles.eximg}
          />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.title}>문순려 사진전1</div>
          <div className={styles.date}>전시기간:10/16~12/30</div>
        </div>
      </div>
      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img
            src='../../../images/exhibit.webp'
            alt=''
            className={styles.eximg}
          />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.title}>문순려 사진전2</div>
          <div className={styles.date}>전시기간:10/16~12/30</div>
        </div>
      </div>
    </section>
  );
};

export default MyExhibit;
