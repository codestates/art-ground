import styles from "./AdminReview.module.css";

import React, { useState } from "react";
import ReviewDelModal from "../modals/ReviewDelModal";

const AdminReview = ({ el }) => {
  //console.log(el, "adminrevdata");
  const [deleteModal, setDeleteModal] = useState(false);

  const imgurl = el.user.profile_img
    ? el.user.profile_img
    : "../../../images/profile.jpeg";

  const clickDelete = () => {
    setDeleteModal(true);
  };

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.upDateBox}>
          <div className={styles.exBox}>
            <div className={styles.thumBox}>
              <img src={imgurl} alt={imgurl} className={styles.eximg} />
            </div>

            <div className={styles.infoBox}>
              <div className={styles.title}>{el.title} </div>
              <div className={styles.author}>
                {" "}
                전시명: {el.exhibition.title}
              </div>
              <div className={styles.user}>
                {" "}
                댓글 작성자: {el.user.nickname}
              </div>
              <div className={styles.comments}>댓글: {el.comments}</div>
            </div>
          </div>

          <div className={styles.btnBox}>
            <button className={styles.btn} onClick={clickDelete}>
              삭제하기
            </button>
          </div>
          {deleteModal ? (
            <ReviewDelModal el={el} setDeleteModal={setDeleteModal} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AdminReview;
