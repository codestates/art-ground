
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { filter, getPremiumGallery, getStandardGallery, sort } from '../../api/galleryApi';
import GalleryContent from '../../components/galleryContent/GalleryContent';
import SubNavBar from '../../components/subNavBar/SubNavBar';
import styles from './Gallery.module.css';


const Gallery = ({ 
  isLogin, selectGallery, userinfo
}) => {

  const [galleryList, setGalleryList] = useState([]);
  
  const [isStandard, setStandard] = useState(true); //STANDARD, PREMIUM 카테고리 상태값
  const [tagClicked, setTagClicked] = useState('전체'); //해시태그 카테고리 상태값
  const [sortValue, setSortValue] = useState('최신순'); //최신순, 전시마감일순 정렬 상태값

  const [modalOpen, setModalOpen] = useState(false); //찜하기 클릭시 나타나는 모달창
  const [premiumBlocked, setPremiumBlocked] = useState(false); //premium 클릭 시 나타나는 모달창
  const [rerender, setRerender] = useState(false); //좋아요&좋아요해제 시 컴포넌트 재랜더링

  useEffect(() => {
    async function getAxiosData(){
      if(isStandard){
        setGalleryList(await getStandardGallery(tagClicked, sortValue));
        console.log(await getStandardGallery(tagClicked, sortValue))
      } else {
        setGalleryList(await getPremiumGallery(tagClicked, sortValue));
      }
    }
    setTimeout(()=> {
      getAxiosData();
    }, 100)
  }, [rerender]); 

  const handleStandard = async () => { //STANDARD, PREMIUM 필터
    if(isLogin){
      if(isStandard){
        setStandard(false);
        setGalleryList(await getPremiumGallery(tagClicked, sortValue));
      } else{
        setStandard(true);
        setGalleryList(await getStandardGallery(tagClicked, sortValue));
      }
    } else{ //로그인 안 한 상태에서 premium 클릭 시 로그인 요구 모달창 오픈
      setModalOpen(true);
      setPremiumBlocked(true);
    }
  }

  const handleTagFilter = async (el) => { //해시태그 필터
    setTagClicked(el); 
    setGalleryList(await filter(isStandard, el, sortValue));
  }

  const handleSort = async (e) => { //정렬
    setSortValue(e.target.value); 
    setGalleryList(await sort(e.target.value, galleryList));
  }

  const closeModal = () => {
    setModalOpen(false)
    setPremiumBlocked(false);
  }

  return (
    <section className={styles.container}>
      <SubNavBar 
        isStandard={isStandard} 
        tagClicked={tagClicked}
        handleTagFilter={handleTagFilter}
        handleStandard={handleStandard}
        sortValue={sortValue}
        handleSort={handleSort}
      />
      <ul className={styles.objectList}>
        {galleryList.map((el) => (
          <GalleryContent
          render={()=> setRerender(!rerender)}
          selectGallery={selectGallery} 
          exhibition={el}
          userinfo={userinfo}
          handleModal={()=> setModalOpen(true)} 
          isLogin={isLogin} />
        ))}
      </ul>

      {modalOpen ? //모달창
      <section className={styles.modalContainer}>
        <div className={styles.modalWrap}>
          { premiumBlocked ? 
          <span className={styles.modalContent}>Premium 전시를 관람하려면<br></br>로그인이 필요합니다!</span> : 
          <span className={styles.modalContent}>전시회를 찜하려면<br></br>로그인이 필요합니다!</span>}
          <p className={styles.modalSubContent}>로그인 페이지로 이동하시겠어요?</p>
          <div className={styles.ok}>
            <Link to="/signin">
              <button className={styles.okBtn}>네</button>
            </Link>
            <button className={styles.okBtn} onClick={closeModal}>아니요</button>
          </div>
        </div>
      </section>
      : null}

    </section>
  );
};

export default Gallery;