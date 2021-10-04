import React, { useEffect, useState } from "react";

import styles from "./AboutSlider.module.css";

const AboutSlider = () => {
  const aboutImg = [
    "../../../images/main.jpeg",
    "../../../images/main2.jpeg",
    "../../../images/ex.jpg",
    "../../../images/main2.jpeg",
  ];
  const [slider, setSlider] = useState(0);
  const [isMouseOn, setisMouseOn] = useState(false);

  const prevBtn = () => {
    if (slider === 1 || slider === 2 || slider === 3) {
      setSlider(slider - 1);
    } else if (slider === 0) {
      setSlider(3);
    }
  };
  const nextBtn = () => {
    if (slider === 0 || slider === 1 || slider === 2) {
      setSlider(slider + 1);
    } else if (slider === 3) {
      setSlider(0);
    }
  };

  useEffect(() => {
    if (!isMouseOn) {
      setTimeout(() => {
        nextBtn();
      }, 4000);
    }
    return () => {};
  });

  const onMouse = () => {
    setisMouseOn(true);
  };
  const outMouse = () => {
    setisMouseOn(false);
  };
  const prevbtnStyle = isMouseOn
    ? `${styles.prevbtn} ${styles.btnhover}`
    : `${styles.prevbtn} ${styles.btn}`;

  const nextbtnStyle = isMouseOn
    ? `${styles.nextbtn} ${styles.btnhover}`
    : `${styles.nextbtn} ${styles.btn}`;

  const goSlide =
    slider === 0
      ? styles.slide1
      : slider === 1
      ? styles.slide2
      : slider === 2
      ? styles.slide3
      : slider === 3
      ? styles.slide4
      : slider === 0;

  return (
    <section
      className={styles.container}
      onMouseOver={onMouse}
      onMouseOut={outMouse}
    >
      <button onClick={prevBtn} className={prevbtnStyle}>
        {"<"}
      </button>
      <button onClick={nextBtn} className={nextbtnStyle}>
        {">"}
      </button>

      <div className={goSlide}>
        {aboutImg.map((el, idx) => {
          return <img key={idx} src={el} className={styles.pic}></img>;
        })}
      </div>
      {/* <span className={styles.active}>sdfsdf</span> */}
    </section>
  );
};

export default AboutSlider;
