import styles from './Join.module.css';
import { Link } from 'react-router-dom';

const Join = ({ setIsAuthorJoined, setIsAudienceJoined }) => {
  const clickAudience = () => {
    setIsAudienceJoined(true);
    setIsAuthorJoined(false);
  };

  const clickAuthor = () => {
    setIsAuthorJoined(true);
    setIsAudienceJoined(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.joinbox}>
        <Link to='/join/signup'>
          <button className={styles.btn} onClick={clickAudience}>
            관람객 회원가입
          </button>
        </Link>
        <Link to='/join/signup'>
          <button
            className={`${styles.btn} ${styles.second}`}
            onClick={clickAuthor}
          >
            작가 회원가입
          </button>
        </Link>
        <div className={styles.backToLogin}>
          이미 가입하셨다면{' '}
          <Link to='/signin' className={styles.bold}>
            바로 로그인하기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Join;
