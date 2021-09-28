import styles from "./MyInfo.module.css";

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { getMyinfo } from "../../api/mypageApi";

const MyInfo = ({ userinfo, setUserinfo, setIsLogin }) => {
  const history = useHistory();

  const modifyCLick = () => {
    history.push("/modify");
  };
  const deleteAccount = () => {
    axios
      .delete("https://art-ground.link/mypage")
      .then((result) => {
        console.log(result, "탈퇴!");
        setUserinfo(null);
        setIsLogin(false);
        history.push("./about");
      })
      .catch((err) => console.log(err));
  };

  const img = !userinfo.profile_img
    ? "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png"
    : userinfo.profile_img;

  // useEffect(() => {
  //   setTimeout(() => {
  //     axios.get("https://localhost:5000/mypage").then((result) => {
  //       console.log(result);
  //     });
  //   }, 1000);

  //   return () => {};
  // }, []);
  return (
    <section className={styles.container}>
      <>
        <div className={styles.infobox1}>
          <div className={styles.imgbox}>
            <div className={styles.imgborder}>
              <img className={styles.ProfileView} src={img} alt="profileImg" />
            </div>
          </div>
          <div className={styles.textbox}>
            <ul className={styles.ulbox}>
              <li className={styles.libox}>
                <span className={styles.title}>이메일</span>
                <input
                  type="text"
                  className={styles.inputbox}
                  defaultValue={userinfo.user_email}
                  readOnly
                />
              </li>
              <li className={styles.libox}>
                <span className={styles.title}>닉네임</span>
                <input
                  type="text"
                  className={styles.inputbox}
                  defaultValue={userinfo.nickname}
                  readOnly
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.infobox2}>
          <div className={styles.authorinfo}>
            <div className={styles.authorinfoTitle}>작가소개</div>
            <textarea
              name="textarea"
              cols="80"
              rows="8"
              id="textarea"
              className={styles.authorText}
              placeholder="작가님을 소개해주세요"
              defaultValue={userinfo.author_desc}
              readOnly
            />
          </div>
        </div>
        <div className={styles.infobox3}>
          <button className={styles.delete} onClick={deleteAccount}>
            회원탈퇴
          </button>
          <button className={styles.modify} onClick={modifyCLick}>
            정보수정
          </button>
        </div>
      </>
    </section>
  );
};

export default MyInfo;
