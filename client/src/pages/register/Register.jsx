import React, { useState } from 'react';
import styles from './Register.module.css';

const Register = (props) => {

  const artCount = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const tags = ['#현대미술', '#일러스트레이션', '#회화'] //더미카테고리
  
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isClicked, setClicked] = useState([]); //카테고리 담는 배열
  const [art1, setArt1] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art2, setArt2] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art3, setArt3] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art4, setArt4] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art5, setArt5] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art6, setArt6] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art7, setArt7] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art8, setArt8] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  const [art9, setArt9] = useState({
    title: '',
    content: '',
    subContent: ''
  });
  
  const arts = [art1, art2, art3, art4, art5, art6, art7, art8, art9];

  const handleTitle = (event) => {
    setTitle(event.target.value);
  }
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  }
  const handleEndDate = (event) => {
    setStartDate(event.target.value);
  }

  const tagHandle = (tag) => {
    if (isClicked.includes(tag)) {
      setClicked(isClicked.filter((el) => !(el === tag)));
    } else {
      setClicked(isClicked.concat(tag));
    }
  };

  const handleArtTitle = (el, e) => {
    if(el ===  '1'){
      setArt1({title: e.target.value, content: art1.content, subContent: art1.subContent})
    } else if(el ==='2'){
      setArt2({title: e.target.value, content: art2.content, subContent: art2.subContent})
    } else if(el === '3'){
      setArt3({title: e.target.value, content: art3.content, subContent: art3.subContent})
    } else if(el ==='4'){
      setArt4({title: e.target.value, content: art4.content, subContent: art4.subContent})
    } else if(el ==='5'){
      setArt5({title: e.target.value, content: art5.content, subContent: art5.subContent})
    } else if(el ==='6'){
      setArt6({title: e.target.value, content: art6.content, subContent: art6.subContent})
    } else if(el ==='7'){
      setArt7({title: e.target.value, content: art7.content, subContent: art7.subContent})
    } else if(el ==='8'){
      setArt8({title: e.target.value, content: art8.content, subContent: art8.subContent})
    } else{ //9일때
      setArt9({title: e.target.value, content: art9.content, subContent: art9.subContent})
    }
  }
  const handleArtContent = (el, e) => {
    if(el ===  '1'){
      setArt1({title: art1.title, content: e.target.value, subContent: art1.subContent})
    } else if(el ==='2'){
      setArt2({title: art2.title, content: e.target.value, subContent: art2.subContent})
    } else if(el === '3'){
      setArt3({title: art3.title, content: e.target.value, subContent: art3.subContent})
    } else if(el ==='4'){
      setArt4({title: art4.title, content: e.target.value, subContent: art4.subContent})
    } else if(el ==='5'){
      setArt5({title: art5.title, content: e.target.value, subContent: art5.subContent})
    } else if(el ==='6'){
      setArt6({title: art6.title, content: e.target.value, subContent: art6.subContent})
    } else if(el ==='7'){
      setArt7({title: art7.title, content: e.target.value, subContent: art7.subContent})
    } else if(el ==='8'){
      setArt8({title: art8.title, content: e.target.value, subContent: art8.subContent})
    } else{ //9일때
      setArt9({title: art9.title, content: e.target.value, subContent: art9.subContent})
    }
  }
  const handleArtSubContent = (el, e) => {
    if(el ===  '1'){
      setArt1({title: art1.title, content: art1.content, subContent: e.target.value})
    } else if(el ==='2'){
      setArt2({title: art2.title, content: art2.content, subContent: e.target.value})
    } else if(el === '3'){
      setArt3({title: art3.title, content: art3.content, subContent: e.target.value})
    } else if(el ==='4'){
      setArt4({title: art4.title, content: art4.content, subContent: e.target.value})
    } else if(el ==='5'){
      setArt5({title: art5.title, content: art5.content, subContent: e.target.value})
    } else if(el ==='6'){
      setArt6({title: art6.title, content: art6.content, subContent: e.target.value})
    } else if(el ==='7'){
      setArt7({title: art7.title, content: art7.content, subContent: e.target.value})
    } else if(el ==='8'){
      setArt8({title: art8.title, content: art8.content, subContent: e.target.value})
    } else{ //9일때
      setArt9({title: art9.title, content: art9.content, subContent: e.target.value})
    }
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>전시 신청</h2>

      <div className={styles.categoryName}>전시명</div>
      <input className={styles.textInput} type="text" onChange={handleTitle}/>
      <div className={styles.categoryName}>전시 시작일</div>
      <input className={styles.textInput} type="text" placeholder="전시 시작일은 신청일로부터 7일 이후 날짜로 설정 가능합니다." onChange={handleStartDate}/>
      <div className={styles.categoryName}>전시 마감일</div>
      <input className={styles.textInput} type="text" placeholder="최대 전시 가능한 기간은 90일입니다." onChange={handleEndDate}/>
      <div className={styles.categoryName}>전시장르<span class={styles.subGenre}>(복수선택가능)</span></div>
      <div className={styles.tags}>
        {tags.map((el) => 
            <>
              <input type="checkbox" name={el} value={el} />
              <label className={isClicked.includes(el) ? styles.hashtagClicked : styles.hashtag} onClick={() => tagHandle(el)}>{el}</label>
            </>
        )}
      </div>

      {artCount.map(el => 
      <>
        <div className={styles.categoryName}>작품{el}</div>
        <div className={styles.artWrap}>
          <div className={styles.artContent}>
            <input className={styles.artTextInput} type="text" placeholder="작품명" onChange={e => handleArtTitle(el, e)}/>
            <input className={styles.artTextInput} type="text" placeholder="제작연도/재료/크기" onChange={e => handleArtContent(el, e)}/>
            <input className={styles.contentInput} type="textarea" placeholder="작품설명" onChange={e => handleArtSubContent(el, e)}/>
          </div>
          <div className={styles.artFile}>
            <img className={styles.artImg} src="http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg"  alt="작품이미지"/>
            <input className={styles.fileInput} type="file" id="ex_file" accept="image/*"></input>
          </div>
        </div>
      </> 
      )}
      <div className={styles.submit}>
        <button className={styles.submitBtn}>신청</button>
        <button className={styles.submitBtn}>취소</button>
      </div>

    </section>
  )
}

export default Register;