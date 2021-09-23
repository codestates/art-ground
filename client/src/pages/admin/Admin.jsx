import styles from "./Admin.module.css";

import React, { useEffect, useState } from "react";
import AdminEx from "../../components/adminEx/AdminEx";
import AdminReview from "../../components/adminReview/AdminReview";

const Admin = ({ isAdmin, setisAdmin }) => {
  // 대분류
  const [exhibition, setExhibition] = useState(true);
  const [review, setReview] = useState(false);
  // 소분류
  const [updateEx, setUpdateEx] = useState(true);
  const [deleteEx, setDeleteEx] = useState(false);
  const [adminModal, setAdminModal] = useState(true);
  const [adExRender, setAdExRender] = useState(false);

  useEffect(() => {
    //로딩창 띄워야함
    setTimeout(() => {
      setAdExRender(true);
    }, 2000);
  });

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
              <AdminEx
                setUpdateEx={setUpdateEx}
                setDeleteEx={setDeleteEx}
                updateEx={updateEx}
                deleteEx={deleteEx}
                isAdmin={isAdmin}
                setisAdmin={setisAdmin}
              />
            ) : (
              "로딩페이지!!"
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
