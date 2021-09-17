import React from 'react';
import styles from './Auction.module.css';

const Auction = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.icon}>
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div className={styles.content}>
        서비스 준비중입니다!
      </div>
      <div className={styles.subContent}>
        보다 나은 서비스 제공을 위해 페이지 준비중에 있습니다.
      </div>
      <div className={styles.subContent}>
        빠른 시일내에 준비하여 찾아뵙겠습니다.
      </div>
    </section>
  )
}

export default Auction;