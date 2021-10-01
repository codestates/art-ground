import styles from "./AdminReview.module.css";

import React, { useState } from "react";
import ReviewDelModal from "../modals/ReviewDelModal";

const AdminReview = ({ el }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const imgurl = el.image_urls
    ? el.image_urls
    : "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png";

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
              <div className={styles.title}>{el.title}</div>
              <div className={styles.comments}>{el.comments}</div>
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
