import React, { useState } from 'react';
import styles from './Register.module.css';
import AWS from "aws-sdk";

const Register = (props) => {

  const artCount = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const tags = ['#현대미술', '#일러스트레이션', '#회화'] //더미카테고리
  
  const [title, setTitle] = useState(''); //전시명
  const [startDate, setStartDate] = useState(''); //전시시작일
  const [endDate, setEndDate] = useState(''); //전시마감일
  const [type, setType] = useState('') //전시타입
  const [isClicked, setClicked] = useState([]); //전시장르

  const [art1, setArt1] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art2, setArt2] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art3, setArt3] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art4, setArt4] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art5, setArt5] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art6, setArt6] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art7, setArt7] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art8, setArt8] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  const [art9, setArt9] = useState({
    title: '',
    content: '',
    subContent: '',
    img: null
  });
  
  const arts = [art1, art2, art3, art4, art5, art6, art7, art8, art9]; //작폼 9개 배열

  const handleTitle = (event) => {
    setTitle(event.target.value);
  }
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  }
  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  }

  const tagHandle = (tag) => {
    if (isClicked.includes(tag)) {
      setClicked(isClicked.filter((el) => !(el === tag)));
    } else {
      setClicked(isClicked.concat(tag));
    }
  };

  const handleType = (event) => {
    setType(event.target.value)
  }

  const handleArtTitle = (el, e) => {
    if(el ===  '1'){
      setArt1({title: e.target.value, content: art1.content, subContent: art1.subContent, img: art1.img})
    } else if(el ==='2'){
      setArt2({title: e.target.value, content: art2.content, subContent: art2.subContent, img: art2.img})
    } else if(el ==='3'){
      setArt3({title: e.target.value, content: art3.content, subContent: art3.subContent, img: art3.img})
    } else if(el ==='4'){
      setArt4({title: e.target.value, content: art4.content, subContent: art4.subContent, img: art4.img})
    } else if(el ==='5'){
      setArt5({title: e.target.value, content: art5.content, subContent: art5.subContent, img: art5.img})
    } else if(el ==='6'){
      setArt6({title: e.target.value, content: art6.content, subContent: art6.subContent, img: art6.img})
    } else if(el ==='7'){
      setArt7({title: e.target.value, content: art7.content, subContent: art7.subContent, img: art7.img})
    } else if(el ==='8'){
      setArt8({title: e.target.value, content: art8.content, subContent: art8.subContent, img: art8.img})
    } else{ //9일때
      setArt9({title: e.target.value, content: art9.content, subContent: art9.subContent, img: art9.img})
    }
  }
  const handleArtContent = (el, e) => {
    if(el ===  '1'){
      setArt1({title: art1.title, content: e.target.value, subContent: art1.subContent, img: art1.img})
    } else if(el ==='2'){
      setArt2({title: art2.title, content: e.target.value, subContent: art2.subContent, img: art2.img})
    } else if(el ==='3'){
      setArt3({title: art3.title, content: e.target.value, subContent: art3.subContent, img: art3.img})
    } else if(el ==='4'){
      setArt4({title: art4.title, content: e.target.value, subContent: art4.subContent, img: art4.img})
    } else if(el ==='5'){
      setArt5({title: art5.title, content: e.target.value, subContent: art5.subContent, img: art5.img})
    } else if(el ==='6'){
      setArt6({title: art6.title, content: e.target.value, subContent: art6.subContent, img: art6.img})
    } else if(el ==='7'){
      setArt7({title: art7.title, content: e.target.value, subContent: art7.subContent, img: art7.img})
    } else if(el ==='8'){
      setArt8({title: art8.title, content: e.target.value, subContent: art8.subContent, img: art8.img})
    } else{ //9일때
      setArt9({title: art9.title, content: e.target.value, subContent: art9.subContent, img: art9.img})
    }
  }
  const handleArtSubContent = (el, e) => {
    if(el ===  '1'){
      setArt1({title: art1.title, content: art1.content, subContent: e.target.value, img: art1.img})
    } else if(el ==='2'){
      setArt2({title: art2.title, content: art2.content, subContent: e.target.value, img: art2.img})
    } else if(el ==='3'){
      setArt3({title: art3.title, content: art3.content, subContent: e.target.value, img: art3.img})
    } else if(el ==='4'){
      setArt4({title: art4.title, content: art4.content, subContent: e.target.value, img: art4.img})
    } else if(el ==='5'){
      setArt5({title: art5.title, content: art5.content, subContent: e.target.value, img: art5.img})
    } else if(el ==='6'){
      setArt6({title: art6.title, content: art6.content, subContent: e.target.value, img: art6.img})
    } else if(el ==='7'){
      setArt7({title: art7.title, content: art7.content, subContent: e.target.value, img: art7.img})
    } else if(el ==='8'){
      setArt8({title: art8.title, content: art8.content, subContent: e.target.value, img: art8.img})
    } else{ //9일때
      setArt9({title: art9.title, content: art9.content, subContent: e.target.value, img: art9.img})
    }
  }

  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a17da5be-96ef-4046-aaa8-62455cef2362", // cognito 인증 풀에서 받아온 키
    }),
  });

  const handleArtImg = (el, e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) {
      if(el ===  '1'){
        return setArt1({title: art1.title, content: art1.content, subContent: art1.subContent, img: null})
      } else if(el ==='2'){
        return setArt2({title: art2.title, content: art2.content, subContent: art2.subContent, img: null})
      } else if(el ==='3'){
        return setArt3({title: art3.title, content: art3.content, subContent: art3.subContent, img: null})
      } else if(el ==='4'){
        return setArt4({title: art4.title, content: art4.content, subContent: art4.subContent, img: null})
      } else if(el ==='5'){
        return setArt5({title: art5.title, content: art5.content, subContent: art5.subContent, img: null})
      } else if(el ==='6'){
        return setArt6({title: art6.title, content: art6.content, subContent: art6.subContent, img: null})
      } else if(el ==='7'){
        return setArt7({title: art7.title, content: art7.content, subContent: art7.subContent, img: null})
      } else if(el ==='8'){
        return setArt8({title: art8.title, content: art8.content, subContent: art8.subContent, img: null})
      } else{ //9일때
        return setArt9({title: art9.title, content: art9.content, subContent: art9.subContent, img: null})
      }
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
        if(el ===  '1'){
          setArt1({title: art1.title, content: art1.content, subContent: art1.subContent, img: data.Location})
        } else if(el ==='2'){
          setArt2({title: art2.title, content: art2.content, subContent: art2.subContent, img: data.Location})
        } else if(el ==='3'){
          setArt3({title: art3.title, content: art3.content, subContent: art3.subContent, img: data.Location})
        } else if(el ==='4'){
          setArt4({title: art4.title, content: art4.content, subContent: art4.subContent, img: data.Location})
        } else if(el ==='5'){
          setArt5({title: art5.title, content: art5.content, subContent: art5.subContent, img: data.Location})
        } else if(el ==='6'){
          setArt6({title: art6.title, content: art6.content, subContent: art6.subContent, img: data.Location})
        } else if(el ==='7'){
          setArt7({title: art7.title, content: art7.content, subContent: art7.subContent, img: data.Location})
        } else if(el ==='8'){
          setArt8({title: art8.title, content: art8.content, subContent: art8.subContent, img: data.Location})
        } else{ //9일때
          setArt9({title: art9.title, content: art9.content, subContent: art9.subContent, img: data.Location})
        }
      },
      function (err) {
        console.log(err);
      }
    );
  };

  const createGallery = () => {
    // axios.post(
    //   "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/posting",
    //   {
    //     // title: title,
    //     // choice_1: firstOpt,
    //     // choice_2: secondOpt,
    //     // img_1: firstImg, //url
    //     // img_2: secondImg, //url
    //     // contents: content,
    //     // hashTags: JSON.stringify(isClicked), //배열이니까 JSON?
    //   },
    //   {
    //     headers: {
    //       authorization: accessToken,
    //     },
    //     "Content-Type": "application/json",
    //   }
    // );

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
      <div className={styles.categoryName}>전시 타입</div>
      <div className={styles.types}>
        <input type="radio" name="type" value="1" className={styles.typeBtn} onChange={handleType}/><label className={styles.type}>Standard</label>
        <input type="radio" name="type" value="2" className={styles.typeBtn} onChange={handleType}/><label className={styles.type}>Premium</label>
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
            <input className={styles.fileInput} type="file" id="ex_file" accept="image/*" onChange={e => handleArtImg(el, e)}></input>
            <img className={styles.artImg} src={
              el === '1' ? 
              art1.img ? art1.img : "../../../images/Black on White.png":
              el === '2' ?
              art2.img ? art2.img : "../../../images/Black on White.png":
              el === '3' ? 
              art3.img ? art3.img : "../../../images/Black on White.png":
              el === '4' ?
              art4.img ? art4.img : "../../../images/Black on White.png":
              el === '5' ? 
              art5.img ? art5.img : "../../../images/Black on White.png":
              el === '6' ?
              art6.img ? art6.img : "../../../images/Black on White.png":
              el === '7' ? 
              art7.img ? art7.img : "../../../images/Black on White.png":
              el === '8' ?
              art8.img ? art8.img : "../../../images/Black on White.png":
              art9.img ? art9.img : "../../../images/Black on White.png"
            }  alt="작품이미지"/>
          </div>
        </div>
      </> 
      )}
      <div className={styles.submit}>
        <button className={styles.submitBtn} onClick={createGallery}>신청</button>
        <button className={styles.submitBtn}>취소</button>
      </div>

    </section>
  )
}

export default Register;