import React, { useState } from "react";
import styles from "./ScrollTab.module.css";

const ScrollTab = () => {
  const listNum = [1, 2, 3, 4, 5, 6, 7];
  const [listClicked, setListClicked] = useState(1);

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
        top: 650,
        behavior: "smooth",
      });
    }
    if (el === 3) {
      window.scrollTo({
        top: 1700,
        behavior: "smooth",
      });
    }
    if (el === 4) {
      window.scrollTo({
        top: 2690,
        behavior: "smooth",
      });
    }
    if (el === 5) {
      window.scrollTo({
        top: 3639,
        behavior: "smooth",
      });
    }
    if (el === 6) {
      window.scrollTo({
        top: 4590,
        behavior: "smooth",
      });
    }
    if (el === 7) {
      window.scrollTo({
        top: 5540,
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
