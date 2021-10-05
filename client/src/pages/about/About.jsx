import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";
import AboutSlider from "../../components/aboutSlider/AboutSlider";
import AboutRevSlider from "../../components/aboutRevSlider/AboutRevSlider";

AOS.init();

const About = () => {
  const history = useHistory();
  const [position, setPosition] = useState(0);
  const [Count1, setCount1] = useState(1000);

  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    if (position > 6971) {
      const interval1 = setInterval(() => {
        setCount1(Count1 + 1);
      }, 2);

      if (Count1 === 1229) {
        clearInterval(interval1);
      }

      return () => {
        clearInterval(interval1);
      };
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  //console.log(position);

  return (
    <div className={styles.container}>
      <main className={styles.mainBrand}>
        <section className={styles.brandSection}>
          <div className={styles.brand}>
            <span
              className={styles.logoBorder}
              data-aos="fade-down"
              data-aos-duration="2000"
            >
              <img
                src="../../../favicon.png"
                alt=""
                className={styles.logoImg}
                alt="logoimg"
              />
            </span>
            <p data-aos="fade-down" data-aos-duration="2000">
              아트그라운드는 온라인 갤러리를 통해 <br></br>
              자유로운 예술활동을 펼칠 수 있는 문화의 장을 마련하고자 합니다
            </p>
          </div>
        </section>
      </main>

      <main className={styles.mainSlider}>
        <AboutSlider />
      </main>

      <main className={styles.downArr}>
        <section className={styles.arrSection}>
          <div className={styles.arrowDown}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      </main>

      <main className={styles.mainExplain}>
        <section className={styles.ExplainSection}>
          <div
            className={styles.explainBorder}
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <img
              src="    ../../../images/main.jpeg
              "
              alt="관람관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>
                자유롭게 다양한 <br></br>전시회를 즐기세요
              </h3>
              <p>
                언제, 어디서든 당신이 좋아하는 전시를 관람하세요! <br></br>
                아트그라운드는 시간과 공간의 제약을 받지 않고 다양한 작품을{" "}
                <br></br>보고 느낄 수 있는 공간을 제공합니다.
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

      <main className={styles.mainWatchDetail1}>
        <div
          className={styles.exDetailTitle}
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          아트 그라운드는 2D와 더불어 3D 환경을 제공함으로써 <br></br>관람객에게
          최상의 경험을 선사합니다.
        </div>
      </main>
      <main className={styles.mainWatchDetail2}>
        <section
          className={styles.exDetailBoard}
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          <div className={styles.exDetailImg}>
            <img
              alt="관람"
              src="https://images.velog.io/images/beablessing/post/f3334850-3411-4bd4-92ab-2f971ef1692b/Screenshot%20from%202021-09-30%2012-34-17.png"
            ></img>
          </div>
          <div className={styles.exDetailTxt}>
            <span>Standard Gallery(2D)</span>
            <span>
              standard gallery에서는 간단한 마우스 컨트롤로 <br></br>마치 실제
              갤러리의 작품 앞에 서서 관람하는 듯한 관람 경험을 제공합니다.
            </span>
          </div>
        </section>
      </main>
      <main className={styles.mainWatchDetail2}>
        <section
          className={styles.exDetailBoard}
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          <div className={styles.exDetailImg}>
            <img
              alt="관람"
              src="https://images.velog.io/images/beablessing/post/8fa8d63a-3f93-4811-bca3-b29023c18089/Screenshot%20from%202021-09-30%2012-37-52.png"
            ></img>
          </div>
          <div className={styles.exDetailTxt}>
            <span>Premium Gallery(3D)</span>
            <span>
              premium gallery에서는 간단한 마우스 및 키보드 컨트롤로 <br></br>
              마치 실제 갤러리 내부를 둘러보는 듯한 보다 사실적이고 생생한 관람
              경험을 제공합니다.
            </span>
          </div>
        </section>
      </main>

      <main className={styles.mainExplain}>
        <section className={styles.ExplainSection}>
          <div
            className={styles.explainBorder}
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <div>
              <h3>
                전시회의 생생한 <br></br>경험을 나누세요
              </h3>
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

      <main className={styles.mainReviewDetail}>
        <section
          className={styles.ReviewSection}
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          {" "}
          <AboutRevSlider />
        </section>
      </main>

      <main className={styles.mainExplain}>
        <section className={styles.ExplainSection}>
          <div
            className={styles.explainBorder}
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <img
              src="../../../images/main2.jpeg"
              alt="대관관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>
                단 하나뿐인 <br></br>나만의 전시회를 <br></br>열어보세요
              </h3>
              <p>
                나만 보기 아까운 소중한 나의 작품들, <br></br>당신의 예술적
                잠재력을 아트 그라운드에서 펼쳐보세요
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

      <main className={styles.mainCount}>
        <section className={styles.countSection}>
          <div className={styles.conterTxtBox}>
            현재까지 수 많은 작가님들이 아트그라운드에서 <br></br>작품을
            전시하고 있습니다.
          </div>
          <div className={styles.conterBox}>
            <span>{Count1}+</span>
            <span>Piece of Art</span>
          </div>
        </section>
      </main>

      <main className={styles.mainBottomTxt}>
        <section className={styles.bottomSectionTxt}>
          여러분도 지금 바로 artience가 될 수 있습니다.
        </section>
      </main>
      <main className={styles.mainBottom}>
        <section className={styles.bottomSection}>
          <button
            className={styles.bottomBtn}
            onClick={() => {
              history.push("/gallery");
            }}
          >
            갤러리 둘러보러가기
          </button>
        </section>
      </main>
    </div>
  );
};

export default About;
