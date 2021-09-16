import styles from './MyPick.module.css'

import React from 'react'

const MyPick = () => {
  return (
    <section className={styles.container}>
      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img
            src='../../../images/exhibit2.webp'
            alt=''
            className={styles.eximg}
          />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.title}>팰리스 드 도쿄 사진전</div>
          <div className={styles.date}>전시기간:10/16~12/30</div>
        </div>
      </div>

      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img
            src='https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134'
            alt=''
            className={styles.eximg}
          />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.date}>전시기간:10/16~12/30</div>
        </div>
      </div>

      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img
            src='../../../images/exhibit2.webp'
            alt=''
            className={styles.eximg}
          />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.title}>팰리스 드 도쿄 사진전1</div>
          <div className={styles.date}>전시기간:10/16~12/30</div>
        </div>
      </div>

      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img
            src='https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134'
            alt=''
            className={styles.eximg}
          />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.date}>전시기간:10/16~12/30</div>
        </div>
      </div>
    </section>
  )
}

export default MyPick
