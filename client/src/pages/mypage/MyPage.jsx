import styles from "./MyPage.module.css";
import React, { useEffect, useState } from "react";
import MyInfo from "../../components/myinfo/MyInfo";
import MyPick from "../../components/mypick/MyPick";
import axios from "axios";
import MyExhibit from "../../components/myexhibition/MyExhibit";
import SideBar from "../../components/sidebar/SideBar";
import Loading from "../../components/loading/Loading";
import { getMyExhibition, getMyPickExhibiton } from "../../api/mypageApi";

axios.defaults.withCredentials = true;
const MyPage = ({ userinfo, setUserinfo, editedInfo, setEditedRender }) => {
  const [isInfoClicked, setIsInfoClicked] = useState(true);
  const [isPickClicked, setIsPickClicked] = useState(false);
  const [isMyExhibit, setIsMyExhibit] = useState(false);

  const [myEx, setMyEx] = useState(null);
  const [myPick, setMyPick] = useState(null);

  const colorChange = !isInfoClicked ? styles.category : styles.clickCate;
  const colorChange2 = !isPickClicked ? styles.category : styles.clickCate;
  const colorChange3 = !isMyExhibit ? styles.category : styles.clickCate;

  const clickInfo = () => {
    setIsInfoClicked(true);
    setIsPickClicked(false);
    setIsMyExhibit(false);
  };

  const clickMyPick = () => {
    setIsInfoClicked(false);
    setIsPickClicked(true);
    setIsMyExhibit(false);
  };

  const clickMyExhibit = () => {
    setIsInfoClicked(false);
    setIsPickClicked(false);
    setIsMyExhibit(true);
  };

  const [infoRender, setInfoRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInfoRender(true);
    }, 1000);
  });

  useEffect(() => {
    if (isMyExhibit) {
      getMyExhibition(setMyEx);
    }
    return () => {
      getMyExhibition(setMyEx);
    };
  }, [isMyExhibit]);

  useEffect(() => {
    if (isPickClicked) {
      getMyPickExhibiton(setMyPick);
    }
    return () => {
      getMyPickExhibiton(setMyPick);
    };
  }, [isPickClicked]);

  //************마이페이지 랜더 작업************* */
  // console.log(userinfo, "기존 값");
  // const [editedInfo, setEditedInfo] = useState(null);
  // const [editedRender, setEditedRender] = useState(false); //인포 받아온 경우 다시 렌더링읠 위함
  // useEffect(() => {
  //   setTimeout(() => {
  //     axios.get("https://localhost:5000/mypage").then((result) => {
  //       console.log(result.data.data, "새로 받아온 값????");
  //     });
  //   }, 1000);
  // });

  //****************마이페에지 렌더 끝******************* */

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
          {userinfo.user_type === 2 ? (
            <div className={`${colorChange3}`} onClick={clickMyExhibit}>
              내 전시회
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.content}>
        {isInfoClicked ? (
          <>
            {infoRender ? (
              <MyInfo
                userinfo={userinfo}
                setUserinfo={setUserinfo}
                editedInfo={editedInfo}
               
              />
            ) : (
              <Loading />
            )}
          </>
        ) : null}

        {isPickClicked ? (
          <>
            {infoRender ? (
              <>
                {myPick ? (
                  <>
                    {myPick.map((el, idx) => {
                      return <MyPick key={idx} el={el} />;
                    })}
                  </>
                ) : (
                  <SideBar />
                )}
              </>
            ) : null}
          </>
        ) : null}
        {isMyExhibit ? (
          <>
            {myEx ? (
              <>
                {myEx.map((el, idx) => {
                  return <MyExhibit key={idx} el={el} />;
                })}
              </>
            ) : (
              <SideBar />
            )}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default MyPage;
