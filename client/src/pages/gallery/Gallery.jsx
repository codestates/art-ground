import React from 'react';
import { Link } from 'react-router-dom';
import SubNavBar from '../../components/subNavBar/SubNavBar';
import styles from './Gallery.module.css';

const Gallery = (props) => {
  return (
    <section className={styles.container}>
      {/* <div className={styles.subNavBar}>
        <span className={styles.subMenu}>STANDARD</span>
        <span className={styles.subMenu}>PREMIUM</span>
      </div> */}
      <SubNavBar />
      <ul className={styles.objectList}>
        <li className={styles.object}>
          <Link to='/gallerydetail'>
            <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          </Link>
          <div className={styles.titleAndLike}>
            <span className={styles.title}>데이비드 호크니展</span>
            <span className={styles.like}><i class="far fa-heart"></i></span>
          </div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <Link to='/gallerydetail'>
            <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          </Link>
          <div className={styles.titleAndLike}>
            <span className={styles.title}>데이비드 호크니展</span>
            <span className={styles.like}><i class="far fa-heart"></i></span>
          </div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <Link to='/gallerydetail'>
            <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          </Link>
          <div className={styles.titleAndLike}>
            <span className={styles.title}>데이비드 호크니展</span>
            <span className={styles.like}><i class="far fa-heart"></i></span>
          </div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        <li className={styles.object}>
          <Link to='/gallerydetail'>
            <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
          </Link>
          <div className={styles.titleAndLike}>
            <span className={styles.title}>데이비드 호크니展</span>
            <span className={styles.like}><i class="far fa-heart"></i></span>
          </div>
          <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        </li>
        {/* <Object /> */}
      </ul>

    </section>

  );
};

export default Gallery;
