import React, { useState } from "react";
import styles from "./ScrollTab.module.css";

const ScrollTab = () => {
  const listNum = [1, 2, 3, 4, 5, 6, 7, 8];
  const [listClicked, setListClicked] = useState(1);

  const scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );

  //console.log(scrollHeight, "전체높이");

  const slider = (el) => {
    setListClicked(el);

    if (el === 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (el === 2) {
      window.scrollTo({
        top: 646,
        behavior: "smooth",
      });
    }
    if (el === 3) {
      window.scrollTo({
        top: 1696,
        behavior: "smooth",
      });
    }
    if (el === 4) {
      window.scrollTo({
        top: 2703,
        behavior: "smooth",
      });
    }
    if (el === 5) {
      window.scrollTo({
        top: 4876,
        behavior: "smooth",
      });
    }
    if (el === 6) {
      window.scrollTo({
        top: 5830,
        behavior: "smooth",
      });
    }
    if (el === 7) {
      window.scrollTo({
        top: 6790,
        behavior: "smooth",
      });
    }
    if (el === 8) {
      window.scrollTo({
        top: 7766,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.tapBorder}>
        {listNum.map((el, idx) => (
          <li
            key={idx}
            className={el === listClicked ? styles.listClicked : styles.list}
            onClick={() => slider(el)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollTab;
