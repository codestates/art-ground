import styles from "./MyPage.module.css";
import React, { useEffect, useState } from "react";
import MyInfo from "../../components/myinfo/MyInfo";
import MyPick from "../../components/mypick/MyPick";
import axios from "axios";
import MyExhibit from "../../components/myexhibition/MyExhibit";
import SideBar from "../../components/sidebar/SideBar";

axios.defaults.withCredentials = true;

const MyPage = ({ userinfo, handleResponseSuccess }) => {
  const [isInfoClicked, setIsInfoClicked] = useState(true);
  const [isPickClicked, setIsPickClicked] = useState(false);
  const [isMyExhibit, setIsMyExhibit] = useState(false);
  const [isMyAuction, setIsMyAction] = useState(false);

  const colorChange = !isInfoClicked ? styles.category : styles.clickCate;
  const colorChange2 = !isPickClicked ? styles.category : styles.clickCate;
  const colorChange3 = !isMyExhibit ? styles.category : styles.clickCate;
  const colorChange4 = !isMyAuction ? styles.category : styles.clickCate;

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
          <div className={`${colorChange}`} onClick={clickInfo}>
            내 정보보기
          </div>
          <div className={`${colorChange2}`} onClick={clickMyPick}>
            찜한 전시회
          </div>
          <div className={`${colorChange3}`} onClick={clickMyExhibit}>
            내 전시회
          </div>
          <div className={`${colorChange4}`} onClick={clickMyauction}>
            내경매
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {isInfoClicked ? <MyInfo userinfo={userinfo} /> : null}
        {isPickClicked ? <MyPick /> : null}
        {isMyExhibit ? <MyExhibit /> : null}
        {isMyAuction ? <SideBar /> : null}
      </div>
    </section>
  );
};

export default MyPage;
