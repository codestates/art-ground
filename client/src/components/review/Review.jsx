import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Review.module.css';

const Review = ({ exhibition }) => {


  const history = useHistory();

  const goDetailPage = () => { 
    history.push(`/reviewdetail/${exhibition.id}`);
  }

  return(
   
      <li className={styles.container}>

        <div className={styles.imgBox}>
          <img className={styles.thumbnail} 
          onClick={goDetailPage}
          src={exhibition.images[0].image_urls} alt="thumbnail"/>
        </div>

        <div className={styles.metaData}>
          <div className={styles.contentWrap}>
            {exhibition.exhibit_type === 1 ? 
            <span className={styles.exhibitType}>Standard</span>
            : <span className={styles.exhibitType2}>Premium</span>}
            <span className={styles.title}>{exhibition.title}</span>
            <span className={styles.period}>전시 기간: {exhibition.start_date} ~ {exhibition.end_date}</span>
          </div>
          <div className={styles.titleAndBtn}>
            <span className={styles.reviewCount}>총 {exhibition.comments.length}개의 리뷰가 있어요</span>
            <div className={styles.btnWrap}>
              <button className={styles.reviewBtn}
              onClick={goDetailPage}>리뷰 쓰러가기</button>
            </div>
          </div>
        </div>

      </li>
   
  )
}

export default Review;