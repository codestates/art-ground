import styles from "./Modify.module.css";
import { useState } from "react";
import { deleteAccount } from "../../api/mypageApi";
import InfoModify from "../../components/infoModify/InfoModify";
import PassModify from "../../components/passModify/PassModify";
import axios from "axios";
require("dotenv").config();
axios.defaults.withCredentials = true;
const Modify = ({ userinfo, setUserinfo }) => {
  const [editFront, setEditFront] = useState(true);
  const [infoEditPage, setInfoEditPage] = useState(false);
  const [passEditPage, setPassEditPage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const clickInfoEdit = () => {
    setEditFront(false);
    setInfoEditPage(true);
    setPassEditPage(false);
  };

  const clickPassEdit = () => {
    setEditFront(false);
    setInfoEditPage(false);
    setPassEditPage(true);
  };

  const deleteId = () => {
    setModalOpen(true);
  };
  const clickDelete = () => {
    deleteAccount();
  };
  const img = !userinfo.profile_img
    ? "../../../images/profile.jpeg"
    : userinfo.profile_img;
  return (
    <section className={styles.container}>
      {editFront ? (
        <div className={styles.topBox}>
          <div className={styles.contentBorder}>
            <main className={styles.infoEdit}>
              <div className={styles.infoTitle}>art-Ground 프로필</div>
              <div className={styles.infoContent}>
                <span className={styles.imgBorder}>
                  <img className={styles.ProfileView} src={img} alt="" />
                </span>
                <div className={styles.nickName}>
                  <span>닉네임 :</span>
                  <span>{userinfo.nickname}</span>
                </div>
              </div>
              <div className={styles.infoBtnBox}>
                <button className={styles.deleteBtn} onClick={deleteId}>
                  회원탈퇴
                </button>
                <button className={styles.infoBtn} onClick={clickInfoEdit}>
                  수정
                </button>
              </div>
            </main>
            <main className={styles.passEdit}>
              <div className={styles.infoTitle}>비밀번호</div>

              <div className={styles.PassBtnBox}>
                <button className={styles.passBtn} onClick={clickPassEdit}>
                  비밀번호수정
                </button>
              </div>
            </main>
          </div>
        </div>
      ) : null}
      {infoEditPage ? (
        <InfoModify
          userinfo={userinfo}
          setInfoEditPage={setInfoEditPage}
          setEditFront={setEditFront}
          setUserinfo={setUserinfo}
        />
      ) : null}
      {passEditPage ? (
        <PassModify
          userinfo={userinfo}
          setPassEditPage={setPassEditPage}
          setEditFront={setEditFront}
          setUserinfo={setUserinfo}
        />
      ) : null}
      {modalOpen ? (
        <section className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <span className={styles.modalText}>정말 탈퇴하시겠습니까?</span>
            <div className={styles.btnBox}>
              <button className={styles.delBtn} onClick={clickDelete}>
                탈퇴하기
              </button>
              <button
                className={styles.modifyBtn}
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                아니오
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
};

export default Modify;
