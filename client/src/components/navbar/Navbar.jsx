import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ isLogin, handleLogout }) => {
  const [navOpen, setNavOpen] = useState(false);

  const history = useHistory();

  const clickLogo = () => {
    history.push("/");
  };

  const handleNavClose = () => {
    setNavOpen(false);
  };
  const handleNavOpen = () => {
    setNavOpen(true);
  };

  ///////////스크롤 시 navbar 컬러 변경(작업중)//////////////////////////////
  const [ScrollY, setScrollY] = useState(0);
  const [navStatus, setNavStatus] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if(ScrollY > 150) { 
      setNavStatus(true);
    } else { 
      setNavStatus(false);
    }
  }
  
  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })
  ////////////////////////////////////////////////////////////
  return (
    <section className={navStatus? styles.containerScroll : styles.container}>
      <div className={styles.navBox}>
        <div className={navOpen? styles.topNav : styles.topNavClose}>
          {/* <span className={styles.moreOpt} onClick={handleNavOpen}>
            <i class="fas fa-bars"></i>
          </span> */}
          <ul className={navStatus? styles.btnsScroll: styles.btns}>
            {!isLogin ? (
              <li
                className={styles.btn}
                onClick={() => {
                  history.push("/signin");
                  setNavOpen(false);
                }}
              >
                로그인
              </li>
            ) : (
              <li
                className={styles.btn}
                onClick={() => {
                  handleLogout();
                  setNavOpen(false);
                  history.push("/");
                }}
              >
                로그아웃
              </li>
            )}
            <Link to="/join">
              <li className={styles.btn} onClick={handleNavClose}>회원가입</li>
            </Link>
            <Link to="/mypage">
              <li className={styles.btn} onClick={handleNavClose}>마이페이지</li>
            </Link>
          </ul>
        </div>
        <div className={navStatus? styles.logoScroll : styles.logo}>
          <span className={navStatus? styles.moreOptScroll: styles.moreOpt} onClick={handleNavOpen}>
            <i class="fas fa-bars"></i>
          </span>
          {navStatus? <img
            className={navStatus? styles.logoImgScroll : styles.logoImg}
            src="../../../images/Monochrome on Transparent_light.png"
            alt="logo"
            onClick={clickLogo}
          />: <img
            className={styles.logoImg}
            src="../../../images/Original on Transparent.png"
            alt="logo"
            onClick={clickLogo}
          />}
        </div>
        <div className={navOpen ? styles.category : styles.categoryClose}>
          <ul className={styles.categoryBox}>
            <Link to="/about">
              <li className={navStatus? styles.titleScroll: styles.title} onClick={handleNavClose}>
                ABOUT
              </li>
            </Link>
            <Link to="/gallery">
              <li className={navStatus? styles.titleScroll:styles.title} onClick={handleNavClose}>
                GALLERY
              </li>
            </Link>
            <Link to="/reviewlist">
              <li className={navStatus? styles.titleScroll:styles.title} onClick={handleNavClose}>
                REVIEW
              </li>
            </Link>
            <Link to="/register">
              <li className={navStatus? styles.titleScroll:styles.title} onClick={handleNavClose}>
                REGISTER
              </li>
            </Link>
            <Link to="/contact">
              <li className={navStatus? styles.titleScroll:styles.title} onClick={handleNavClose}>
                CONTACT
              </li>
            </Link>
          </ul>
          <span className={styles.closeBtn} onClick={handleNavClose}>
            <i class="fas fa-times"></i>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
