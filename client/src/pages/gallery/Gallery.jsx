
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { filterByTag, getPremiumGallery, getStandardGallery, sort } from '../../api/galleryApi';
import GalleryContent from '../../components/galleryContent/GalleryContent';
import SubNavBar from '../../components/subNavBar/SubNavBar';
import styles from './Gallery.module.css';


const Gallery = ({ isLogin, selectGallery, userinfo }) => {

  const [galleryList, setGalleryList] = useState([]);
  
  const [isStandard, setStandard] = useState(true); //STANDARD, PREMIUM 카테고리 상태값
  const [tagClicked, setTagClicked] = useState('전체'); //해시태그 카테고리 상태값
  const [sortValue, setSortValue] = useState('최신순'); //최신순, 전시마감일순 정렬 상태값

  const [modalOpen, setModalOpen] = useState(false); //찜하기 클릭시 나타나는 모달창
  const [rerender, setRerender] = useState(false);


  useEffect(() => {
    async function getAxiosData(){
      if(isStandard){ 
        setGalleryList(await getStandardGallery(tagClicked, sortValue));
      } else{
        setGalleryList(await getPremiumGallery(tagClicked, sortValue));
      }
    }
    setTimeout(()=> {
      getAxiosData();
    }, 200)
  }, [isStandard, tagClicked, sortValue, rerender]); 

  const handleStandard = () => { //STANDARD, PREMIUM 필터
    setStandard(!isStandard)
  }

  const handleTagFilter = (el) => { //해시태그 필터
    setTagClicked(el);   
  }

  const handleSort = (e) => { //정렬
    setSortValue(e.target.value);
  }

  return (
    <section className={styles.container}>
      <SubNavBar 
        isStandard={isStandard} 
        tagClicked={tagClicked}
        handleTagFilter={handleTagFilter}
        handleStandard={handleStandard}
        sortValue={sortValue}
        gallerySort={handleSort}
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
          <span className={styles.modalContent}>전시회를 찜하려면<br></br>로그인이 필요합니다!</span>
          <p className={styles.modalSubContent}>로그인 페이지로 이동하시겠어요?</p>
          <div className={styles.ok}>
            <Link to="/signin">
              <button className={styles.okBtn}>네</button>
            </Link>
            <button className={styles.okBtn} onClick={()=>setModalOpen(false)}>아니요</button>
          </div>
        </div>
      </section>
      : null}

    </section>
  );
};

export default Gallery;