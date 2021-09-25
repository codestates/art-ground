import styles from "./AdminReview.module.css";

import React from "react";

const AdminReview = () => {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.upDateBox}>
          <div className={styles.exBox}>
            <div className={styles.thumBox}>
              <img
                src="../../../images/exhibit2.webp"
                alt=""
                className={styles.eximg}
              />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.title}>팰리스 드 도쿄 사진전</div>
              <div className={styles.date}>전시기간:10/16~12/30</div>
            </div>
            <div className={styles.btnBox}>
              <button className={styles.btn}>삭제하기</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminReview;
