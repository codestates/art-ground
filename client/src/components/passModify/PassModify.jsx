import styles from "./PassModify.module.css";
import { useHistory } from "react-router";
import { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
const CryptoJS = require("crypto-js");
require("dotenv").config();

axios.defaults.withCredentials = true;
const PassModify = ({
  userinfo,
  setPassEditPage,
  setEditFront,
  setUserinfo,
}) => {
  const history = useHistory();

  const [currentPass, setCurrentPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const secretKey = "Klassiker";

  const currentPassHandle = (event) => {
    setCurrentPass(event.target.value);
  };

  const newPasswordHandle = (event) => {
    setNewPassword(event.target.value);
  };
  const newPassword2Handle = (event) => {
    setNewPassword2(event.target.value);
  };

  const clickDone = () => {
    if (!currentPass) {
      setErrorMessage("현재 비밀번호를 입력해주세요");
      return false;
    } else {
      setErrorMessage("");
    }
    if (newPassword !== newPassword2) {
      setErrorMessage("동일한 비밀번호를 한번더 입력해주세요");
      return false;
    } else {
      setErrorMessage("");
    }
    setModalOpen(true);
    console.log(currentPass, newPassword, newPassword2);
  };

  const cancleClick = () => {
    setPassEditPage(false);
    setEditFront(true);
  };

  const clickModify = () => {
    //암호화
    if (currentPass && newPassword) {
      const encryptedcurPass = CryptoJS.AES.encrypt(
        JSON.stringify(currentPass),
        secretKey
      ).toString();

      const encryptedNewPass = CryptoJS.AES.encrypt(
        JSON.stringify(newPassword),
        secretKey
      ).toString();

      const passData = {
        currentPassword: encryptedcurPass,
        newPassword: encryptedNewPass,
      };
      console.log(passData);
      axios //art-ground.link
        .patch("https://localhost:5000/mypage/password", passData)
        .then((result) => {
          console.log(result, "비밀번호 수정 데이터 ");
          setModalOpen(false);
        });
    }
  };

  return (
    <section className={styles.container}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.contentBorder}>
          <div className={styles.infoModiBox}>
            <ul className={styles.ulbox}>
              <li className={styles.liTitle}>
                <span>비밀번호 변경</span>
                <span>
                  각 ID/모든 웹사이트에 고유한 비밀번호를 사용하십시오 .
                </span>
                <span>기존 비밀번호와 크게 다른지 확인하세요 .</span>
              </li>
              <li className={styles.liEdit}>
                <input
                  type="text"
                  value={currentPass}
                  placeholder={"현재비밀번호"}
                  className={styles.inputedit}
                  onChange={currentPassHandle}
                />
                <input
                  type="text"
                  placeholder={"새 비밀번호"}
                  value={newPassword}
                  className={styles.inputedit}
                  onChange={newPasswordHandle}
                />

                <input
                  type="text"
                  placeholder={"새 비밀번호를 확인합니다"}
                  value={newPassword2}
                  className={styles.inputedit}
                  onChange={newPassword2Handle}
                />
              </li>

              {errorMessage ? (
                <li className={styles.passcheck}>{errorMessage}</li>
              ) : null}
              <li className={styles.liBtn}>
                <button onClick={clickDone}>확인</button>
                <button onClick={cancleClick}>수정취소</button>
              </li>
            </ul>
          </div>
        </div>
        {modalOpen ? (
          <section className={styles.modalContainer}>
            <div className={styles.modalBox}>
              <span className={styles.modalText}>정말 수정하시겠습니까?</span>
              <div className={styles.btnBox}>
                <button
                  className={styles.modifyBtn}
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  아니오
                </button>
                <Link to="/mypage">
                  <button className={styles.modifyBtn} onClick={clickModify}>
                    수정하기
                  </button>
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </form>
    </section>
  );
};

export default PassModify;
