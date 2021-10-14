import styles from "./PassModify.module.css";
import { useState } from "react";
import { passModify } from "../../api/mypageApi";
import axios from "axios";
import { useHistory } from "react-router-dom";
require("dotenv").config();
const CryptoJS = require("crypto-js");

axios.defaults.withCredentials = true;
const PassModify = ({ setPassEditPage, setEditFront }) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const secretKey = `${process.env.REACT_APP_CRYPTOJS_SECRETKEY}`;

  const history = useHistory();
  const currentPassHandle = (event) => {
    setCurrentPass(event.target.value);
  };

  const newPasswordHandle = (event) => {
    setNewPassword(event.target.value);
  };
  const newPassword2Handle = (event) => {
    setNewPassword2(event.target.value);
  };
  const checkPass = (asValue) => {
    const regExp = /^[a-zA-z0-9]{4,12}$/;
    return regExp.test(asValue);
  };
  const clickDone = () => {
    if (!currentPass) {
      setErrorMessage("현재 비밀번호를 입력해주세요");
      return false;
    }
    if (!checkPass(currentPass)) {
      setErrorMessage("비밀번호는 4-12자리의 숫자,영문입니다.");
      return false;
    }
    if (newPassword !== newPassword2) {
      setErrorMessage("동일한 비밀번호를 한번더 입력해주세요");
      return false;
    }
    setModalOpen(true);
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
      passModify(passData, setModalOpen, history, setErrorMessage);
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
                  type="password"
                  value={currentPass}
                  placeholder={"현재비밀번호"}
                  className={styles.inputedit}
                  onChange={currentPassHandle}
                />

                <input
                  type="password"
                  placeholder={"새 비밀번호"}
                  value={newPassword}
                  className={styles.inputedit}
                  onChange={newPasswordHandle}
                />

                <input
                  type="password"
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

                <button className={styles.modifyBtn} onClick={clickModify}>
                  수정하기
                </button>
              </div>
            </div>
          </section>
        ) : null}
      </form>
    </section>
  );
};

export default PassModify;
