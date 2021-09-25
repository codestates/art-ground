import axios from "axios";

import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ el, setConfirmModal, modalTxt }) => {
  const clickConfirmModal = () => {
    axios
      .post("https:/art-ground.link/admin/exhibition", {
        postId: el.id,
      })
      .then((result) => {
        setConfirmModal(false);
        window.location.href = "https://art-ground.io/admin";
      })
      .catch((err) => console.log(err));
  };

  const clickDeleteModal = () => {
    //마감하기
    console.log(el.id, "마감모달 ok버튼");
    // axios.post("https://art-ground.link/admin/exhibition", {
    //   postId: el.id, //전시회 pid
    // });
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
