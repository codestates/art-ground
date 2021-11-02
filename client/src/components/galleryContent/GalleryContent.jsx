import React, { useEffect } from "react";
import styles from "./GalleryContent.module.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createLike, deleteLike } from "../../api/galleryApi";

const GalleryContent = ({
  isLogin,
  userinfo,
  exhibition,
  handleModal,
  handleModalPremium,
  render,
}) => {
  
  const [isLiked, setLiked] = useState(false);

  const history = useHistory();
  const goDetailPage = () => { 
    if(!isLogin && exhibition.exhibit_type === 2){
      handleModalPremium();
    } else{
      //selectGallery(exhibition);
      history.push(`/gallerydetail/${exhibition.id}`);
    } 
  }
  
  useEffect(()=> { //좋아요 했는지 안 했는지 확인하여 좋아요 상태값 변동시킴.
    if(isLogin){
      const likeArr = exhibition.likes.filter(el => userinfo.id === el.user_id) 
      if(likeArr.length !==0){ //유저가 해당 gallerycontent컴포넌트를 좋아요 한 것일 때
        setLiked(true);
      } else{
        setLiked(false); //유저가 해당 gallerycontent컴포넌트를 좋아요 한 게 아닐 때
      }
      //console.log('GalleryContent 컴포넌트 내 좋아요 상태값 확인중')
    }
  }, [exhibition.likes.length]); 

  const handleLike = () => {
    //로그인 한 사람들에게만 작동.
    if (isLiked) {
      // 좋아요 해제
      deleteLike(exhibition.id, exhibition.exhibit_type);
      render();
    } else {
      //좋아요
      createLike(exhibition.id, exhibition.exhibit_type);
      render();
    }
  }
  
  if(isLogin){ // 로그인했다면? 좋아요를 했는지 안했는지에 따라서 하트 다르게 랜더링. 좋아요 클릭시 좋아요/좋아요 해제 가능
    return(
      <li className={styles.object}>

        <img className={styles.thumbnail} 
        onClick={goDetailPage}
        src={exhibition.images[0].image_urls} 
        alt='thumbnail' />

        <span className={styles.title}>{exhibition.title}</span>
        <div className={styles.period}>전시 기간: {exhibition.start_date} ~ {exhibition.end_date}</div>
        
        <div className={styles.likesMeta} onClick={handleLike}>
          {isLiked ? 
          <span className={styles.like}><i className="fas fa-heart"></i></span> : 
          <span className={styles.notlike}><i className="far fa-heart"></i></span>}
          <span className={styles.likesCount}>{exhibition.likes.length}</span>
        </div>

        {exhibition.exhibit_type === 2 ?
        <div className={styles.threeDIconWrap}>
          <img className={styles.threeDIcon} 
          src="../../../images/3dIcon.png" alt="3d"/>
        </div>
        : null}

      </li>
    )
  } else{ // 로그인 안 했다면? 좋아요 default 회색하트 랜더링. 클릭 시 로그인해주세요 모달창 띄우기
    return (
      <li className={styles.object}>

        <img className={styles.thumbnail} 
        onClick={goDetailPage}
        src={exhibition.images[0].image_urls} 
        alt='thumbnail' />

        <span className={styles.title}>{exhibition.title}</span>
        <div className={styles.period}>전시 기간: {exhibition.start_date} ~ {exhibition.end_date}</div>
        
        <div className={styles.likesMeta} onClick={handleModal}>
          <span className={styles.notlike}><i className="far fa-heart"></i></span>
          <span className={styles.likesCount}>{exhibition.likes.length}</span>

        </div>
        {exhibition.exhibit_type === 2 ?
        <div className={styles.threeDIconWrap}>
          <img className={styles.threeDIcon} 
          src="../../../images/3dIcon.png" alt="3d"/>
        </div>
        : null}
      </li>
    );
  }
};

export default GalleryContent;
