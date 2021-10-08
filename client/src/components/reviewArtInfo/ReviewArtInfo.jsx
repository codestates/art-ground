import React from 'react';
import { useHistory } from 'react-router';
import styles from './ReviewArtInfo.module.css';

const ReviewArtInfo = ({
  isLogin, 
  reviewSelected, 
  thumbnail, 
  handleModalPremium,
  }) => {

  const history = useHistory();

  const goGalleryDetailPage = () => {
    if(!isLogin && reviewSelected.exhibit_type === 2){
      handleModalPremium();
    } else{
      history.push(`/gallerydetail/${reviewSelected.id}`);
    } 
  }

  return (
    <div className={styles.artDetail}>
        
      <div className={styles.imgBox}>
        <img className={styles.thumbnail} src={thumbnail} alt="thumbnail"/>
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
              {reviewSelected.genre_hashtags.map(el=> <span key={el} className={styles.tag}>{el}</span>)}
            </div>
          </div>  
        </div>
        <div className={styles.buttonWrap}>
        {reviewSelected.status === 2 
        ? <span className={styles.exClosed} >종료된 전시입니다</span> 
        : <span className={styles.button} onClick={goGalleryDetailPage}>전시 감상하러 가기</span>}
        </div>
      </div>
    </div>
  )
}

export default ReviewArtInfo;