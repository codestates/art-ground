import styles from "./AdminEx.module.css";
import React, { useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import ExPending from "../exPending/Expending";

const AdminEx = ({ el, updateEx, deleteEx, doneEx }) => {
  const [modalTxt, setModalTxt] = useState({
    confirm: "승인",
    delete: "마감",
  });
  const [confirmModal, setConfirmModal] = useState(false);

  const clickConfirm = () => {
    setConfirmModal(true);
  };

  const clickDelete = () => {
    //console.log(el, "elelelel");
    setConfirmModal(true);
  };

  const [clickedId, setClickedId] = useState(null);
  const [clickStatus, setClickStatus] = useState(false);

  const clickAdminTitle = (id) => {
    setClickedId(el);
    setClickStatus(true);
  };

  const imgurl =
    el.images.length > 0
      ? el.images[0].image_urls
      : "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png";
  const imgurlAlt = el.images.length > 0 ? el.images[0].title : null;

  if (clickStatus) {
    return (
      <ExPending
        clickedId={clickedId}
        setClickedId={setClickedId}
        deleteEx={deleteEx}
        doneEx={doneEx}
        setClickStatus={setClickStatus}
      />
    );
  } else {
    return (
      <section className={styles.container}>
        <div className={styles.box}>
          {updateEx ? (
            <>
              {el.status === 0 ? (
                <div className={styles.upDateBox}>
                  <div className={styles.exBox}>
                    <div className={styles.thumBox}>
                      <img
                        src={imgurl}
                        alt={imgurlAlt}
                        className={styles.eximg}
                      />
                    </div>
                    <div className={styles.infoBox}>
                      <div className={styles.title}>{el.title}</div>
                      <div
                        className={styles.detail}
                        onClick={() => clickAdminTitle(el.id)}
                      >
                        [ 자세히 보기 ]
                      </div>
                      <div className={styles.author}>{el.author.nickname}</div>
                      <div className={styles.date}>
                        <span>전시기간:</span>
                        <span>{el.start_date}</span>
                        <span>~</span>
                        <span>{el.end_date}</span>
                      </div>
                    </div>
                    <div className={styles.btnBox}>
                      <button className={styles.btn} onClick={clickConfirm}>
                        승인하기
                      </button>
                    </div>
                  </div>
                  {confirmModal ? (
                    <ConfirmModal
                      el={el}
                      setConfirmModal={setConfirmModal}
                      modalTxt={modalTxt.confirm}
                    />
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}
          {deleteEx ? (
            <>
              {el.status === 1 ? (
                <div className={styles.upDateBox}>
                  <div className={styles.exBox}>
                    <div className={styles.thumBox}>
                      <img
                        src={imgurl}
                        alt={imgurlAlt}
                        className={styles.eximg}
                      />
                    </div>
                    <div className={styles.infoBox}>
                      <div className={styles.title}>{el.title}</div>
                      <div className={styles.author}>{el.author.nickname}</div>
                      <div className={styles.date}>
                        <span>전시기간:</span>
                        <span>{el.start_date}</span>
                        <span>~</span>
                        <span>{el.end_date}</span>
                      </div>
                    </div>
                    <div className={styles.btnBox}>
                      <button className={styles.btn} onClick={clickDelete}>
                        마감하기
                      </button>
                    </div>
                  </div>
                  {confirmModal ? (
                    <ConfirmModal
                      el={el}
                      setConfirmModal={setConfirmModal}
                      modalTxt={modalTxt.delete}
                    />
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}
          {doneEx ? (
            <>
              {el.status === 2 ? (
                <div className={styles.upDateBox}>
                  <div className={styles.exBox}>
                    <div className={styles.thumBox}>
                      <img
                        src={imgurl}
                        alt={imgurlAlt}
                        className={styles.eximg}
                      />
                    </div>
                    <div className={styles.infoBox}>
                      <div className={styles.title}>{el.title}</div>
                      <div className={styles.author}>{el.author.nickname}</div>
                      <div className={styles.date}>
                        <span>전시기간:</span>
                        <span>{el.start_date}</span>
                        <span>~</span>
                        <span>{el.end_date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </section>
    );
  }
};

export default AdminEx;
