import styles from "./Modify.module.css";

import React from "react";
import { useHistory } from "react-router";

const Modify = () => {
  const history = useHistory();

  const cancleClick = () => {
    history.push("/mypage");
  };
  return (
    <section className={styles.container}>
      {/* 1번박스 */}
      <div className={styles.imgBox}>
        <label for="imgFile" className={styles.imgBorder}>
          <img
            className={styles.ProfileView}
            src="../../../images/author.webp"
            alt=""
          ></img>
        </label>
        <label className={styles.editbox} for="imgFile">
          <img
            src="../../../images/camera.svg"
            alt=""
            className={styles.edit}
          ></img>
        </label>
        <input
          type="file"
          id="imgFile"
          accept="image/*"
          className={styles.imgInput}
        ></input>
      </div>
      {/* 2번박스 */}
      <div className={styles.modiBox}>
        <ul className={styles.ulbox}>
          <li className={styles.libox}>
            <span className={styles.titlebox}>이 메 일</span>
            <input
              type="text"
              value=""
              className={styles.inputedit}
              readOnly
            ></input>
          </li>
          <li className={styles.libox}>
            <span className={styles.titlebox}>닉 네 임</span>
            <input type="text" value="" className={styles.inputedit}></input>
          </li>
          <li className={styles.libox}>
            <span className={styles.titlebox}>비밀번호</span>
            <input type="text" value="" className={styles.inputedit}></input>
          </li>
          <li className={styles.libox}>
            <span className={styles.titlebox}>비밀번호확인</span>
            <input type="text" value="" className={styles.inputedit}></input>
          </li>
          <li className={styles.passcheck}>유효성검사-비밀번호none</li>
        </ul>
      </div>
      {/* 3번박스 */}
      <div className={styles.modiBox}>
        <div className={styles.authTitle}>작가소개</div>
        <textarea
          name="textarea"
          cols="75"
          rows="15"
          id="textarea"
          className={styles.authorText}
          defaultValue="무용가들의 우아한 동작과 섬세한 표정을 고스란히 담아내는 무용 사진가입니다. 무용가를 전문적으로 촬영한다는 점도 무척 신기한데, 마치 무대 위에서 함께 연기를 하기라도 한 듯 실감나게 표현한다는 점은 더욱 놀랍습니다. 그리고, 김윤식 작가가 체코국립발레단 소속의 현역 발레리노라는 사실까지 알게 되면 그에 대한 호기심은 더욱 커집니다. "
        ></textarea>
      </div>
      {/* 4번박스 */}
      <div className={styles.modiBox}>
        <button className={styles.btn1} onClick={cancleClick}>
          수정취소
        </button>
        <button className={styles.btn2}>정보수정</button>
      </div>
    </section>
  );
};

export default Modify;
