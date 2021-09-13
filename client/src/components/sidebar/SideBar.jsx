import styles from './SideBar.module.css';

import React from 'react';

const SideBar = () => {
  return (
    <section className={styles.container}>
      <div className={styles.category}>내 정보보기</div>
      <div className={styles.category}>찜한 전시회</div>
      <div className={styles.category}>내 전시회</div>
      <div className={styles.category}>내가 참여한 경매</div>
    </section>
  );
};

export default SideBar;
