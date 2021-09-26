import React, { useEffect } from 'react';
import styles from './GalleryContent.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createLike, deleteLike } from '../../api/galleryApi';


const GalleryContent = ({ isLogin, userinfo, exhibition, selectGallery, handleModal, render }) => {
  
  const [isLiked, setLiked] = useState(false);
  
  useEffect(()=> {
    if(isLogin){
      const likeArr = exhibition.likes.filter(el => userinfo.id === el.user_id) 
      if(likeArr.length !==0){ //유저가 해당 gallerycontent컴포넌트를 좋아요 한 것일 때
        setLiked(true);
      } else{
        setLiked(false); //유저가 해당 gallerycontent컴포넌트를 좋아요 한 게 아닐 때
      }
      //console.log('단일 컴포넌트 useEffect', exhibition)
    }
  }) //의존성 배열 두면 안 됨.

  const handleLike = () => { //로그인 한 사람들에게만 작동. 
    if(isLiked){// 좋아요 해제
      deleteLike(exhibition.id);
      setLiked(false);
      render();
    } else{ //좋아요
      createLike(exhibition.id);
      setLiked(true);
      render();
    }
  }
  
  if(isLogin){ // 로그인했다면? 좋아요를 했는지 안했는지에 따라서 하트 다르게 랜더링. 좋아요 클릭시 좋아요/좋아요 해제 가능
    return(
      <li className={styles.object}>

        <Link to='/gallerydetail'>
          <div className={styles.layer}
          onClick={()=>selectGallery(exhibition)}
          ></div>
          <img className={styles.thumbnail} 
          onClick={()=>selectGallery(exhibition)}
          src={exhibition.images[0].image_urls} 
          alt='thumbnail' />
        </Link>

        <span className={styles.title}>{exhibition.title}</span>
        <div className={styles.period}>전시 기간: {exhibition.start_date} ~ {exhibition.end_date}</div>
        
        <div className={styles.likesMeta} onClick={handleLike}>
          {isLiked ? 
          <span className={styles.like}><i class="fas fa-heart"></i></span> : 
          <span className={styles.notlike}><i class="far fa-heart"></i></span>}
          <span className={styles.likesCount}>{exhibition.likes.length}</span>
        </div>

      </li>
    )
  } else{ // 로그인 안 했다면? 좋아요 default 회색하트 랜더링. 클릭 시 로그인해주세요 모달창 띄우기
    return (
      <li className={styles.object}>
        <Link to='/gallerydetail'>
          <div className={styles.layer}
          onClick={()=>selectGallery(exhibition)}
          ></div>
          <img className={styles.thumbnail} 
          onClick={()=>selectGallery(exhibition)}
          src={exhibition.images[0].image_urls} 
          alt='thumbnail' />
        </Link>

        <span className={styles.title}>{exhibition.title}</span>
        <div className={styles.period}>전시 기간: {exhibition.start_date} ~ {exhibition.end_date}</div>
        
        <div className={styles.likesMeta} onClick={handleModal}>
          <span className={styles.notlike}><i class="far fa-heart"></i></span>
          <span className={styles.likesCount}>{exhibition.likes.length}</span>
        </div>

      </li>
    )
  }
}

export default GalleryContent;