import styles from "./AdminReview.module.css";

import React, { useState } from "react";
import ReviewDelModal from "../modals/ReviewDelModal";

const AdminReview = ({ el }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  // const imgurl =
  //   el.images.length > 0
  //     ? el.images[0].image_urls
  //     : "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png";
  // const imgurlAlt = el.images.length > 0 ? el.images[0].title : null;

  const clickDelete = () => {
    setDeleteModal(true);
  };

  return (
    <section className={styles.container}>
    <div className={styles.box}>
      <div className={styles.upDateBox}>
        <div className={styles.exBox}>
          <div className={styles.thumBox}>
            <img src={"imgurl"} alt={"imgurlAlt"} className={styles.eximg} />
          </div>

          <div className={styles.infoBox}>
            <div className={styles.title}>{"el.title"}</div>
            <div className={styles.date}>
              <span>전시기간:</span>
              <span>{"el.start_date"}</span>
              <span>~</span>
              <span>{"el.end_date"}</span>
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
    </div>
  </section>
  );
};

export default AdminReview;
