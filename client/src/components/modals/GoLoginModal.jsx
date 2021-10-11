import { useHistory } from "react-router";

import styles from "./GoLoginModal.module.css";

const GoLoginModal = ({ setModalOpen }) => {
  const history = useHistory();

  const clickOk = () => {
    setModalOpen(false);
    history.push("/signin");
  };
  const clickNo = () => {
    setModalOpen(false);
  };

  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalWrap}>
        <span className={styles.modalContent}>
          마이페이지는 사용은<br></br> 로그인이 필요합니다!
        </span>
        <p className={styles.modalSubContent}>
          로그인 페이지로 이동하시겠어요?
        </p>
        <div className={styles.ok}>
          <button className={styles.okBtn} onClick={clickOk}>
            네
          </button>
          <button className={styles.okBtn} onClick={clickNo}>
            아니오
          </button>
        </div>
      </div>
    </section>
  );
};

export default GoLoginModal;
