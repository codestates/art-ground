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
    if (position > 590) {
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
      <main className={` ${styles.main1}`}>
        <AboutSlider />
      </main>
      <main className={`${styles.mainback} ${styles.main2}`}>
        <section className={styles.secBorder}>
          <div className={styles.brand}>
            <span
              className={styles.brandTitle}
              data-aos="fade-down"
              data-aos-duration="2000"
            >
              <img
                src="../../../images/Grayscale on Transparent.png"
                alt=""
                className={styles.logo}
              />
            </span>
            <p>{Text}</p>
          </div>
        </section>
      </main>

      <main className={`${styles.mainback} ${styles.main3}`}>
        <section className={styles.secBorder}>
          <div
            className={styles.border}
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <img
              src="https://t1.daumcdn.net/cfile/tistory/99EFE6375A65DFEA33"
              alt="관람관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>Anywhere 전시회 관람</h3>
              <p>
                방구석 관람 블라브랄라블ㄹ라~~생존작가로서 최고의 경매가를
                기록한 데이비드 호크니의 작품 133점을 소개하는 아시아 지역 첫
                대규모 개인전인 〈데이비드 호크니〉展에 여러분을 초대합니다.
              </p>
              <Link to="/gallery">
                <button className={styles.btn}>관람하러가기</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <main className={`${styles.mainback} ${styles.main4}`}>
        <section className={styles.secBorder}>
          <div
            className={styles.border}
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <img
              src="https://t1.daumcdn.net/cfile/tistory/99EFE6375A65DFEA33"
              alt="리뷰관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>리뷰</h3>
              <p>
                리뷰 어쩌구 블라브랄라블ㄹ라~~생존작가로서 최고의 경매가를
                기록한 데이비드 호크니의 작품 133점을 소개하는 아시아 지역 첫
                대규모 개인전인 〈데이비드 호크니〉展에 여러분을 초대합니다.
              </p>
              <Link to="/reviewlist">
                <button className={styles.btn}>리뷰보러가기</button>
              </Link>
            </div>
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
              src="https://t1.daumcdn.net/cfile/tistory/99EFE6375A65DFEA33"
              alt="대관관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>대관</h3>
              <p>
                모두에게 전시의 기회 어쩌구 브랄라블ㄹ라~~생존작가로서 최고의
                경매가를 기록한 데이비드 호크니의 작품 133점을 소개하는 아시아
                지역 첫 대규모 개인전인 〈데이비드 호크니〉展에 여러분을
                초대합니다.
              </p>
              <Link to="/register">
                <button className={styles.btn}>대관하러가기</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
