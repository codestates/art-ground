import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Review.module.css';

const Review = (props) => {
  return(
    <>
      <li className={styles.container}>
        <div className={styles.imgBox}>
          <Link to='/reviewdetail'>
            <img className={styles.thumbnail} src="http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg" alt="thumbnail"/>
          </Link>
        </div>
        <div className={styles.metaData}>
          <div>
            <span className={styles.title}>데이비드 호크니展</span>
            <span className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</span>
          </div>
          <div className={styles.titleAndBtn}>
            <span className={styles.reviewCount}>총 N개의 리뷰가 있어요</span>
            <div className={styles.btnWrap}>
              <Link to='/reviewdetail'>
                <button className={styles.reviewBtn}>리뷰 쓰러가기</button>
              </Link>
            </div>
          </div>
        </div>
      </li>
      <li className={styles.container}>
        <div className={styles.imgBox}>
          <Link to='/reviewdetail'>
            <img className={styles.thumbnail} src="https://images.velog.io/images/devjade/post/4f3086dd-2f8a-4f34-b0aa-cb5d7e8772d2/image.png" alt="thumbnail"/>
          </Link>
        </div>
        <div className={styles.metaData}>
          <div>
            <span className={styles.title}>데이비드 호크니展</span>
            <span className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</span>
          </div>
          <div className={styles.titleAndBtn}>
            <span className={styles.reviewCount}>총 N개의 리뷰가 있어요</span>
            <div className={styles.btnWrap}>
              <Link to='/reviewdetail'>
                <button className={styles.reviewBtn}>리뷰 쓰러가기</button>
              </Link>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default Review;