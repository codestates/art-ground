import styles from "./ConfirmModal.module.css";
import { confirmExhibition, deleteExhibition } from "../../api/adminApi";

const ConfirmModal = ({ el, setConfirmModal, modalTxt }) => {
  //console.log(el, "elelel");
  const clickConfirmModal = () => {
    confirmExhibition(setConfirmModal, el);
  };

  const clickDeleteModal = () => {
    deleteExhibition(setConfirmModal, el);
  };

  const clickNo = () => {
    setConfirmModal(false);
  };
  return (
    <section className={styles.modalContainer}>
      {modalTxt === "승인" ? (
        <div className={styles.modalWrap}>
          <span className={styles.modalContent}>
            전시 {modalTxt}하시겠습니까 ?
          </span>
          <p className={styles.modalSubContent}>
            확인을 누르시면<br></br>해당 전시회가 {modalTxt}됩니다.
          </p>
          <div className={styles.ok}>
            <button className={styles.okBtn} onClick={clickNo}>
              아니오
            </button>
            <button className={styles.okBtn} onClick={clickConfirmModal}>
              확인
            </button>
          </div>
        </div>
      ) : null}
      {modalTxt === "마감" ? (
        <div className={styles.modalWrap}>
          <span className={styles.modalContent}>
            전시 {modalTxt}하시겠습니까 ?
          </span>
          <p className={styles.modalSubContent}>
            확인을 누르시면<br></br>해당 전시회가 {modalTxt}됩니다.
          </p>
          <div className={styles.ok}>
            <button className={styles.okBtn} onClick={clickNo}>
              아니오
            </button>
            <button className={styles.okBtn} onClick={clickDeleteModal}>
              확인
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ConfirmModal;
