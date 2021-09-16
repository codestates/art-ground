import { useState } from "react";
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

  return (
    <section className={styles.container}>
      <div className={styles.navBox}>
        <div className={styles.topNavBox}>
          <span className={styles.moreOpt} onClick={handleNavOpen}>
            <i class="fas fa-bars"></i>
          </span>
          <ul className={styles.btns}>
            {!isLogin ? (
              <li
                className={styles.btn}
                onClick={() => {
                  history.push("/signin");
                }}
              >
                로그인
              </li>
            ) : (
              <li
                className={styles.btn}
                onClick={() => {
                  handleLogout();
                  history.push("/");
                }}
              >
                로그아웃
              </li>
            )}
            <Link to="/join">
              <li className={styles.btn}>회원가입</li>
            </Link>
            <Link to="/mypage">
              <li className={styles.btn}>마이페이지</li>
            </Link>
          </ul>
        </div>
        <div className={styles.logo}>
          <img
            className={styles.logoImg}
            src="../../../images/Original on Transparent.png"
            alt="logo"
            onClick={clickLogo}
          />
        </div>
        <div className={navOpen ? styles.category : styles.categoryClose}>
          <ul className={styles.categoryBox}>
            <li className={styles.title} onClick={handleNavClose}>
              ABOUT
            </li>
            <Link to="/gallery">
              <li className={styles.title} onClick={handleNavClose}>
                GALLERY
              </li>
            </Link>
            <Link to="/reviewlist">
              <li className={styles.title} onClick={handleNavClose}>
                REVIEW
              </li>
            </Link>
            <Link to="/register">
              <li className={styles.title} onClick={handleNavClose}>
                REGISTER
              </li>
            </Link>
            <Link to="/auction">
              <li className={styles.title} onClick={handleNavClose}>
                AUCTION
              </li>
            </Link>
            <Link to="/contact">
              <li className={styles.title} onClick={handleNavClose}>
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
