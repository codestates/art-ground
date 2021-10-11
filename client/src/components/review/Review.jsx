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

        {/* <Link to='/reviewdetail'> */}
          <div className={styles.imgBox}>
            <img className={styles.thumbnail} 
            onClick={goDetailPage}
            src={exhibition.images[0].image_urls} alt="thumbnail"/>
          </div>
        {/* </Link> */}

        <div className={styles.metaData}>
          <div>
            <span className={styles.title}>{exhibition.title}</span>
            <span className={styles.period}>전시 기간: {exhibition.start_date} ~ {exhibition.end_date}</span>
          </div>
          <div className={styles.titleAndBtn}>
            <span className={styles.reviewCount}>총 {exhibition.comments.length}개의 리뷰가 있어요</span>
            <div className={styles.btnWrap}>
            {/* <Link to='/reviewdetail'> */}
              <button className={styles.reviewBtn}
              onClick={goDetailPage}>리뷰 쓰러가기</button>
            {/* </Link> */}
            </div>
          </div>
        </div>

      </li>
   
  )
}

export default Review;