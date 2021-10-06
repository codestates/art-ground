import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import ArtDetail from '../../components/artDetail/ArtDetail';
import GallerySlider from '../../components/gallerySlider/GallerySlider';
import PurchaseModal from '../../components/modals/PurchaseModal';
import styles from './GalleryDetail.module.css';
import { getExhibitionInfo } from "../../api/galleryApi";

const GalleryDetail = ({ handle3dExhibition, location}) => {

  const sliderNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [exhibitionInfo, setExhibitionInfo] = useState(null);
  const [btnSlider, setBtnSlider] = useState(1);
  const [artDetail, setArtDetail] = useState(null); //모달창에 올라가는 확대시킬 이미지 src
  const [showMoreOpt, setMoreOpt] = useState(null);
  const [purchaseModal, setpurchaseModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getAxiosData() {
      setExhibitionInfo(await getExhibitionInfo(Number(location.pathname.substring(15))))
    }
    getAxiosData();
    setTimeout(()=> {
      setLoading(false);
    }, 1000)
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

  const history = useHistory();
  const goThreeDPage = () => { 
    handle3dExhibition(exhibitionInfo.id);
    //history.push(`/3dgallery/${exhibitionInfo.id}`);
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
        {exhibitionInfo.genre_hashtags.map(el=> <span key={el} className={styles.tag}>{el}</span>)}
      </div>
      <div className={styles.title}>{exhibitionInfo.title}</div>
      <div className={styles.date}>{exhibitionInfo.start_date} ~ {exhibitionInfo.end_date}</div>

      <GallerySlider
      btnSlider={btnSlider} 
      gallerySelected={exhibitionInfo}
      sliderUp={sliderUp}
      sliderDown={sliderDown}
      handleModalOpen={handleModalOpen}/>  
      
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

    </section>
  );
  }
};

export default withRouter(GalleryDetail);