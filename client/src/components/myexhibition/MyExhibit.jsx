import styles from "./MyExhibit.module.css";

import React from "react";
import { useHistory } from "react-router";

const MyExhibit = ({ el }) => {
  const history = useHistory();
  const goToGallery = () => {
    history.push(`gallerydetail/${el.id}`);
  };
  const imgurl =
    el.images.length > 0
      ? el.images[0].image_urls
      : "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png";
  const imgurlAlt = el.images.length > 0 ? el.images[0].title : null;

  return (
    <section className={styles.container}>
      {el.status === 0 ? (
        <div className={styles.exBox}>
          <div className={styles.thumBox}>
            <img src={imgurl} alt={imgurlAlt} className={styles.eximg} />
          </div>

          <div className={styles.infoBox}>
            <div className={styles.status}>승인 대기중</div>
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
      ) : null}
      {el.status === 1 ? (
        <div className={styles.exBox}>
          <div className={styles.thumBox}>
            <img
              src={imgurl}
              alt={imgurlAlt}
              className={styles.eximg}
              onClick={goToGallery}
            />
          </div>
          <div className={styles.infoBox}>
            <div className={styles.title} onClick={goToGallery}>
              {el.title}
            </div>
            <div className={styles.title}>{el.author.nickname}</div>
            <div className={styles.date}>
              <span>전시기간:</span>
              <span>{el.start_date}</span>
              <span>~</span>
              <span>{el.end_date}</span>
            </div>
          </div>
        </div>
      ) : null}
      {el.status === 2 ? null : null}
    </section>
  );
};

export default MyExhibit;
