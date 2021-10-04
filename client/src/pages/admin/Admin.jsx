import styles from "./Admin.module.css";
import ScrollButton from "../../components/scrollButton/ScrollButton";
import React, { useCallback, useEffect, useState } from "react";
import AdminEx from "../../components/adminEx/AdminEx";
import AdminReview from "../../components/adminReview/AdminReview";
import Loading from "../../components/loading/Loading";
import { getAllExhibition, getinfiniteData } from "../../api/adminApi";

const Admin = () => {
  const [exhibition, setExhibition] = useState(true); //대분류 페이지
  const [review, setReview] = useState(false);
  const [updateEx, setUpdateEx] = useState(true); //ex소분류 페이지이동
  const [deleteEx, setDeleteEx] = useState(false);
  const [doneEx, setDoneEx] = useState(false);
  const [adExRender, setAdExRender] = useState(false); //새로고침시 랜더되도록
  const [exhibitData, setExhibitData] = useState([]); //데이터 상태값
  const [reviewData, setReviewData] = useState([]);
  const [restData, setRestData] = useState([]); // 랜더 하고 남은 데이터
  const [isLoading, setIsLoading] = useState(true);
  const clickExColor = !exhibition ? styles.libox : styles.liboxClick; //대메뉴 css
  const clickRevColor = !review ? styles.libox : styles.liboxClick;
  const clickEXSmenu1 = !updateEx ? styles.btn : styles.btnClick; //ex소메뉴 css
  const clickEXSmenu2 = !deleteEx ? styles.btn : styles.btnClick;
  const clickEXSmenu3 = !doneEx ? styles.btn : styles.btnClick;

  useEffect(() => {
    setTimeout(() => {
      setAdExRender(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (exhibition) {
      getAllExhibition(setExhibitData);
    }
    return () => {};
  }, [exhibition]);

  const clickEx = () => {
    setExhibition(true);
    setReview(false);
  };
  const clickReview = () => {
    setExhibition(false);
    setReview(true);
  };

  const clickUpdate = () => {
    setUpdateEx(true);
    setDeleteEx(false);
    setDoneEx(false);
  };
  const clickDelete = () => {
    setUpdateEx(false);
    setDeleteEx(true);
    setDoneEx(false);
  };
  const clickDoneEx = () => {
    setUpdateEx(false);
    setDeleteEx(false);
    setDoneEx(true);
  };
  const fetchMoreData = async () => {
    if (restData.length !== 0) {
      setIsLoading(true);
      setTimeout(() => {
        setReviewData(reviewData.concat(restData.slice(0, 10)));
        setRestData(restData.slice(10));
        setIsLoading(false);
      }, 500);
    }
  };

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      fetchMoreData();
    }
  }, [isLoading]);

  const getFetchData = async () => {
    setIsLoading(true);
    let data = await getinfiniteData();
    setReviewData(data.slice(0, 10));
    setRestData(data.slice(10));
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getFetchData();
    }, 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <section className={styles.container}>
      <ScrollButton />
      <div className={styles.nav}>
        <div className={styles.top}>
          <div className={styles.navBox}>
            <div className={styles.logo}>
              <span className={styles.logoborder}>
                ART-GROUND administration
              </span>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.categoryBox}>
            <ul className={styles.title}>
              <li className={`${clickExColor}`} onClick={clickEx}>
                전시관리
              </li>
              <li className={`${clickRevColor}`} onClick={clickReview}>
                리뷰관리
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {exhibition ? (
          <div className={styles.exhibit}>
            {adExRender ? (
              <>
                <div className={styles.btnbox}>
                  <button className={clickEXSmenu1} onClick={clickUpdate}>
                    승인대기
                  </button>
                  <button className={clickEXSmenu2} onClick={clickDelete}>
                    마감대기
                  </button>
                  <button className={clickEXSmenu3} onClick={clickDoneEx}>
                    마감된 전시회
                  </button>
                </div>
                {exhibitData.map((el, idx) => {
                  return (
                    <AdminEx
                      key={idx}
                      el={el}
                      updateEx={updateEx}
                      deleteEx={deleteEx}
                      doneEx={doneEx}
                    />
                  );
                })}
              </>
            ) : (
              <Loading />
            )}
          </div>
        ) : null}
        {review ? (
          <div className={styles.exhibit}>
            {adExRender ? (
              <>
                <div className={styles.btnbox}>
                  <button className={clickEXSmenu3}>전체보기</button>
                </div>
                {reviewData.map((el, idx) => {
                  return <AdminReview key={idx} el={el} />;
                })}
              </>
            ) : (
              <Loading />
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Admin;
