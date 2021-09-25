import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutSlider from "../../components/aboutSlider/AboutSlider";
import { Link } from "react-router-dom";

AOS.init();

const About = () => {
  const txt = `아트그라운드는 누구나 전시가 가능하고, 어디에서나 관람이 가능한 -를 추구합니다 `;
  const [Text, setText] = useState("");
  const [Count, setCount] = useState(0);
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    if (position > 0) {
      const interval = setInterval(() => {
        setText(Text + txt[Count]);
        setCount(Count + 1);
      }, 70);
      if (Count === txt.length) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <div className={styles.container}>
      <main className={` ${styles.main2}`}>
        <section className={styles.secBorder}>
          <div className={styles.brand}>
            <span
              className={styles.brandTitle}
              data-aos="fade-down"
              data-aos-duration="2000"
            >
              <img
                src="../../../aGfavicon.png"
                alt=""
                className={styles.logo}
              />
            </span>
            <p data-aos="fade-down" data-aos-duration="2000">
              아트그라운드는 온라인 갤러리를 통해 <br></br>
              자유로운 예술활동을 펼칠 수 있는 문화의 장을 마련하고자 합니다
            </p>
          </div>
        </section>
      </main>
      <main className={` ${styles.main1}`}>
        <AboutSlider />
      </main>
      <main className={`${styles.mainback} ${styles.main3}`}>
        <section className={styles.secBorder}>
          <div
            className={styles.border}
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <img
              src="    ../../../images/main.jpeg
              "
              alt="관람관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>Exhibition Everywhere</h3>
              <p>
                어디에서든지 갤러리를 관람하세요. <br></br>
                아트갤러리는 '공간'이라는 바운더리를 허물어 <br></br>
                언제 어디서나 작품을 감상 할 수 있는 공간을 제공합니다.
              </p>
              <Link to="/gallery">
                <button className={styles.btn}>관람하러가기</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <main className={`${styles.mainback} ${styles.main3}`}>
        <section className={styles.secBorder}></section>
      </main>
      <main className={`${styles.mainback} ${styles.main4}`}>
        <section className={styles.secBorder}>
          <div
            className={styles.border}
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <div>
              <h3>Sharing review with People</h3>
              <p>
                갤러리 관람 후, 작품에 대한 나의 생각을 공유하세요.
                <br></br>
                아트그라운드는 감상후기를 공유할 수 있는 소통의 장을 제공합니다.
              </p>
              <Link to="/reviewlist">
                <button className={styles.btn}>리뷰보러가기</button>
              </Link>
            </div>
            <img
              src="../../../images/main2.jpeg"
              alt="리뷰관련 이미지 혹은 아이콘"
            ></img>
          </div>
        </section>
      </main>
      <main className={`${styles.mainback} ${styles.main5}`}>
        <section className={styles.secBorder}>
          <div
            className={styles.border}
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <img
              src="../../../images/main2.jpeg"
              alt="대관관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>Run Your Own Exhibition</h3>
              <p>
                나만의 오픈갤러리를 열어 귀하의 작품을 전시하세요.<br></br>
                아트그라운드는 아티스트가 직접 작품을 선보일 수 있는 <br></br>
                갤러리 공간을 제공합니다.<br></br>
              </p>
              <Link to="/register">
                <button className={styles.btn}>대관하러가기</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <main className={`${styles.main6}`}>
        <section className={styles.secBorder}>
          <Link to="/gallery">
            <button className={styles.bottomBtn}>갤러리 둘러보러가기</button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default About;
