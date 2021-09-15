import React from 'react';
import styles from './GalleryContent.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const GalleryContent = (props) => {

  const [isLiked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!isLiked)
  }
  return(
    <>
      <li className={styles.object}>
        <Link to='/gallerydetail'>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
        </Link>
        <div className={styles.titleAndLike}>
          <span className={styles.title}>데이비드 호크니展</span>
          {isLiked ? 
          <span className={styles.like} onClick={handleLike}><i class="fas fa-heart"></i></span> : 
          <span className={styles.notlike} onClick={handleLike}><i class="far fa-heart"></i></span>}
        </div>
        <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
      </li>
      <li className={styles.object}>
        <Link to='/gallerydetail'>
          <img className={styles.thumbnail} src='https://images.velog.io/images/devjade/post/4f3086dd-2f8a-4f34-b0aa-cb5d7e8772d2/image.png' alt='thumbnail' />
        </Link>
        <div className={styles.titleAndLike}>
          <span className={styles.title}>데이비드 호크니展</span>
          {isLiked ? 
          <span className={styles.like} onClick={handleLike}><i class="fas fa-heart"></i></span> : 
          <span className={styles.notlike} onClick={handleLike}><i class="far fa-heart"></i></span>}
        </div>
        <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
      </li>
    </>
  )
}

export default GalleryContent;