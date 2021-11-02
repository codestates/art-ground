import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ArtDetail from '../../components/artDetail/ArtDetail';
import GallerySlider from '../../components/gallerySlider/GallerySlider';
import PurchaseModal from '../../components/modals/PurchaseModal';
import styles from './GalleryDetail.module.css';
import { createLike, deleteLike, getExhibitionInfo, getLikesInfo } from "../../api/galleryApi";
import KakaoShare from '../../components/kakaoShare/KakaoShare';
import KakaoPremiumModal from '../../components/modals/KakaoPremiumModal';
import GalleryModal from '../../components/modals/GalleryModal';

const GalleryDetail = ({ isLogin, userinfo, handle3dExhibition, location}) => {

  const sliderNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [exhibitionInfo, setExhibitionInfo] = useState(null);
  const [btnSlider, setBtnSlider] = useState(1);
  const [artDetail, setArtDetail] = useState(null); //모달창에 올라가는 확대시킬 이미지 src
  const [showMoreOpt, setMoreOpt] = useState(null);
  const [purchaseModal, setpurchaseModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  const [isLiked, setLiked] = useState(false); //좋아요 상태값
  const [rerender, setRerender] = useState(false); // 좋아요 & 좋아요해제 시 하트 컴포넌트 재랜더링
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getAxiosData() {
      setExhibitionInfo(await getExhibitionInfo(Number(location.pathname.substring(15))));
      //console.log(await getExhibitionInfo(Number(location.pathname.substring(15))));
    }
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 1000)
  }, []); 

  useEffect(() => {
    async function getLikesAxiosData() {
      const likeArr = (await getLikesInfo(Number(location.pathname.substring(15)))).filter(el => userinfo.id === el.user_id);
      //console.log(likeArr);  
      if(likeArr.length !==0){ //유저가 해당 전시를 좋아요 한 것일 때
        setLiked(true);
      } else{
        setLiked(false); //유저가 해당 전시를 좋아요 한 게 아닐 때
      }
    }
    if(userinfo) {
      setTimeout(() => {
        //console.log('좋아요 checking')
        getLikesAxiosData();
      }, 100)
    }
  }, [rerender]); 

  const handleLike = () => { //로그인 한 사람들에게만 작동.
    if (isLiked) { // 좋아요 해제
      deleteLike(exhibitionInfo.id, exhibitionInfo.exhibit_type);
      setRerender(!rerender);
    } else { //좋아요
      createLike(exhibitionInfo.id, exhibitionInfo.exhibit_type);
      setRerender(!rerender);
    }
  }

  const handleMoreOpt = (el) =>{
    if(showMoreOpt === null || el !== showMoreOpt){
      setMoreOpt(el);
    } else{
      setMoreOpt(null);
    }
  }

  const slider = (el) => {
    setBtnSlider(el);
  };

  const sliderDown = () => {
    if(btnSlider!==1){
      setBtnSlider(btnSlider-1)
    }
  }
  const sliderUp = () => {
    if(btnSlider!==9){
      setBtnSlider(btnSlider+1)
    }
  }

  const handleModalOpen = (el) => {
    setArtDetail(el); //모달에 띄울 art 전달
  }
  
  if(isLoading){
    return (
      <section className={styles.container}>
        <div className={styles.loading}>
          <img className={styles.loadingImg} src="../../../images/loading.gif" alt="loading"/>
        </div>
      </section>
    )
  }else{
  return ( 
    <section className={styles.container}>
      <div className={styles.space}>
        <div className={styles.tagsWrap}>
          {exhibitionInfo.genre_hashtags.map(el=> <span key={el} className={styles.tag}>{el}</span>)}
        </div>
        <div className={styles.tagsWrap}>
          <KakaoShare 
          image={exhibitionInfo.images[0].image_urls} 
          url={location.pathname} 
          title={exhibitionInfo.title} 
          className={styles.kakaoBtn}
          />
          {!isLogin ? 
          <span className={styles.notlike} onClick={()=> setLikeModal(true)}>
            <i className="far fa-heart"></i>
          </span>
          : isLiked ? 
            <span className={styles.like} onClick={handleLike}><i className="fas fa-heart"></i></span> 
            : <span className={styles.notlike} onClick={handleLike}><i className="far fa-heart"></i></span>}
        </div>
      </div>
    
      <div className={styles.title}>{exhibitionInfo.title}</div>
      <div className={styles.date}>{exhibitionInfo.start_date} ~ {exhibitionInfo.end_date}</div>

      <div className={styles.explanation}>이미지를 클릭하면 작품 상세설명을 볼 수 있어요.</div>
      <div className={styles.kakaoAndLike}>
        <GallerySlider
        btnSlider={btnSlider} 
        gallerySelected={exhibitionInfo}
        sliderUp={sliderUp}
        sliderDown={sliderDown}
        handleModalOpen={handleModalOpen}
        />
      </div>  
      
      <div className={styles.btnWrap}>
        {sliderNum.map(el => <button key={el} className={el===btnSlider? styles.btnClicked : styles.btn} onClick={() => slider(el)}> </button>)}
      </div>
      

      <p className={styles.content}>{exhibitionInfo.exhibit_desc}</p>

      {exhibitionInfo.exhibit_type ===2 ?
      <Link to="/3dgallery"> 
        <div className={styles.threeDBtn} 
        onClick={() => handle3dExhibition(exhibitionInfo.id)}
        >3D 전시관 둘러보기</div>
      </Link>
      : null}

      <div className={styles.intro}>작가</div>
      <div className={styles.artist}>
        <div className={styles.imgBox}>
          <img className={styles.profilePic} src={exhibitionInfo.author.profile_img || "../../../images/profile.jpeg"} alt='authorImg' />
        </div>
        <div className={styles.contentBox}>
          <span className={styles.artistName}>{exhibitionInfo.author.nickname}</span>
          <p className={styles.artistContent}>{exhibitionInfo.author.author_desc}</p>
        </div>
      </div>

      <div className={styles.workList}>작품</div>
      <div className={styles.explanation2}>이미지를 클릭하면 작품 상세설명을 볼 수 있어요.</div>
      <ul className={styles.workBox}>
        {exhibitionInfo.images.map(el =>
          <li key={el.id}>
            <img className={styles.work} src={el.image_urls} alt='art' onClick={() => handleModalOpen(el)}/>
            <div className={styles.workTitleMeta}>
              <span className={styles.workTitle}>{el.title}</span>
              <i className="fas fa-ellipsis-h" onClick={()=> handleMoreOpt(el.title)}>
                {el.title === showMoreOpt?
                <ul className={styles.more} onClick={()=>setpurchaseModal(true)}>
                    <li className={styles.moreOpt}>구매정보</li>
                </ul> : null}
              </i>
            </div>
            <span className={styles.workContent}>{el.image_desc}</span>
          </li>
        )}

      </ul>
      <div className={styles.space} />

      {/* 모달창 섹션 */}
      {artDetail !== null ?
      <ArtDetail 
      handleClose={()=> setArtDetail(null)}
      art={artDetail}
      /> : null}

      {/* 모달창 섹션 */}
      {purchaseModal? 
      <PurchaseModal closeModal={() => setpurchaseModal(false)}/>
      : null}

      {/* 모달창 섹션 */}
      {!isLogin && exhibitionInfo.exhibit_type ===2 ? 
      <KakaoPremiumModal/>
      : null}

      {/* 모달창 섹션 */}
      {likeModal ? 
      <GalleryModal
      premiumBlocked={!likeModal}
      closeModal={() => setLikeModal(false)}
      />
      : null}

    </section>
  );
  }
};

export default withRouter(GalleryDetail);