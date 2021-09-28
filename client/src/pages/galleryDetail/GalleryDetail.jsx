import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArtDetail from '../../components/artDetail/ArtDetail';
import styles from './GalleryDetail.module.css';

const GalleryDetail = ({ gallerySelected }) => {

  //gallerySelected--> 전시회 정보
  const sliderNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [btnSlider, setBtnSlider] = useState(1);
  const [artDetail, setArtDetail] = useState(null); //모달창에 올라가는 확대시킬 이미지 src

  const [showMoreOpt, setMoreOpt] = useState(null);
  const [purchaseModal, setpurchaseModal] = useState(false);

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

  return (
    <section className={styles.container}>
      <div className={styles.space}>
        {gallerySelected.genre_hashtags.map(el=> <span className={styles.tag}>{el}</span>)}
      </div>
      <div className={styles.title}>{gallerySelected.title}</div>
      <div className={styles.date}>{gallerySelected.start_date} ~ {gallerySelected.end_date}</div>

      {gallerySelected.images.length !== 0 ?
      <div className={styles.outer}>
        <div className={
          btnSlider === 1
            ? styles.sliderOuter1
            : btnSlider === 2
              ? styles.sliderOuter2
              : btnSlider === 3
                ? styles.sliderOuter3
                : btnSlider === 4
                  ? styles.sliderOuter4
                  : btnSlider === 5
                    ? styles.sliderOuter5
                    : btnSlider === 6
                      ? styles.sliderOuter6
                      : btnSlider === 7
                        ? styles.sliderOuter7
                        : btnSlider === 8
                          ? styles.sliderOuter8
                          : styles.sliderOuter9
          }
        >

          {gallerySelected.images.map(el =>
              <div className={styles.sliderWrap}>
                <img className={styles.slider} src="../../../images/sliderBackground.png" alt='slider' />
                <img className={styles.sliderPic} src={el.image_urls} alt='sliderIn' onClick={() => handleModalOpen(el)} />
              </div>
          )}
        </div>
        <span className={styles.leftArrow} onClick={sliderDown}><i class="fas fa-chevron-left"></i></span>
        <span className={styles.rightArrow} onClick={sliderUp}><i class="fas fa-chevron-right"></i></span>
      </div>
      : null}
      
      <div className={styles.btnWrap}>
        {sliderNum.map(el => <button className={el===btnSlider? styles.btnClicked : styles.btn} onClick={() => slider(el)}> </button>)}
      </div>
      

      <p className={styles.content}>{gallerySelected.exhibit_desc}</p>

      <div className={styles.intro}>작가</div>
      <div className={styles.artist}>
        <div className={styles.imgBox}>
          <img className={styles.profilePic} src={gallerySelected.author.profile_img} alt='authorImg' />
        </div>
        <div className={styles.contentBox}>
          <span className={styles.artistName}>{gallerySelected.author.nickname}</span>
          <p className={styles.artistContent}>{gallerySelected.author.author_desc}</p>
        </div>
      </div>

      <div className={styles.workList}>작품</div>
      <ul className={styles.workBox}>
        {gallerySelected.images.map(el =>
          <li>
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

      {purchaseModal? 
      <section className={styles.modalContainer}>
        <div className={styles.modalWrap}>
          <span className={styles.modalContent}>작품의 구매정보는<br></br>운영자에게 문의 부탁드립니다.</span>
          <p className={styles.modalSubContent}>CONTACT 페이지로<br></br>이동하시겠어요?</p>
          <div className={styles.ok}>
            <Link to="/contact">
              <button className={styles.okBtn} onClick={()=>setpurchaseModal(false)}>네</button>
            </Link>
            <button className={styles.okBtn} onClick={()=>setpurchaseModal(false)}>아니요</button>
          </div>
        </div>
      </section>
      : null}

    </section>
  );
  
};

export default GalleryDetail;