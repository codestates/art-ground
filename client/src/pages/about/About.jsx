import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";
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
      <section className={styles.mainBrand}>
        <div className={styles.brandSection}>
          <div className={styles.brand}>
            <img
              src="../../../images/main2.jpeg"
              className={styles.backgroundImg}
              alt="about"
            ></img>
            <div className={styles.mainContentBox}>
              <h1 data-aos="fade-down" data-aos-duration="2000">
                누구나 예술가가 될 수 있는 공간
              </h1>
              <p data-aos="fade-down" data-aos-duration="2000">
                아트그라운드는 온라인 갤러리 대관 서비스로<br></br>
                누구나 자유롭게 작품 활동을 펼칠 수 있는 열린 놀이터입니다.
              </p>
            </div>
            <section className={styles.downArr2}>
              <div className={styles.arrSection2}>
                <div className={styles.arrowDown2}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className={styles.mainBrand2}>
        <div className={styles.brandSection}>
          <div
            className={styles.secondHead}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            작가도 관람객도,<br></br>아트 그라운드에서는 모두가 아티스트입니다.
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className={styles.brand2}
          >
            <div className={styles.img1Wrap}>
              <img
                className={styles.img1}
                src="../../../images/image-4.jpeg"
                alt="about"
              ></img>
            </div>
            <div className={styles.img3Wrap}>
              <img
                className={styles.img3}
                src="../../../images/image-3.jpeg"
                alt="about"
              ></img>
            </div>
            <div className={styles.img4Wrap}>
              <img
                className={styles.img4}
                src="../../../images/image-1.jpeg"
                alt="about"
              ></img>
            </div>
            <div className={styles.img5Wrap}>
              <img
                className={styles.img5}
                src="../../../images/image-5.jpeg"
                alt="about"
              ></img>
            </div>
          </div>
          <img
            className={styles.img2}
            src="../../../images/logo on white.png"
            alt="about"
          ></img>
        </div>
      </section>

      <section className={styles.downArr}>
        <div className={styles.arrSection}>
          <div className={styles.arrowDown}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section className={styles.mainExplain}>
        <div className={styles.ExplainSection}>
          <div
            className={styles.explainBorder}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <img
              src="../../../images/about_img.png"
              alt="관람관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>
                다양한 전시회를<br></br>자유롭게 즐기세요
              </h3>
              <p>
                언제 어디서든 당신이 좋아하는 전시를 관람하세요! <br></br>
                아트그라운드는 시간과 공간의 제약을 받지 않고 <br></br>
                다양한 작품을 보고 느낄 수 있는 공간을 제공합니다.
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
        </div>
      </section>

      <section className={styles.mainWatchDetail1}>
        <div
          className={styles.exDetailTitle}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          아트그라운드는 2D와 더불어 3D 환경을 제공함으로써 <br></br>관람객에게
          최상의 경험을 선사합니다.
        </div>
      </section>

      <section className={styles.mainWatchDetail2}>
        <div
          className={styles.exDetailBoard}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className={styles.exDetailImg}>
            <img alt="관람" src="../../../images/about_video.gif"></img>
          </div>
          <div className={styles.exDetailTxt}>
            <span>Standard Gallery<p className={styles.typeIcon}>2D</p></span>
            <span>
              standard gallery에서는 간단한 마우스 컨트롤로 <br></br>마치 실제
              갤러리의 작품 앞에 서서 관람하는 듯한 관람 경험을 제공합니다.
            </span>
          </div>
        </div>
      </section>

      <section className={styles.mainWatchDetail2}>
        <div
          className={styles.exDetailBoard}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className={styles.exDetailImg}>
            <img alt="about" src="../../../images/about_video2.gif"></img>
          </div>
          <div className={styles.exDetailTxt}>
            <span>Premium Gallery<p className={styles.typeIcon}>3D</p></span>
            <span>
              premium gallery에서는 간단한 마우스 및 키보드 컨트롤로 <br></br>
              마치 실제 갤러리 내부를 둘러보는 듯한 보다 사실적이고 생생한 관람
              경험을 제공합니다.
            </span>
          </div>
          <div className={styles.emptyBox}></div>
        </div>
      </section>

      <section className={styles.mainExplain}>
        <div className={styles.ExplainSection}>
          <div
            className={styles.explainBorder2}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className={styles.secondEx}>
              <h3>
                전시회의 생생한 <br></br>경험을 나누세요
              </h3>
              <p>
                아트그라운드에서의 전시는 어떠셨나요? <br></br>생생했던 관람의 경험을
                다양한 유저들과 나눠보세요. <br></br>즐거웠던 놀이터에서의 기억을 <br></br>더
                오래도록 간직할 수 있을 거예요!
              </p>

              <div className={styles.btnWrap}> 
                <button
                  className={styles.btn}
                  onClick={() => {
                    history.push("/reviewlist");
                  }}
                >
                  리뷰보러가기
                </button>
              </div>
            </div>
            <img
              className={styles.secondImg}
              src="../../../images/about_img2.png"
              alt="리뷰관련 이미지 혹은 아이콘"
            ></img>
          </div>
        </div>
      </section>

      <section className={styles.mainReviewDetail}>
        <div
          className={styles.ReviewSection}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          {" "}
          <AboutRevSlider />
        </div>
      </section>

      <section className={styles.mainExplain}>
        <div className={styles.ExplainSection}>
          <div
            className={styles.explainBorder}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <img
              src="../../../images/about_img3.png"
              alt="대관관련 이미지 혹은 아이콘"
            ></img>
            <div>
              <h3>
                단 하나뿐인 <br></br>나만의 전시회를 <br></br>열어보세요
              </h3>
              <p>
                나만 보기 아까운 소중한 나의 작품들, <br></br>당신의 예술적
                잠재력을 아트그라운드에서 펼쳐보세요
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
        </div>
      </section>

      <section className={styles.mainCount}>
        <div className={styles.countSection}>
          <div className={styles.conterTxtBox}>
            현재까지 수 많은 아티스트들이 아트그라운드에서 <br></br>작품을
            전시하고 있습니다.
          </div>
          <div className={styles.conterBox}>
            <span>{Count1}+</span>
            <span>Piece of Art</span>
          </div>
        </div>
      </section>

      <section className={styles.mainBottomTxt}>
        <div className={styles.bottomSectionTxt}>
          여러분도 지금 바로 artience가 되어 보세요.
        </div>
      </section>

      <section className={styles.mainBottom}>
        <div className={styles.bottomSection}>
          <button
            className={styles.bottomBtn}
            onClick={() => {
              history.push("/gallery");
            }}
          >
            갤러리 둘러보러가기
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
