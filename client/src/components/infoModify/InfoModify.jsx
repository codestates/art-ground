import React from "react";
import { Link } from "react-router-dom";
import styles from "./InfoModify.module.css";
import { useHistory } from "react-router";
import { useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
const CryptoJS = require("crypto-js");
require("dotenv").config();

axios.defaults.withCredentials = true;

const InfoModify = ({ userinfo, setInfoEditPage }) => {
  const history = useHistory();

  const [userMail, setUserMail] = useState(userinfo.user_email);
  const [nickName, setNickName] = useState(userinfo.nickname);
  const [img, setImg] = useState(userinfo.profile_img);
  const [authDesc, setAuthDesc] = useState(userinfo.authorDesc);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(userMail);
  const secretKey = process.env.CRYPTOJS_SECRETKEY;

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a17da5be-96ef-4046-aaa8-62455cef2362",
    }),
  });

  // 이미지 핸들링
  const imgHandle = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) {
      return setImg(null);
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
        setImg(data.Location); // 생성된 링크 넣어줌
        console.log(data.Location);
      },
      function (err) {
        console.log(err);
      }
    );
  };

  const emailHandle = (event) => {
    setUserMail(event.target.value);
  };
  const nickNameHandle = (event) => {
    setNickName(event.target.value);
  };
  const passHandle = (event) => {
    setPassword(event.target.value);
  };
  const passHandle2 = (event) => {
    setPassword2(event.target.value);
  };
  const authDescHandle = (event) => {
    setAuthDesc(event.target.value);
  };

  const clickDone = () => {
    if (!password) {
      setErrorMessage("비밀번호를 입력해야 수정이 가능합니다.");
      return false;
    } else {
      setErrorMessage("");
    }
    if (password !== password2) {
      setErrorMessage("동일한 비밀번호를 한번더 입력해주세요");
      return false;
    } else {
      setErrorMessage("");
    }
    setModalOpen(true);
  };

  const clickModify = () => {
    setModalOpen(false);
    //암호화
    if (password) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        JSON.stringify(password),
        secretKey
      ).toString();

      const userData = {
        nickName: nickName,
        profileImg: img,
        authorDesc: authDesc,
      };

      axios
        .post("https://localhost:5000/mapage", {
          userData,
        })
        .then((result) => {
          console.log(result, "인포수정 응답!");
          history.push("./mypage");
        })
        .catch((err) => console.log(err));
    }
  };

  const cancleClick = () => {
    setInfoEditPage(false);
  };

  return (
    <section className={styles.container}>
      {/* 1번박스 */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.contentBorder}>
          <div className={styles.imgBox}>
            <label for="imgFile" className={styles.imgBorder}>
              <img className={styles.ProfileView} src={img} alt="" />
            </label>
            <label className={styles.editbox} for="imgFile">
              <img
                src="../../../images/camera.svg"
                alt=""
                className={styles.camera}
              />
            </label>
            <input
              type="file"
              id="imgFile"
              accept="image/*"
              onChange={imgHandle}
              className={styles.imgInput}
            />
          </div>

          {/* 2번박스 */}
          <div className={styles.infoModiBox}>
            <ul className={styles.ulbox}>
              <li className={styles.libox}>
                <span className={styles.titlebox}>이 메 일</span>
                <input
                  type="text"
                  value={userMail}
                  className={styles.inputedit}
                  onChange={emailHandle}
                  readOnly
                />
              </li>
              <li className={styles.libox}>
                <span className={styles.titlebox}>닉 네 임</span>
                <input
                  type="text"
                  value={nickName}
                  className={styles.inputedit}
                  onChange={nickNameHandle}
                />
              </li>
            </ul>
          </div>
          {/* 3번박스 */}
          <div className={styles.authModiBox}>
            <div className={styles.authTitle}>작가소개</div>
            <textarea
              name="textarea"
              cols="75"
              rows="15"
              id="textarea"
              className={styles.authorText}
              defaultValue={authDesc}
              onChange={authDescHandle}
            />
          </div>
          {/* 4번박스 */}
          <div className={styles.btnModiBox}>
            <button className={styles.btn1} onClick={cancleClick}>
              수정취소
            </button>
            <button className={styles.btn2} onClick={clickDone}>
              수정완료
            </button>
          </div>
        </div>
        {modalOpen ? (
          <section className={styles.modalContainer}>
            <div className={styles.modalBox}>
              <span className={styles.modalText}>정말 수정하시겠습니까?</span>
              <div className={styles.btnBox}>
                <button
                  className={styles.modifyBtn}
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  아니오
                </button>
                <Link to="/Mypage">
                  <button className={styles.modifyBtn} onClick={clickModify}>
                    수정하기
                  </button>
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </form>
    </section>
  );
};

export default InfoModify;
