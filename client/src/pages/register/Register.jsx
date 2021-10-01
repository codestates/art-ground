import React, { useState } from 'react';
import styles from './Register.module.css';
import AWS from "aws-sdk";
import { Link, useHistory, withRouter } from 'react-router-dom';
import { createExhibition } from '../../api/galleryApi';
import AuthorLogin from '../../components/modals/AuthorLogin';
import RegisterLogin from '../../components/modals/RegisterLogin';
import ConfirmRegister from '../../components/modals/ConfirmRegister';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale'

const Register = ({ userinfo, isLogin }) => {

  const artCount = [];
  for(let i=0; i<9; i++){
    artCount.push(String(i+1));
  } // artCount = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const tags1 = ['#개인전', '#회화', '#순수미술', '#응용미술']
  const tags2 = ['#일러스트', '#판화', '#사진전', "#팝아트"] 
  const tags3 = ['#추상화', '#인물화', '#풍경화', '#정물화']

  const [title, setTitle] = useState(''); //전시명
  const [strStartDate, setStrStartDate] = useState('')
  const [strEndDate, setStrEndDate] = useState('')
  const [startDate, setStartDate] = useState(''); //전시시작일
  const [endDate, setEndDate] = useState(''); //전시마감일
  const [type, setType] = useState('') //전시타입
  const [isClicked, setClicked] = useState([]); //전시장르(해시태그)
  const [content, setContent] = useState(''); //전시 설명
  const [arts, setArts] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}]) //9개 작품 배열

  const [errorMessage, setErrorMessage] = useState(null); //모든 필드값 안 채워졌을 때 띄우는 에러메세지
  const [modalOpen, setModalOpen] = useState(false); //전시 신청 완료 모달창

  const handleTitle = (event) => {
    setTitle(event.target.value);
  }

  const getStringDate = (date) => {
    let sYear = date.getFullYear();
    let sMonth = date.getMonth() + 1;
    let sDate = date.getDate();
    if(sMonth < 9){
      sMonth = "0" + sMonth
    }
    if(sDate < 9){
      sDate = "0" + sDate
    } 
    return `${sYear}-${sMonth}-${sDate}`;
  }

  const handleStartDate = (el) => {
    setStartDate(el);
    setStrStartDate(getStringDate(el));
  }
  const handleEndDate = (el) => {
    setEndDate(el);
    setStrEndDate(getStringDate(el));
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
    if( 
      title === '' ||
      strStartDate === '' ||
      strEndDate === '' ||
      type === '' ||
      isClicked.length === 0 ||
      content === '' ||
      arts.length === 0
    ){
      setErrorMessage("항목을 모두 입력하세요!🙏");
    } else{
      setModalOpen(true);
      setErrorMessage(''); //에러메세지 다시 초기화
      createExhibition(title, strStartDate, strEndDate, type, content, isClicked, arts);
    }
  }

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  if((userinfo && userinfo.user_type === 2) || (userinfo && userinfo.user_type === 3)){ //유효한 회원일 경우만.
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>전시 신청</h2>

      <div className={styles.categoryName}>전시명</div>
      <input className={styles.textInput} 
      type="text" value={title} onChange={handleTitle}/>

      <div className={styles.categoryName}>전시 시작일</div>
      {/* <input className={styles.textInput} 
      type="text" placeholder="전시 시작일은 신청일로부터 7일 이후 날짜로 설정 가능합니다." 
      value={startDate} onChange={handleStartDate}/> */}
      <DatePicker 
      selected={startDate} 
      onChange={el => handleStartDate(el)} 
      startDate={startDate}
      locale={ko}
      dateFormat="yyyy-MM-dd"
      className={styles.textInput} 
      />

      <div className={styles.categoryName}>전시 마감일</div>
      {/* <input className={styles.textInput} 
      type="text" placeholder="최대 전시 가능한 기간은 90일입니다." 
      value={endDate} onChange={handleEndDate}/> */}
      <DatePicker 
      selected={endDate} 
      onChange={el => handleEndDate(el)} 
      endDate={endDate}
      locale={ko}
      dateFormat="yyyy-MM-dd"
      className={styles.textInput} 
      />

      <div className={styles.categoryName}>전시 타입</div>
      <div className={styles.types}>
        <input type="radio" name="type" value="1" 
        className={styles.typeBtn} 
        onChange={handleType}/><label className={styles.type}>Standard</label>
        <input type="radio" name="type" value="2" className={styles.typeBtn} 
        onChange={handleType}/><label className={styles.type}>Premium</label>
      </div>

      <div className={styles.categoryName}>전시 장르<span class={styles.subGenre}>(복수선택가능)</span></div>
      <div className={styles.tagsWrap}> 
        {[tags1, tags2, tags3].map((el) => 
          <div className={styles.tags}>
            {el.map((el) => 
              <>
                <input type="checkbox" name={el} value={el} />
                <label className={isClicked.includes(el) ? styles.hashtagClicked : styles.hashtag} 
                onClick={() => tagHandle(el)}>{el}</label>
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.categoryName}>전시 설명</div>
      <textarea className={styles.contentInput} 
      value={content}
      placeholder="어떤 전시회인지 간단히 소개해주세요(100자 내외)" 
      onChange={handleContent}/>

      {artCount.map(el => 
      <>
        <div className={styles.categoryName}>작품{el}</div>
        <div className={styles.artWrap}>
          <div className={styles.artContent}>
            <input className={styles.artTextInput} 
            type="text" 
            placeholder="작품명" 
            value={arts[Number(el-1)].title}
            onChange={e => handleArtTitle(el, e)}
            />
            <input className={styles.artTextInput} 
            type="text" 
            placeholder="제작연도/재료/크기" 
            value={arts[Number(el-1)].content}
            onChange={e => handleArtContent(el, e)}
            />
            <textarea className={styles.contentInput} 
            type="textarea" 
            placeholder="작품설명" 
            value={arts[Number(el-1)].subContent}
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
            arts[Number(el-1)].img || "https://husmen.xyz/portfolio/scope-timer/featured.png"
            }
            alt="art_img"/>
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
      <div className={styles.error}>{errorMessage}</div>

      {modalOpen ? //전시 신청 완료되었음을 알리는 모달창
      <ConfirmRegister closeModal={closeModal} />
      : null}

    </section>
  )
  } else if(userinfo && userinfo.user_type === 1){ // 관람객 로그인 시 모달창
    return <AuthorLogin goBack={goBack}/>
  } else if(!userinfo && !isLogin){ //비로그인 시 모달창
    return <RegisterLogin goBack={goBack} />
  }
}

export default withRouter(Register);