import styles from "./Modify.module.css";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { Link } from "react-router-dom";
import InfoModify from "../../components/infoModify/InfoModify";
import PassModify from "../../components/passModify/PassModify";
const CryptoJS = require("crypto-js");
require("dotenv").config();

const Modify = ({ userinfo, setUserinfo }) => {
  const history = useHistory();
  //console.log(userinfo);
  const [editFront, setEditFront] = useState(true);
  const [infoEditPage, setInfoEditPage] = useState(false);
  const [passEditPage, setPassEditPage] = useState(false);

  const clickInfoEdit = () => {
    setEditFront(false);
    setInfoEditPage(true);
    setPassEditPage(false);
  };

  const clickPassEdit = () => {
    setEditFront(false);
    setInfoEditPage(false);
    setPassEditPage(true);
  };

  const img = !userinfo.profile_img
    ? "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png"
    : userinfo.profile_img;
  return (
    <section className={styles.container}>
      {editFront ? (
        <div className={styles.topBox}>
          <div className={styles.contentBorder}>
            <main className={styles.infoEdit}>
              <div className={styles.infoTitle}>art-Ground 프로필</div>
              <div className={styles.infoContent}>
                <span className={styles.imgBorder}>
                  <img className={styles.ProfileView} src={img} alt="" />
                </span>
                <span className={styles.nickName}>
                  <span>닉네임 :</span>
                  <span>{userinfo.nickname}</span>
                </span>
              </div>
              <div className={styles.infoBtnBox}>
                <button className={styles.infoBtn} onClick={clickInfoEdit}>
                  수정
                </button>
              </div>
            </main>
            <main className={styles.passEdit}>
              <div className={styles.infoTitle}>비밀번호</div>

              <div className={styles.PassBtnBox}>
                <button className={styles.passBtn} onClick={clickPassEdit}>
                  비밀번호수정
                </button>
              </div>
            </main>
          </div>
        </div>
      ) : null}
      {infoEditPage ? (
        <InfoModify
          userinfo={userinfo}
          setInfoEditPage={setInfoEditPage}
          setEditFront={setEditFront}
          setUserinfo={setUserinfo}
        />
      ) : null}
      {passEditPage ? (
        <PassModify
          userinfo={userinfo}
          setPassEditPage={setPassEditPage}
          setEditFront={setEditFront}
          setUserinfo={setUserinfo}
        />
      ) : null}
    </section>
  );
};

export default Modify;
