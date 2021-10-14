import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ArtDetail from '../../components/artDetail/ArtDetail';
import GallerySlider from '../../components/gallerySlider/GallerySlider';
import PurchaseModal from '../../components/modals/PurchaseModal';
import styles from './GalleryDetail.module.css';
import { getExhibitionInfo } from "../../api/galleryApi";
import KakaoShare from '../../components/kakaoShare/KakaoShare';
import KakaoPremiumModal from '../../components/modals/KakaoPremiumModal';

const GalleryDetail = ({ isLogin, handle3dExhibition, location}) => {

  const sliderNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [exhibitionInfo, setExhibitionInfo] = useState(null);
  const [btnSlider, setBtnSlider] = useState(1);
  const [artDetail, setArtDetail] = useState(null); //모달창에 올라가는 확대시킬 이미지 src
  const [showMoreOpt, setMoreOpt] = useState(null);
  const [purchaseModal, setpurchaseModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    async function getAxiosData() {
      setExhibitionInfo(await getExhibitionInfo(Number(location.pathname.substring(15))));
    }
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 1200)
  }, []); 


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

  const closeModal = () => {
    setpurchaseModal(false);
  }

  const goThreeDPage = () => { 
    handle3dExhibition(exhibitionInfo.id);
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
          {isLiked ? 
            <span className={styles.like}><i className="fas fa-heart"></i></span> : 
            <span className={styles.notlike}><i className="far fa-heart"></i></span>
          }
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
        onClick={goThreeDPage}
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
      <PurchaseModal closeModal={closeModal}/>
      : null}

      {/* 모달창 섹션 */}
      {!isLogin && exhibitionInfo.exhibit_type ===2 ? 
      <KakaoPremiumModal/>
      : null}

    </section>
  );
  }
};

export default withRouter(GalleryDetail);