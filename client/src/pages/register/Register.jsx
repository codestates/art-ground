import React, { useState } from 'react';
import styles from './Register.module.css';

const Register = (props) => {

  const arts = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const tags = ['#현대미술', '#일러스트레이션', '#회화'] //더미카테고리
  
  const [isClicked, setClicked] = useState([]); //카테고리 담는 배열

  const tagHandle = (tag) => {
    if (isClicked.includes(tag)) {
      setClicked(isClicked.filter((el) => !(el === tag)));
    } else {
      setClicked(isClicked.concat(tag));
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>전시 신청</h2>

      <div className={styles.categoryName}>전시명</div>
      <input className={styles.textInput} type="text"/>
      <div className={styles.categoryName}>전시 시작일</div>
      <input className={styles.textInput} type="text" placeholder="전시 시작일은 신청일로부터 7일 이후 날짜로 설정 가능합니다."/>
      <div className={styles.categoryName}>전시 마감일</div>
      <input className={styles.textInput} type="text" placeholder="최대 전시 가능한 기간은 90일입니다."/>
      <div className={styles.categoryName}>전시장르<span class={styles.subGenre}>(복수선택가능)</span></div>
      <div className={styles.tags}>
        {tags.map((el) => 
            <>
              <input type="checkbox" name={el} value={el} />
              <label className={isClicked.includes(el) ? styles.hashtagClicked : styles.hashtag} onClick={() => tagHandle(el)}>{el}</label>
            </>
        )}
      </div>

      {arts.map(el => 
      <>
        <div className={styles.categoryName}>작품{el}</div>
        <div className={styles.artWrap}>
          <div className={styles.artContent}>
            <input className={styles.artTextInput} type="text" placeholder="작품명"/>
            <input className={styles.artTextInput} type="text" placeholder="제작연도/재료/크기"/>
            <input className={styles.contentInput} type="textarea" placeholder="작품설명"/>
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