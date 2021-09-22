import styles from "./AdminEx.module.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEx = ({
  updateEx,
  deleteEx,
  setUpdateEx,
  setDeleteEx,
  isAdmin,
  setisAdmin,
}) => {
  const [exData, setExData] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  //승인여부컬럼에 따라서 상태값을 추가 -> 조건문으로 걸러서 렌더링 해주면 될듯!

  // if (isAdmin) {
  //   axios.get("https://art-ground.link/admin").then((result) => {
  //     //모든 전시회 신청내역을 받아올 수 있음
  //     //console.log(result.data.data);
  //     //JSON.stringify(result.data.data);
  //     setExData(
  //
  //     );
  //   });
  // }

  useEffect(() => {
    setExData([
      {
        id: 1,
        title: "유다희개인전",
        startDate: "10 / 16",
        endDate: "12 / 26",
        exhibitType: "standard",
        exhibitInfo: "content",
        images:
          "http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg",
        createdAt: "2021-09-10",
        updatedAt: "2021-09-10",
      },
      {
        id: 2,
        title: "박지영개인전",
        startDate: "12 / 16",
        endDate: "01 / 05",
        exhibitType: "standard",
        exhibitInfo: "content",
        images:
          "http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg",
        createdAt: "2021-09-10",
        updatedAt: "2021-09-10",
      },
      {
        id: 3,
        title: "문순려개인전",
        startDate: "09 / 16",
        endDate: "12 / 26",
        exhibitType: "standard",
        exhibitInfo: "content",
        images:
          "http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg",
        createdAt: "2021-09-10",
        updatedAt: "2021-09-10",
      },
      {
        id: 4,
        title: "이동욱개인전",
        startDate: "05 / 26",
        endDate: "12 / 26",
        exhibitType: "standard",
        exhibitInfo: "content",
        images:
          "http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg",
        createdAt: "2021-09-10",
        updatedAt: "2021-09-10",
      },
      {
        id: 4,
        title: "이동욱개인전",
        startDate: "05 / 26",
        endDate: "12 / 26",
        exhibitType: "standard",
        exhibitInfo: "content",
        images:
          "http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg",
        createdAt: "2021-09-10",
        updatedAt: "2021-09-10",
      },
      {
        id: 4,
        title: "이동욱개인전",
        startDate: "05 / 26",
        endDate: "12 / 26",
        exhibitType: "standard",
        exhibitInfo: "content",
        images:
          "http://www.news-paper.co.kr/news/photo/201903/39919_25361_5530.jpg",
        createdAt: "2021-09-10",
        updatedAt: "2021-09-10",
      },
    ]);
  }, []);

  const clickUpdate = () => {
    setUpdateEx(true);
    setDeleteEx(false);
  };
  const clickDelete = () => {
    setUpdateEx(false);
    setDeleteEx(true);
  };

  const confirmBtn = () => {
    //승인하기 요청
    setExData({
      ...exData,
      okType: "done",
    });
  };
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.filterBox}>
          <span className={styles.filterBtn} onClick={clickUpdate}>
            승인대기
          </span>
          <span className={styles.filterBtn} onClick={clickDelete}>
            마감대기
          </span>
        </div>
        {updateEx ? (
          <div className={styles.upDateBox}>
            {exData ? (
              <>
                {exData.map((el, idx) => {
                  return (
                    <div className={styles.exBox}>
                      <div className={styles.thumBox}>
                        <img src={el.images} alt="" className={styles.eximg} />
                      </div>
                      <div className={styles.infoBox}>
                        <div className={styles.title}>{el.title}</div>
                        <div className={styles.date}>
                          <span>전시기간:</span>
                          <span>{el.startDate}</span>
                          <span>~</span>
                          <span>{el.endDate}</span>
                        </div>
                      </div>
                      <div className={styles.btnBox}>
                        <button className={styles.btn} onClick={confirmBtn}>
                          승인하기
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        ) : (
          <div className={styles.DeleteBox}>
            <div className={styles.exBox}>
              <div className={styles.thumBox}>
                <img
                  src="https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134"
                  alt=""
                  className={styles.eximg}
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.title}>데이비드 호크니展</div>
                <div className={styles.date}>
                  <span>전시기간:</span>
                  <span>10/16</span>
                  <span>~</span>
                  <span>12/3</span>
                </div>
              </div>
              <div className={styles.btnBox}>
                <button className={styles.btn2}>마감하기</button>
              </div>
            </div>

            <div className={styles.exBox}>
              <div className={styles.thumBox}>
                <img
                  src="https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134"
                  alt=""
                  className={styles.eximg}
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.title}>데이비드 호크니展</div>
                <div className={styles.date}>
                  <span>전시기간:</span>
                  <span>10/16</span>
                  <span>~</span>
                  <span>12/3</span>
                </div>
              </div>
              <div className={styles.btnBox}>
                <button className={styles.btn2}>마감하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminEx;
