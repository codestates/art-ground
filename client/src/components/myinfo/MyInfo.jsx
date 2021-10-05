import styles from "./MyInfo.module.css";
import { useHistory } from "react-router";
import { deleteAccount } from "../../api/mypageApi";
import axios from "axios";
import { useState } from "react";

axios.defaults.withCredentials = true;
const MyInfo = ({ userinfo, setUserinfo, setIsLogin }) => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const modifyCLick = () => {
    history.push("/modify");
  };
  const clickDelete = () => {
    deleteAccount();
  };
  const deleteId = () => {
    setModalOpen(true);
  };

  const img = !userinfo.profile_img
    ? "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png"
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
          <button className={styles.delete} onClick={deleteId}>
            회원탈퇴
          </button>
          <button className={styles.modify} onClick={modifyCLick}>
            정보수정
          </button>
        </div>
        {modalOpen ? (
          <section className={styles.modalContainer}>
            <div className={styles.modalBox}>
              <span className={styles.modalText}>정말 탈퇴하시겠습니까?</span>
              <div className={styles.btnBox}>
                <button
                  className={styles.modifyBtn}
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  아니오
                </button>

                <button className={styles.modifyBtn} onClick={clickDelete}>
                  탈퇴하기
                </button>
              </div>
            </div>
          </section>
        ) : null}
      </>
    </section>
  );
};

export default MyInfo;
