import styles from "./Admin.module.css";
import ScrollButton from "../../components/scrollButton/ScrollButton";
import React, { useEffect, useState } from "react";
import AdminEx from "../../components/adminEx/AdminEx";
import AdminReview from "../../components/adminReview/AdminReview";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { getAllExhibition } from "../../api/adminApi";

const Admin = () => {
  // 대분류 페이지
  const [exhibition, setExhibition] = useState(true);
  const [review, setReview] = useState(false);
  // ex소분류 페이지이동
  const [updateEx, setUpdateEx] = useState(true);
  const [deleteEx, setDeleteEx] = useState(false);
  const [doneEx, setDoneEx] = useState(false);

  const [adExRender, setAdExRender] = useState(false);

  //대메뉴 css
  const clickExColor = !exhibition ? styles.libox : styles.liboxClick;
  const clickRevColor = !review ? styles.libox : styles.liboxClick;
  //ex소메뉴 css
  const clickEXSmenu1 = !updateEx ? styles.btn : styles.btnClick;
  const clickEXSmenu2 = !deleteEx ? styles.btn : styles.btnClick;
  const clickEXSmenu3 = !doneEx ? styles.btn : styles.btnClick;

  const clickEx = () => {
    setExhibition(true);
    setReview(false);
  };
  const clickReview = () => {
    setExhibition(false);
    setReview(true);
  };

  // 데이터 상태값
  const [exhibitData, setExhibitData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [revExData, setRevExData] = useState([]);

  useEffect(() => {
    if (exhibition) {
      getAllExhibition(setExhibitData);
    }
    return () => {};
  }, [exhibition]);

  useEffect(() => {
    if (review) {
      //getAllReviews(setReviewData);
      axios
        .get("https://art-ground.link/admin/review")
        .then((res1) => {
          let firstData = res1.data.data;
          console.log(firstData, "첫번째--------------");
          setReviewData(firstData);
        })
        .catch((err) => console.log(err));
    }
    return () => {};
  }, [review]);

  useEffect(() => {
    setTimeout(() => {
      setAdExRender(true);
    }, 1000);
  }, []);

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
  //***********무한 스크롤*********** */
  // const [productList, setProductList] = useState([]);
  // const [items, setItems] = useState(10);
  // const [preItems, setPreItems] = useState(0);

  // useEffect(() => {
  //   getinfiniteData(setProductList, preItems, items, productList);

  //   window.addEventListener("scroll", infiniteScroll, true);
  // }, [items]);

  // const infiniteScroll = () => {
  //   let scrollHeight = Math.max(
  //     document.documentElement.scrollHeight,
  //     document.body.scrollHeight
  //   );
  //   let scrollTop = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  //   );
  //   let clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     setPreItems(items);
  //     setItems(items + 10);
  //   }
  // };

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
