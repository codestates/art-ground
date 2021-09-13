import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Object from '../../components/object/Object';
import styles from './Gallery.module.css';

const Gallery = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.subNavBar}>
        <span className={styles.subMenu}>STANDARD</span>
        <span className={styles.subMenu}>PREMIUM</span>
      </div>
      <ul className={styles.objectList}>
        <Link to='/artdetail'>
          <li className={styles.object}>
            <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
            <div className={styles.title}>데이비드 호크니展</div>
            <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
          </li>
        </Link>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          <div className={styles.title}>데이비드 호크니展</div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
      </ul>

    </section>

  );
};

export default Gallery;
