import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ isLogin, handleLogout, isAdmin, setModalOpen }) => {
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

  const handleClickMypage = () => {
    setNavOpen(false);
    if (isLogin) {
      history.push("/mypage");
    } else {
      setModalOpen(true);
    }
  };

  const [navOpen, setNavOpen] = useState(false); //모바일 사이즈: navbar 사이드로 숨겨짐
  
  const [hide, setHide] = useState(false); //스크롤 아래로 하면 false, 위로하면 true
  const [pageY, setPageY] = useState(0); //스크롤 위치(0일 때 페이지 상단)

  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };
  
  const throttle = function (callback, waitTime) {
    let timerId = null;
    return (e) => {
      if (timerId) return;
      timerId = setTimeout(() => {
        callback.call(this, e);
        timerId = null;
      }, waitTime);
    };
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);


  return (
    <section className={hide?
      styles.containerHide :
      pageY>50 ? styles.containerScroll :
      styles.container}>
      <div className={styles.navBox}>
        <div className={navOpen ? styles.topNav : styles.topNavClose}>
          <ul className={
            pageY>50 ? styles.btnsScroll : 
            styles.btns}>
            {isAdmin ? (
              <Link to="/admin">
                <li className={styles.btn}>관리자페이지</li>
              </Link>
            ) : null}
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
                  history.push("/about");
                }}
              >
                로그아웃
              </li>
            )}
            <Link to="/join">
              <li className={styles.btn} onClick={handleNavClose}>
                회원가입
              </li>
            </Link>

            <li className={styles.btn} onClick={handleClickMypage}>
              마이페이지
            </li>
          </ul>
        </div>
        <div className={
          pageY>50 ? styles.logoScroll : 
          styles.logo}>
          <span
            className={
              pageY>50 ? styles.moreOptScroll : 
              styles.moreOpt}
            onClick={handleNavOpen}
          >
            <i class="fas fa-bars"></i>
          </span>
          {
          pageY>50 ? (
            <img
              className={styles.logoImgScroll}
              src="../../../images/Monochrome on Transparent.png"
              alt="logo"
              onClick={clickLogo}
            />
          ) : (
            <img
              className={styles.logoImg}
              src="../../../images/Original on Transparent.png"
              alt="logo"
              onClick={clickLogo}
            />
          )}  
        </div>
        <div className={navOpen ? styles.category : styles.categoryClose}>
          <ul className={styles.categoryBox}>
            <Link to="/about">
              <li
                className={
                  pageY>50 ? styles.titleScroll : 
                  styles.title}
                onClick={handleNavClose}
              >
                ABOUT
              </li>
            </Link>
            <Link to="/gallery">
              <li
                className={
                  pageY>50 ? styles.titleScroll : 
                  styles.title}
                onClick={handleNavClose}
              >
                GALLERY
              </li>
            </Link>
            <Link to="/reviewlist">
              <li
                className={
                  pageY>50 ? styles.titleScroll : 
                  styles.title}
                onClick={handleNavClose}
              >
                REVIEW
              </li>
            </Link>
            <Link to="/register">
              <li
                className={
                  pageY>50 ? styles.titleScroll : 
                  styles.title}
                onClick={handleNavClose}
              >
                REGISTER
              </li>
            </Link>
            <Link to="/contact">
              <li
                className={
                  pageY>50 ? styles.titleScroll : 
                  styles.title}
                onClick={handleNavClose}
              >
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
