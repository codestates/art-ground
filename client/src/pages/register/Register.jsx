import React, { useState } from 'react';
import styles from './Register.module.css';
import AWS from "aws-sdk";
import { Link, useHistory, withRouter } from 'react-router-dom';
import { createExhibition } from '../../api/galleryApi';

const Register = ({ userinfo, isAuthorLogin, isAudienceLogin }) => {

  const artCount = [];
  for(let i=0; i<9; i++){
    artCount.push(String(i+1));
  } // artCount = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const tags = ['#회화', '#순수미술', '#응용미술', '#일러스트', '#판화', '#개인전', '#사진전', '#추상화', '#팝아트', '#인물화', '#풍경화', '#정물화'] //더미카테고리
  
  const [title, setTitle] = useState(''); //전시명
  const [startDate, setStartDate] = useState(''); //전시시작일
  const [endDate, setEndDate] = useState(''); //전시마감일
  const [type, setType] = useState('') //전시타입
  const [isClicked, setClicked] = useState([]); //전시장르(해시태그)
  const [content, setContent] = useState(''); //전시 설명
  const [arts, setArts] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}]) //9개 작품 배열

  const [modalOpen, setModalOpen] = useState(false);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  }
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  }
  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  }
  const handleContent = (event) => {
    setContent(event.target.value);
  }

  const tagHandle = (tag) => {
    if (isClicked.includes(tag)) {
      setClicked(isClicked.filter((el) => !(el === tag)));
    } else {
      setClicked(isClicked.concat(tag));
    }
  };

  const handleType = (event) => {
    setType(Number(event.target.value))
  }
  
  const handleArtTitle = (el, e) => {
    let newArts = [...arts.slice(0, Number(el-1)), {...arts[Number(el-1)]}, ...arts.slice(Number(el), 9)]
    newArts[Number(el-1)].title = e.target.value;
    setArts(newArts);
  }

  const handleArtContent = (el, e) => {
    let newArts = [...arts.slice(0, Number(el-1)), {...arts[Number(el-1)]}, ...arts.slice(Number(el), 9)]
    newArts[Number(el-1)].content = e.target.value;
    setArts(newArts);
  }

  const handleArtSubContent = (el, e) => {
    let newArts = [...arts.slice(0, Number(el-1)), {...arts[Number(el-1)]}, ...arts.slice(Number(el), 9)]
    newArts[Number(el-1)].subContent = e.target.value;
    setArts(newArts);
  }

  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a17da5be-96ef-4046-aaa8-62455cef2362", // cognito 인증 풀에서 받아온 키
    }),
  });

  const handleArtImg = (el, e) => {
    let newArts = [...arts.slice(0, Number(el-1)), {...arts[Number(el-1)]}, ...arts.slice(Number(el), 9)]

    const imageFile = e.target.files[0];
    if (!imageFile) {
      newArts[Number(el-1)].img = null;
      return setArts(newArts);
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "pickmeupimagestorage",
        Key: imageFile.name,
        Body: imageFile,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        newArts[Number(el-1)].img = data.Location;
        setArts(newArts);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  const createGallery = () => {
    setModalOpen(true);
    createExhibition(title, startDate, endDate, type, content, isClicked, arts);
  }

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  }

  if(isAuthorLogin){
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>전시 신청</h2>

      <div className={styles.categoryName}>전시명</div>
      <input className={styles.textInput} 
      type="text" onChange={handleTitle}/>

      <div className={styles.categoryName}>전시 시작일</div>
      <input className={styles.textInput} 
      type="text" placeholder="전시 시작일은 신청일로부터 7일 이후 날짜로 설정 가능합니다." 
      onChange={handleStartDate}/>

      <div className={styles.categoryName}>전시 마감일</div>
      <input className={styles.textInput} 
      type="text" placeholder="최대 전시 가능한 기간은 90일입니다." 
      onChange={handleEndDate}/>

      <div className={styles.categoryName}>전시 타입</div>
      <div className={styles.types}>
        <input type="radio" name="type" value="1" 
        className={styles.typeBtn} 
        onChange={handleType}/><label className={styles.type}>Standard</label>
        <input type="radio" name="type" value="2" className={styles.typeBtn} 
        onChange={handleType}/><label className={styles.type}>Premium</label>
      </div>

      <div className={styles.categoryName}>전시 장르<span class={styles.subGenre}>(복수선택가능)</span></div>
      <div className={styles.tags}>
        {tags.map((el) => 
            <>
              <input type="checkbox" name={el} value={el} />
              <label className={isClicked.includes(el) ? styles.hashtagClicked : styles.hashtag} onClick={() => tagHandle(el)}>{el}</label>
            </>
        )}
      </div>

      <div className={styles.categoryName}>전시 설명</div>
      <input className={styles.contentInput} 
      type="textarea" placeholder="어떤 전시회인지 간단히 소개해주세요." 
      onChange={handleContent}/>

      {artCount.map(el => 
      <>
        <div className={styles.categoryName}>작품{el}</div>
        <div className={styles.artWrap}>
          <div className={styles.artContent}>
            <input className={styles.artTextInput} 
            type="text" 
            placeholder="작품명" 
            onChange={e => handleArtTitle(el, e)}
            />
            <input className={styles.artTextInput} 
            type="text" 
            placeholder="제작연도/재료/크기" 
            onChange={e => handleArtContent(el, e)}
            />
            <input className={styles.contentInput} 
            type="textarea" 
            placeholder="작품설명" 
            onChange={e => handleArtSubContent(el, e)}
            />
          </div>
          <div className={styles.artFile}>
            <input className={styles.fileInput} 
            type="file" id="ex_file" 
            accept="image/*" 
            onChange={e => handleArtImg(el, e)}
            ></input>
            <img className={styles.artImg} src={
            arts[Number(el-1)].img ? 
            arts[Number(el-1)].img : 
            "../../../images/Black on White.png"
            }
            alt="작품이미지"/>
          </div>
        </div>
      </> 
      )}
      <div className={styles.submit}>
        <button className={styles.submitBtn} onClick={createGallery}>신청</button>
        <Link to="/gallery">
          <button className={styles.submitBtn}>취소</button>
        </Link>
      </div>

      {modalOpen ? //모달창
      <section className={styles.modalContainer}>
        <div className={styles.modalWrap}>
          <span className={styles.modalContent}>전시 신청이 완료되었습니다!</span>
          <p className={styles.modalSubContent}>영업일 기준 7일 이내<br></br>관리자의 승인이 이루어질 예정입니다.</p>
          <div className={styles.ok}>
          <Link to="/gallery">
            <button className={styles.okBtn} 
            onClick={()=>setModalOpen(false)}
            >확인</button>
          </Link>
          </div>
        </div>
      </section>
      : null}

    </section>

  )
  } else if(isAudienceLogin){ // 관람객 로그인 시
    
    return (
      <section className={styles.modalContainer}>
        <div className={styles.modalWrap}>
          <p className={styles.modalContent}>관람객 회원은<br></br>전시 신청이 불가합니다!</p>
          <span className={styles.modalSubContent}>작가 회원으로 로그인 해주세요.</span>
          <div className={styles.ok}>
            <button className={styles.okBtn} onClick={goBack}>닫기</button>
          </div>
        </div>
      </section>
    )

  } else{ //비로그인 시
    
    return (
      <section className={styles.modalContainer}>
        <div className={styles.modalWrap}>
          <p className={styles.modalContent}>전시 신청 서비스는<br></br>로그인이 필요합니다!</p>
          <span className={styles.modalSubContent}>작가 회원으로 로그인 해주세요.</span>
          <div className={styles.ok}>
            <Link to="/signin">
              <button className={styles.okBtn}>로그인 <br></br>하러가기</button>
            </Link>
            <button className={styles.okBtn} onClick={goBack}>닫기</button>
            
          </div>
        </div>
      </section>
    )
     
  }
}

export default withRouter(Register);