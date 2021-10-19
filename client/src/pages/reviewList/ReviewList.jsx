import React, { useEffect, useState } from 'react';
import { getAllGallery } from '../../api/reviewApi';
import Review from '../../components/review/Review';
import useHistoryState from '../../utils/useHistoryState';
import styles from './ReviewList.module.css';

const ReviewList = () => {

  const [galleryList, setGalleryList] = useState([]);
  const [search, setSearch] = useHistoryState('', 'search');
  const [searchWord, setSearchWord] = useHistoryState('', 'searchWord');
  const [sortValue, setSortValue] = useHistoryState('최신순', 'sortValue');

  const [isLoading, setLoading] = useState(true);


  useEffect(()=> {
    //standard, premium gallery, 마감된 전시 모두 모아서 setGalleryList에 넣기.
    async function getAxiosData(){
      setGalleryList(await getAllGallery(sortValue, search));
      //console.log(await getAllGallery(sortValue, search));
    }
    setTimeout(()=> {
      getAxiosData();
    }, 100)
    setTimeout(()=> {
      setLoading(false);
    }, 1000)
  }, [search, sortValue])

  const handleChange = (e) => {
    setSearchWord(e.target.value) //실시간으로 바뀌는 검색어
  }

  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleSearchButton()
    }
  }
  const handleSearchButton = () => {
    setSearch(searchWord); //엔터 or 클릭 시 검색어 전달
  }

  const handleSort = (e) => { //정렬
    setSortValue(e.target.value);
  }
  const handleDeleteButton = () => {
    setSearchWord('');
    setSearch('');
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
      <div className={styles.searchBox}>
        <input className={styles.search} 
        placeholder="전시회 제목, 작가명으로 검색" 
        type="text" 
        value={searchWord}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        />
        {search !== ''? <button className={styles.deleteIcon}
        onClick={handleDeleteButton}
        >
          <i className="far fa-times-circle"></i>
        </button> : null}
        <button className={styles.searchIcon}
        onClick={handleSearchButton}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className={styles.sortWrap}>
        <select className={styles.sort} value={sortValue} onChange={handleSort}>
          <option value="최신순">최신순</option>
          <option value="인기순">인기순</option>
        </select>
      </div>

      <ul className={styles.reviews}>
        {search !== '' && galleryList.length === 0 ?
        <div className={styles.result}>검색 결과가 없습니다!</div>
        : search !=='' && galleryList.length !== 0 ?
        <div className={styles.result}>총 {galleryList.length}개의 전시회가 검색되었습니다.</div>
        : null}
        {galleryList.length !==0 ? 
        galleryList
        .map((el) => (
          <Review
          key={el.id}
          exhibition={el}
          />
        ))
        : null}
      </ul>
    </section>
  )
  }
}
export default ReviewList;