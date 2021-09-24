import styles from "./Admin.module.css";

import React, { useEffect, useState } from "react";
import AdminEx from "../../components/adminEx/AdminEx";
import AdminReview from "../../components/adminReview/AdminReview";
import axios from "axios";
import Loading from "../../components/loading/Loading";

const Admin = ({ isAdmin, setisAdmin }) => {
  // 대분류 페이지
  const [exhibition, setExhibition] = useState(true);
  const [review, setReview] = useState(false);
  // 소분류
  const [updateEx, setUpdateEx] = useState(true);
  const [deleteEx, setDeleteEx] = useState(false);
  const [doneEx, setDoneEx] = useState(false);
  //모달
  const [adminModal, setAdminModal] = useState(true);
  const [adExRender, setAdExRender] = useState(false);

  useEffect(() => {
    //로딩창 띄워야함
    setTimeout(() => {
      setAdExRender(true);
    }, 1000);
    return () => {};
  }, []);

  const clickExColor = !exhibition ? styles.libox : styles.liboxClick;
  const clickRevColor = !review ? styles.libox : styles.liboxClick;

  const clickEx = () => {
    setExhibition(true);
    setReview(false);
  };
  const clickReview = () => {
    setExhibition(false);
    setReview(true);
  };

  const [exhibitData, setExhibitData] = useState([]);

  useEffect(() => {
    if (exhibition) {
      axios.get("https://art-ground.link/exhibition").then((result) => {
        //console.log(result.data.data);
        setExhibitData(result.data.data);
      });
    }
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

  return (
    <section className={styles.container}>
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
                  <button className={styles.btn} onClick={clickUpdate}>
                    승인대기
                  </button>
                  <button className={styles.btn} onClick={clickDelete}>
                    마감대기
                  </button>
                  <button className={styles.btn} onClick={clickDoneEx}>
                    마감된 전시회
                  </button>
                </div>
                {exhibitData.map((el, idx) => {
                  return (
                    <AdminEx
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
        ) : (
          <div className={styles.review}>
            <AdminReview />
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
