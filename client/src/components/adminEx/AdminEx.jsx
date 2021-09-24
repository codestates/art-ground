import styles from "./AdminEx.module.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEx = ({ el, updateEx, deleteEx, doneEx }) => {
  const clickConfirm = () => {
    //승인하기
    console.log(el.id);
    // axios.post("https://art-ground.link/admin/exhibition", {
    //   postId: el.id, //전시회 pid
    // });
  };

  const clickDelete = () => {
    //마감하기
  };

  //console.log(el.images[0].image_urls);
  //console.log(el);
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        {updateEx ? (
          <>
            {el.status === 0 ? (
              <div className={styles.upDateBox}>
                <div className={styles.exBox}>
                  <div className={styles.thumBox}>
                    <img src={"el.images"} alt="" className={styles.eximg} />
                  </div>
                  <div className={styles.infoBox}>
                    <div className={styles.title}>{el.title}</div>
                    <div className={styles.author}>{el.author.nickname}</div>
                    <div className={styles.date}>
                      <span>전시기간:</span>
                      <span>{el.start_date}</span>
                      <span>~</span>
                      <span>{el.end_date}</span>
                    </div>
                  </div>
                  <div className={styles.btnBox}>
                    <button className={styles.btn} onClick={clickConfirm}>
                      승인하기
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
        {deleteEx ? (
          <>
            {el.status === 1 ? (
              <div className={styles.upDateBox}>
                <div className={styles.exBox}>
                  <div className={styles.thumBox}>
                    <img src={"el.images"} alt="" className={styles.eximg} />
                  </div>
                  <div className={styles.infoBox}>
                    <div className={styles.title}>{el.title}</div>
                    <div className={styles.author}>{el.author.nickname}</div>
                    <div className={styles.date}>
                      <span>전시기간:</span>
                      <span>{el.start_date}</span>
                      <span>~</span>
                      <span>{el.end_date}</span>
                    </div>
                  </div>
                  <div className={styles.btnBox}>
                    <button className={styles.btn} onClick={clickDelete}>
                      마감하기
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
        {doneEx ? (
          <>
            {el.status === 2 ? (
              <div className={styles.upDateBox}>
                <div className={styles.exBox}>
                  <div className={styles.thumBox}>
                    <img src={"el.images"} alt="" className={styles.eximg} />
                  </div>
                  <div className={styles.infoBox}>
                    <div className={styles.title}>{el.title}</div>
                    <div className={styles.author}>{el.author.nickname}</div>
                    <div className={styles.date}>
                      <span>전시기간:</span>
                      <span>{el.start_date}</span>
                      <span>~</span>
                      <span>{el.end_date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default AdminEx;
