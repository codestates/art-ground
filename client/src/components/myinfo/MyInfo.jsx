import styles from "./MyInfo.module.css";
import { useHistory } from "react-router";

import axios from "axios";

const MyInfo = ({ userinfo, setUserinfo, setIsLogin }) => {
  const history = useHistory();

  const modifyCLick = () => {
    history.push("/modify");
  };

  const img = !userinfo.profile_img
    ? "../../../images/profile.jpeg"
    : userinfo.profile_img;

  return (
    <section className={styles.container}>
      <>
        <div className={styles.infobox1}>
          <div>프로필 Profile</div>
        </div>
        <div className={styles.infobox2}>
          <div className={styles.imgbox}>
            <div className={styles.imgborder}>
              <img className={styles.ProfileView} src={img} alt="profileImg" />
            </div>
          </div>
          <div className={styles.textbox}>
            <ul className={styles.ulbox}>
              <li className={styles.libox}>
                <span className={styles.title}>이메일</span>
                <input
                  type="text"
                  className={styles.inputbox}
                  defaultValue={userinfo.user_email}
                  readOnly
                />
              </li>
              <li className={styles.libox}>
                <span className={styles.title}>닉네임</span>
                <input
                  type="text"
                  className={styles.inputbox}
                  defaultValue={userinfo.nickname}
                  readOnly
                />
              </li>
            </ul>
          </div>
        </div>
        {userinfo.user_type === 2 ? (
          <>
            <div className={styles.infobox1}>
              <div>작가 소개</div>
            </div>
            <div className={styles.infobox3}>
              <div className={styles.authorinfo}>
                <textarea
                  name="textarea"
                  cols="80"
                  rows="15"
                  id="textarea"
                  className={styles.authorText}
                  placeholder="작가님을 소개해주세요"
                  defaultValue={userinfo.author_desc}
                  readOnly
                />
              </div>
            </div>
          </>
        ) : null}
        <div className={styles.infobox4}>
          <button className={styles.modify} onClick={modifyCLick}>
            정보수정
          </button>
        </div>
      </>
    </section>
  );
};

export default MyInfo;
