import React from 'react';
import styles from './GalleryContent.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const GalleryContent = ({ isLogin, exhibition, gallerySelect, handleLikeLogin }) => {

  // 랜더링 해야할 데이터: 썸네일, 타이틀, 전시시작일, 전시마감일, (로그인 했다면) 전시회를 좋아요 했는지 안 했는지

  const [isLiked, setLiked] = useState(false);

  const handleLike = () => { //로그인 한 사람들에게만 작동. 좋아요/좋아요 해제 기능.
    setLiked(!isLiked)
  }
  
  if(isLogin){ // 로그인했다면? 좋아요를 했는지 안했는지에 따라서 하트 다르게 랜더링. 좋아요 클릭시 좋아요/좋아요 해제 가능
  return(
    <>
      <li className={styles.object}>
        <Link to='/gallerydetail'>
          <div className={styles.layer}
          //onClick={()=>gallerySelect(exhibition)}
          ></div>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
        </Link>
        {/* <div className={styles.titleAndLike}> */}
        <span className={styles.title}>데이비드 호크니展</span>
        {/* </div> */}
        <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        <div className={styles.likesMeta} onClick={handleLike}>
          {isLiked ? 
          <span className={styles.like}><i class="fas fa-heart"></i></span> : 
          <span className={styles.notlike}><i class="far fa-heart"></i></span>}
          <span className={styles.likesCount}>N</span>
        </div>
      </li>
    </>
  )
  } else{ // 로그인 안 했다면? 좋아요 default 회색하트 랜더링. 클릭 시 로그인해주세요 모달창 띄우기
    return (
      <li className={styles.object}>
        <Link to='/gallerydetail'>
          <div className={styles.layer}
          //onClick={()=>gallerySelect(exhibition)}
          ></div>
          <img className={styles.thumbnail} src='http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg' alt='thumbnail' />
        </Link>
        {/* <div className={styles.titleAndLike}> */}
        <span className={styles.title}>데이비드 호크니展</span>
        {/* </div> */}
        <div className={styles.period}>전시 기간: 2021-09-13 ~ 2021-12-31</div>
        <div className={styles.likesMeta} onClick={handleLikeLogin}>
          <span className={styles.notlike}><i class="far fa-heart"></i></span>
          <span className={styles.likesCount}>N</span>
        </div>
      </li>
    )
  }
}

export default GalleryContent;