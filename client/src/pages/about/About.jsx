import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { Link, useHistory } from "react-router-dom";
import AboutSlider from "../../components/aboutSlider/AboutSlider";

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
              <h3>Exhibition Everywhere</h3>
              <p>
                어디에서든지 갤러리를 관람하세요! <br></br>
                아트갤러리는 '공간'이라는 바운더리를 허물어 <br></br>
                언제 어디서나 작품을 감상 할 수 있는 공간을 제공합니다.
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
        <section
          className={styles.exSecBorder}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className={styles.exContentTitle}>
            art-ground는<br></br>두가지의 형태의 전시회 경험을 제공합니다.
          </div>
          <div className={styles.exContentBox}>
            <div className={styles.exContent}>
              <img src="https://images.velog.io/images/beablessing/post/53ea20bd-2447-4f9c-acb5-c0aec45c1e6a/outline_view_in_ar_black_24dp.png"></img>

              <span>standard gallery</span>
            </div>
            <div className={styles.exContent}>
              <img src="https://images.velog.io/images/beablessing/post/53ea20bd-2447-4f9c-acb5-c0aec45c1e6a/outline_view_in_ar_black_24dp.png"></img>

              <span>3d gallery </span>
            </div>
          </div>
        </section>
      </main>
      {/* <main className={`${styles.mainback} ${styles.main8}`}>
        <section
          className={styles.fullSecBorder}
          data-aos="zoom-in-up"
          data-aos-duration="2000"
        >
          <div>
            <img src="https://images.velog.io/images/beablessing/post/2daa22f3-9dd7-4641-8fc3-e666a61f6a0d/IM048962-int_press.jpg"></img>
          </div>
          <div>
            <img src="https://images.velog.io/images/beablessing/post/dcae9e8a-10ea-4569-bcf7-819eb5d4f186/%E1%84%87%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%B5%E1%84%8B%E1%85%A7%E1%86%BC4-1.jpeg"></img>
          </div>
          <div>
            <img src="https://images.velog.io/images/beablessing/post/aff59d5f-d744-493c-9202-ce9963f5f387/%E1%84%87%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%B5%E1%84%8B%E1%85%A7%E1%86%BC1-8.jpeg"></img>
          </div>
        </section>
      </main> */}
      <main className={`${styles.mainback} ${styles.main3}`}>
        <section className={styles.secBorder}>
          <div
            className={styles.border}
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <div>
              <h3>Sharing review with People</h3>
              <p>
                갤러리 관람 후, 작품에 대한 나의 생각을 공유하세요!
                <br></br>
                아트그라운드는 감상후기를 공유할 수 있는 소통의 장을 제공합니다.
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

      <main className={`${styles.mainback} ${styles.main4}`}>
        <section
          className={styles.revSecBorder}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className={styles.reviewTitle}>
            art-ground에서<br></br>수백개의 관람 후기를 만나보세요.
          </div>
          <div className={styles.revContentBox}>
            <div className={styles.revContent}>
              <img src="https://images.velog.io/images/beablessing/post/6cee083a-f884-4a87-9217-02005bec687e/Screenshot%20from%202021-09-30%2005-11-44.png"></img>
              <div className={styles.revTxtBox}>
                <span className={styles.revTxt}>내가클래시커팀장이다! 님</span>
                <span className={styles.revTxt}>전시명: 자아성찰</span>
                <span className={styles.revTxt}>
                  작가의 자아성찰이 잘 그려졌던 작품이었다.
                </span>
              </div>
            </div>
            <div className={styles.revContent}>
              <img src="https://images.velog.io/images/beablessing/post/25809c97-d973-4a68-b8ca-0f834128d3ed/Screenshot%20from%202021-09-30%2005-11-38.png"></img>
              <div className={styles.revTxtBox}>
                <span className={styles.revTxt}>내가클래시커팀장이다! 님</span>
                <span className={styles.revTxt}>작품: 자아성찰</span>
                <span className={styles.revTxt}>
                  작가의 자아성찰이 잘 그려졌던 작품이었다.
                </span>
              </div>
            </div>
            <div className={styles.revContent}>
              <img src="https://images.velog.io/images/beablessing/post/cbb9a9be-2030-4a9f-ade0-74cf3677b9ca/Screenshot%20from%202021-09-30%2005-11-48.png"></img>
              <div className={styles.revTxtBox}>
                <span className={styles.revTxt}>내가클래시커팀장이다! 님</span>
                <span className={styles.revTxt}>작품: 자아성찰</span>
                <span className={styles.revTxt}>
                  작가의 자아성찰이 잘 그려졌던 작품이었다.
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
                나만의 오픈갤러리를 열어 귀하의 작품을 전시하세요!<br></br>
                아트그라운드는 아티스트가 직접 작품을 선보일 수 있는 <br></br>
                갤러리 공간을 제공합니다.<br></br>
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
