import React from 'react';
import Review from '../../components/review/Review';
import styles from './ReviewList.module.css';

const ReviewList = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.searchBox}>
        <input className={styles.search} placeholder="전시회 검색" type="text" />
        <button className={styles.searchIcon}>
          <i class="fas fa-search"></i>
        </button>
      </div>
      <ul className={styles.reviews}>
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </ul>
    </section>
  )
}
export default ReviewList;