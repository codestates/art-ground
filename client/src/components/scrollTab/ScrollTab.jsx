import React, { useState, useEffect } from "react";
import styles from "./ScrollTab.module.css";

const ScrollTab = () => {
  const [position, setPosition] = useState(0);

  const gotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPosition(0);
  };
  const gotoWatch = () => {
    window.scrollTo({
      top: 1966,
      behavior: "smooth",
    });
    setPosition(1966);
  };
  const gotoReview = () => {
    window.scrollTo({
      top: 2940,
      behavior: "smooth",
    });
    setPosition(2940);
  };
  const gotoRegister = () => {
    window.scrollTo({
      top: 3913,
      behavior: "smooth",
    });
    setPosition(3913);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.tapBorder}>
        <li className={styles.list} onClick={gotoTop}>
          최상단
        </li>
        <li className={styles.list} onClick={gotoWatch}>
          관람
        </li>
        <li className={styles.list} onClick={gotoReview}>
          리뷰
        </li>
        <li className={styles.list} onClick={gotoRegister}>
          대관
        </li>
      </ul>
    </div>
  );
};

export default ScrollTab;
