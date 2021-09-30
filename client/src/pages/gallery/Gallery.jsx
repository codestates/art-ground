import React, { useEffect, useState } from "react";
import {
  getPremiumGallery,
  getStandardGallery,
} from "../../api/galleryApi";
import GalleryContent from "../../components/galleryContent/GalleryContent";
import GalleryModal from "../../components/modals/GalleryModal";
import SubNavBar from "../../components/subNavBar/SubNavBar";
import styles from "./Gallery.module.css";

const Gallery = ({ isLogin, selectGallery, userinfo }) => {

  const [galleryList, setGalleryList] = useState([]);

  const [isStandard, setStandard] = useState(true); //STANDARD, PREMIUM 카테고리 상태값
  const [tagClicked, setTagClicked] = useState("전체"); //해시태그 카테고리 상태값
  const [sortValue, setSortValue] = useState("최신순"); //최신순, 전시마감일순 정렬 상태값

  const [modalOpen, setModalOpen] = useState(false); //찜하기 클릭시 나타나는 모달창
  const [premiumBlocked, setPremiumBlocked] = useState(false); //premium 클릭 시 나타나는 모달창
  const [rerender, setRerender] = useState(false); //좋아요&좋아요해제 시 컴포넌트 재랜더링
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getAxiosData() {
      if (isStandard) {
        setGalleryList(await getStandardGallery(tagClicked, sortValue));
      } else {
        setGalleryList(await getPremiumGallery(tagClicked, sortValue));
      }
    }
    setTimeout(() => {
      getAxiosData();
    }, 100)
    setTimeout(()=> {
      setLoading(false);
    }, 700)
  }, [isStandard, tagClicked, sortValue, rerender]); 

  const handleStandard = async () => { //STANDARD, PREMIUM 필터
    if(isStandard){
      setStandard(false);
    } else{
      setStandard(true);
    }
  }

  const handleModalPremium = () => {
    setModalOpen(true);
    setPremiumBlocked(true);
  }

  const handleTagFilter = async (el) => {
    //해시태그 필터
    setTagClicked(el);
  };

  const handleSort = async (e) => {
    //정렬
    setSortValue(e.target.value);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPremiumBlocked(false);
  };

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
          handleModalPremium={handleModalPremium}
          isLogin={isLogin} />

        ))}
      </ul>

      {modalOpen ? ( //모달창
      <GalleryModal 
      premiumBlocked={premiumBlocked}
      closeModal={closeModal}
      />
      ) : null}
    </section>
  )
  };
};

export default Gallery;
