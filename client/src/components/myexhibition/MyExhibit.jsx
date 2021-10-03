import styles from "./MyExhibit.module.css";

import React from "react";

const MyExhibit = ({ el }) => {
  const imgurl =
    el.images.length > 0
      ? el.images[0].image_urls
      : "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png";
  const imgurlAlt = el.images.length > 0 ? el.images[0].title : null;

  return (
    <section className={styles.container}>
      <div className={styles.exBox}>
        <div className={styles.thumBox}>
          <img src={imgurl} alt={imgurlAlt} className={styles.eximg} />
        </div>
        <div className={styles.infoBox}>
          {el.status === 0 ? (
            <div className={styles.status}>승인 대기중</div>
          ) : null}
          <div className={styles.title}>{el.title}</div>
          <div className={styles.title}>{el.author.nickname}</div>
          <div className={styles.date}>
            <span>전시기간:</span>
            <span>{el.start_date}</span>
            <span>~</span>
            <span>{el.end_date}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyExhibit;
