import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { Link, useHistory } from "react-router-dom";
import AboutSlider from "../../components/aboutSlider/AboutSlider";
import AboutRevSlider from "../../components/aboutRevSlider/AboutRevSlider";

AOS.init();

const About = () => {
  const history = useHistory();
  const [position, setPosition] = useState(0);
  const [Count1, setCount1] = useState(0);
  const [Count2, setCount2] = useState(0);

  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    if (position > 4876) {
      const interval1 = setInterval(() => {
        setCount1(Count1 + 1);
      }, 3);

      const interval2 = setInterval(() => {
        setCount2(Count2 + 1);
      }, 1);

      if (Count1 === 198) {
        clearInterval(interval1);
      }
      if (Count2 === 1026) {
        clearInterval(interval2);
      }

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  //console.log(position);

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
              <img src="../../../favicon.png" alt="" className={styles.logo} />
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
      <main className={` ${styles.main7}`}>
        <section className={styles.secBorder}>
          <div className={styles.arrowDown}>
            <span></span>
            <span></span>
            <span></span>
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
              src="    ../../../images/main.jpeg
              "
              alt="관람관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>자유롭게 다양한 전시회를 즐기세요</h3>
              <p>
                언제, 어디서든 당신이 좋아하는 전시를 관람하세요! 아트
                그라운드는 시간과 공간의 제약을 받지 않고 다양한 작품을 보고
                느낄 수 있는 공간을 제공합니다.
              </p>

              <button
                className={styles.btn}
                onClick={() => {
                  history.push("/gallery");
                }}
              >
                관람하러가기
              </button>
            </div>
          </div>
        </section>
      </main>
      <main className={`${styles.mainback} ${styles.main4}`}>
        <section className={styles.exSecBorder}>
          <div
            className={styles.exContentTitle}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            아트 그라운드는 2D와 더불어 3D 환경을 제공함으로써 관람객에게 최상의
            경험을 선사합니다.
          </div>
          <div
            className={styles.exContentBox}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className={styles.exContent}>
              <img src="https://images.velog.io/images/beablessing/post/f3334850-3411-4bd4-92ab-2f971ef1692b/Screenshot%20from%202021-09-30%2012-34-17.png"></img>
              <div className={styles.exTxt}>
                <span>standard gallery</span>
                <span>
                  standard gallery에서는 간단한 마우스 컨트롤로 마치 실제
                  갤러리의 작품 앞에 서서 관람하는 듯한 관람 경험을 제공합니다.
                </span>
              </div>
            </div>
            <div className={styles.exContent}>
              <img src="https://images.velog.io/images/beablessing/post/8fa8d63a-3f93-4811-bca3-b29023c18089/Screenshot%20from%202021-09-30%2012-37-52.png"></img>

              <div className={styles.exTxt}>
                <span>3D gallery</span>
                <span>
                  premium gallery에서는 간단한 마우스 및 키보드 컨트롤로 마치
                  실제 갤러리 내부를 둘러보는 듯한 보다 사실적이고 생생한 관람
                  경험을 제공합니다.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <main className={`${styles.mainback} ${styles.main3}`}>
        <section className={styles.secBorder}>
          <div
            className={styles.border}
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <div>
              <h3>관람한 전시의 생생한 경험을 나누세요</h3>
              <p>
                아트 그라운드에서의 전시는 어떠셨나요? 생생했던 관람의 경험을
                다양한 유저들과 나눠보세요. 즐거웠던 놀이터에서의 기억을 더
                오래도록 간직할 수 있을 거예요!
              </p>

              <button
                className={styles.btn}
                onClick={() => {
                  history.push("/reviewlist");
                }}
              >
                리뷰보러가기
              </button>
            </div>
            <img
              src="../../../images/main2.jpeg"
              alt="리뷰관련 이미지 혹은 아이콘"
            ></img>
          </div>
        </section>
      </main>

      <main className={`${styles.main10}`}>
        <div
          className={styles.revBorder}
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <AboutRevSlider />
        </div>
      </main>

      <main className={`${styles.mainback} ${styles.main3}`}>
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
              <h3>세상에 단 하나뿐인 나만의 특별한 전시회를 열어보세요</h3>
              <p>
                나만 보기 아까운 소중한 나의 작품들, 당신의 예술적 잠재력을 아트
                그라운드에서 펼쳐보세요
              </p>

              <button
                className={styles.btn}
                onClick={() => {
                  history.push("/register");
                }}
              >
                대관하러가기
              </button>
            </div>
          </div>
        </section>
      </main>
      <main className={`${styles.mainback} ${styles.main9}`}>
        <section className={styles.countBorder}>
          <div className={styles.conterBox}>
            <img src="https://images.velog.io/images/beablessing/post/2daa22f3-9dd7-4641-8fc3-e666a61f6a0d/IM048962-int_press.jpg"></img>
            <div>
              <span>{Count1}</span>
              <span>Author</span>
            </div>
          </div>
          <div className={styles.conterBox}>
            <img src="https://images.velog.io/images/beablessing/post/2daa22f3-9dd7-4641-8fc3-e666a61f6a0d/IM048962-int_press.jpg"></img>
            <div>
              <span>{Count2}+</span>
              <span>Piece of Art</span>
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
