import styles from "./MyInfo.module.css";

import React from "react";
import { useHistory } from "react-router";

const MyInfo = () => {
  const history = useHistory();

  const modifyCLick = () => {
    history.push("/modify");
  };
  const deleteAccount = () => {
    //탈퇴요청보내기
  };
  return (
    <section className={styles.container}>
      <div className={styles.infobox1}>
        <div className={styles.imgbox}>
          <div className={styles.imgborder}>
            {/* <img src="" alt=""></img> */}
          </div>
        </div>
        <div className={styles.textbox}>
          <ul className={styles.ulbox}>
            <li className={styles.libox}>
              <span className={styles.title}>이메일</span>
              <input
                type="text"
                className={styles.inputbox}
                defaultValue="tkdkagody@naver.com"
                readOnly
              ></input>
            </li>
            <li className={styles.libox}>
              <span className={styles.title}>닉네임</span>
              <input
                type="text"
                className={styles.inputbox}
                defaultValue="유다다"
                readOnly
              ></input>
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
            defaultValue="안녕하세요 인물사진 전문가 유다다입니다. 많은 관심부탁드립니다"
            readOnly
          ></textarea>
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
    </section>
  );
};

export default MyInfo;
