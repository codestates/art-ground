import React from 'react';
import styles from './GalleryContent.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const GalleryContent = ({ isLogin }) => {

  // 랜더링 해야할 데이터: 썸네일, 타이틀, 전시시작일, 전시마감일, (로그인 했다면) 전시회를 좋아요 했는지 안 했는지

  const [isLiked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!isLiked)
  }
  //if(isLogin){ // 좋아요를 했는지 안했는지에 따라서 하트 다르게 랜더링. 좋아요 클릭시 좋아요/좋아요 해제 가능
  return(
    <>
      <li className={styles.object}>
        <Link to='/gallerydetail'>
          <div className={styles.layer}></div>
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
          <div className={styles.layer}></div>
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
  // } else{ // 좋아요 default 회색하트 랜더링. 클릭 시 로그인해주세요 모달창 띄우기

  // }
}

export default GalleryContent;