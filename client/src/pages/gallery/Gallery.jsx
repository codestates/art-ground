import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  getPremiumGallery,
  getStandardGallery,
} from "../../api/galleryApi";
import GalleryContent from "../../components/galleryContent/GalleryContent";
import GalleryModal from "../../components/modals/GalleryModal";
import MobileBlocked from "../../components/modals/MobileBlocked";
import SubNavBar from "../../components/subNavBar/SubNavBar";
import useHistoryState from "../../utils/useHistoryState";
import styles from "./Gallery.module.css";

const Gallery = ({ isLogin, userinfo }) => {

  const history = useHistory();

  const [galleryList, setGalleryList] = useState([]);
  const [isStandard, setStandard] = useHistoryState(true, 'isStandard'); //STANDARD, PREMIUM 카테고리 상태값
  const [tagClicked, setTagClicked] = useHistoryState("전체", 'tagClicked'); //해시태그 카테고리 상태값
  const [sortValue, setSortValue] = useHistoryState("최신순", 'sortValue'); //최신순, 전시마감일순 정렬 상태값

  const [modalOpen, setModalOpen] = useState(false); //찜하기 클릭시 나타나는 모달창
  const [premiumBlocked, setPremiumBlocked] = useState(false); //premium 클릭 시 나타나는 모달창
  const [rerender, setRerender] = useState(false); //좋아요&좋아요해제 시 컴포넌트 재랜더링
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getAxiosData() {
      if (isStandard) {
        setGalleryList(await getStandardGallery(tagClicked, sortValue));
        //console.log((await getStandardGallery(tagClicked, sortValue)));
      } else {
        setGalleryList(await getPremiumGallery(tagClicked, sortValue));
        //console.log((await getPremiumGallery(tagClicked, sortValue)));
      }
    }
    setTimeout(() => {
      getAxiosData();
    }, 100)
    setTimeout(()=> {
      setLoading(false);
    }, 1000)
  }, [isStandard, tagClicked, sortValue, rerender]); 

  const handleStandard = () => { //STANDARD, PREMIUM 필터
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

  const handleTagFilter = (el) => {
    //해시태그 필터
    setTagClicked(el);
  };

  const handleSort = (e) => {
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
  } else if(isLogin && !userinfo){ // 모바일기기에서 로그인 했지만 userinfo가 없어 흰 화면 뜨는 경우...
    return (
      <MobileBlocked goBack={() => history.goBack()}/>
    )
  } else {
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
      {galleryList.length === 0 ?
      <div className={styles.noResult}>장르 필터 결과가 없습니다!</div>
      : null}
      <ul className={styles.objectList}>
        {galleryList.map((el) => (
          <GalleryContent
          key={el.id}
          render={()=> setRerender(!rerender)}
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
