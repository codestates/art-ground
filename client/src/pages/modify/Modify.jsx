import styles from "./Modify.module.css";
import { useHistory } from "react-router";
import { useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { Link } from "react-router-dom";
import InfoModify from "../../components/infoModify/InfoModify";
const CryptoJS = require("crypto-js");
require("dotenv").config();

const Modify = ({ userinfo }) => {
  const history = useHistory();
  console.log(userinfo);

  const [infoEditPage, setInfoEditPage] = useState(false);
  const [passEditPage, setPassEditPage] = useState(false);

  const clickInfoEdit = () => {
    setInfoEditPage(true);
    setPassEditPage(false);
  };

  const clickPassEdit = () => {
    setInfoEditPage(false);
    setPassEditPage(true);
  };
  const clickBack = () => {
    history.push("/mypage");
  };

  const img = !userinfo.profile_img
    ? "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png"
    : userinfo.profile_img;
  return (
    <section className={styles.container}>
      {!infoEditPage ? (
        <div className={styles.topBox}>
          <div className={styles.contentBorder}>
            <main className={styles.infoEdit}>
              <div className={styles.infoTitle}>프로필 수정</div>
              <div className={styles.infoContent}>
                <span className={styles.imgBorder}>
                  <img className={styles.ProfileView} src={img} alt="" />
                </span>
                <span className={styles.nickName}>
                  <span>닉네임:</span>
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
              <div className={styles.infoTitle}>비밀번호 수정</div>
              <div className={styles.infoContent}>
                <span className={styles.nickName}>
                  <span>비밀번호:</span>
                </span>
              </div>
              <div className={styles.infoBtnBox}>
                <button className={styles.infoBtn} onClick={clickPassEdit}>
                  비밀번호수정
                </button>
              </div>
            </main>
          </div>
          <div style={{ cursor: "pointer" }} onClick={clickBack}>
            마이페이지로 go{" "}
          </div>
        </div>
      ) : (
        <InfoModify userinfo={userinfo} setInfoEditPage={setInfoEditPage} />
      )}
    </section>
  );
};

export default Modify;
