import { Link, useHistory } from 'react-router-dom';

import styles from './Navbar.module.css';

const Navbar = ({ isLogin, handleLogout }) => {
  const history = useHistory();

  const clickLogo = () => {
    history.push('/');
  };

  return (
    <section className={styles.container}>
      <div className={styles.navBox}>
        <ul className={styles.btns}>
          {!isLogin
            ? (
              <li
                className={styles.btn}
                onClick={() => {
                  history.push('/signin');
                }}
              >
                로그인
              </li>
              )
            : (
              <li
                className={styles.btn}
                onClick={() => {
                  handleLogout();
                  history.push('/');
                }}
              >
                로그아웃
              </li>
              )}
          <Link to='/join'>
            <li className={styles.btn}>회원가입</li>
          </Link>
          <Link to='/mypage'>
            <li className={styles.btn}>마이페이지</li>
          </Link>
        </ul>
        <div className={styles.logo}>
          <span className={styles.logoborder} onClick={clickLogo}>
            ART-GROUND
            {/* <img src="" alt="" className={styles.img}></img> */}
          </span>
        </div>
        <div className={styles.category}>
          <ul className={styles.categoryBox}>
            <li className={styles.title}>ABOUT</li>
            <Link to='/gallery'>
              <li className={styles.title}>GALLERY</li>
            </Link>
            <Link to='/reviewlist'>
              <li className={styles.title}>REVIEW</li>
            </Link>
            <Link to='/register'>
              <li className={styles.title}>REGISTER</li>
            </Link>
            <li className={styles.title}>AUCTION</li>
            <li className={styles.title}>CONTACT</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
