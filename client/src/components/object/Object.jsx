import React from 'react';
import styles from './Object.module.css';

const Object = (props) => {
  // const dummyData = {
  //   thumbnail: 'https://www.gallerycloud.co.kr/st-0003',
  //   title: '데이비드 호크니展',
  //   startDate: '2021-09-13',
  //   endDate: '2021-12-31',
  // }

  return (
    <li className={styles.object}>
      <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
      <div className={styles.title}>데이비드 호크니展</div>
      <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
    </li>
  );
};

export default Object;
