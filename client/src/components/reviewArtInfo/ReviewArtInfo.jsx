import React from 'react';
import styles from './ReviewArtInfo.module.css';

const ReviewArtInfo = ({reviewSelected}) => {
  return (
    <div className={styles.artDetail}>
        
      <div className={styles.imgBox}>
        <img className={styles.thumbnail} src={reviewSelected.images[0].image_urls} alt="thumbnail"/>
      </div>

      <div className={styles.metaData}>
        <h2 className={styles.title}>{reviewSelected.title}</h2>
        <div className={styles.metaContent}>
          
          <div className={styles.list}>
            <span className={styles.listDetail}>작가:</span>
            <span className={styles.listDetail}>전시기간:</span>
            <span className={styles.listDetail}>카테고리:</span>
          </div>
          
          <div className={styles.content}>
            <span className={styles.listDetail}>{reviewSelected.author.nickname}</span>
            <span className={styles.listDetail}>{reviewSelected.start_date} ~ {reviewSelected.end_date}</span>
            <div className={styles.tagList}> 
              {JSON.parse(reviewSelected.genre_hashtags).map(el=> <span key={el} className={styles.tag}>{el}</span>)}
            </div>
          </div>  

        </div>
      </div>
    </div>
  )
}

export default ReviewArtInfo;