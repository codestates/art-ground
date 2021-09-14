import styles from "./MyPage.module.css";
import React, { useState } from "react";
import MyInfo from "../../components/myinfo/MyInfo";
import MyPick from "../../components/mypick/MyPick";
import axios from "axios";
import MyExhibit from "../../components/myexhibition/MyExhibit";
import SideBar from "../../components/sidebar/SideBar";

axios.defaults.withCredentials = true;

const MyPage = () => {
  const [isInfoClicked, setIsInfoClicked] = useState(true);
  const [isPickClicked, setIsPickClicked] = useState(false);
  const [isMyExhibit, setIsMyExhibit] = useState(false);
  const [isMyAuction, setIsMyAction] = useState(false);

  const clickInfo = () => {
    setIsInfoClicked(true);
    setIsPickClicked(false);
    setIsMyExhibit(false);
    setIsMyAction(false);
  };

  const clickMyPick = () => {
    setIsInfoClicked(false);
    setIsPickClicked(true);
    setIsMyExhibit(false);
    setIsMyAction(false);
    //내가 찜한 전시회 정보 불러오기
    // axios.get(``)
    // .then((result) => {})
  };
  const clickMyExhibit = () => {
    setIsInfoClicked(false);
    setIsPickClicked(false);
    setIsMyExhibit(true);
    setIsMyAction(false);
  };
  const clickMyauction = () => {
    setIsInfoClicked(false);
    setIsPickClicked(false);
    setIsMyExhibit(false);
    setIsMyAction(true);
  };

  return (
    <section className={styles.container}>
      <div className={styles.side}>
        <div className={styles.sidebar}>
          <div className={styles.category} onClick={clickInfo}>
            내 정보보기
          </div>
          <div className={styles.category} onClick={clickMyPick}>
            찜한 전시회
          </div>
          <div className={styles.category} onClick={clickMyExhibit}>
            내 전시회
          </div>
          <div className={styles.category} onClick={clickMyauction}>
            내가 참여한 경매(opt)
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {isInfoClicked ? <MyInfo /> : null}
        {isPickClicked ? <MyPick /> : null}
        {isMyExhibit ? <MyExhibit /> : null}
        {isMyAuction ? <SideBar /> : null}
      </div>
    </section>
  );
};

export default MyPage;
