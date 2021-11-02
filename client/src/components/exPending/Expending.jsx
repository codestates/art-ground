import React from "react";
import styles from "./Expending.module.css";

const ExPending = ({ clickedId, deleteEx, doneEx, setClickStatus }) => {
  if (deleteEx) {
    setClickStatus(false);
  }
  if (doneEx) {
    setClickStatus(false);
  }
  const tags = clickedId.genre_hashtags;
  //console.log(tags);
  return (
    <section className={styles.container}>
      <div className={styles.liBtnBox1} onClick={() => setClickStatus(false)}>
        <img
          className={styles.btn1}
          src="https://images.velog.io/images/beablessing/post/b3e80067-e3d2-4223-9021-c2c9ab26bf53/outline_expand_less_black_24dp.png"
          alt="스크롤업"
        ></img>
      </div>
      <ul className={styles.box}>
        <li className={styles.liBox}>
          <div className={styles.column}>신청일시</div>
          <ul className={styles.contentBox}>
            <li>
              <span className={styles.sContentDate}>
                {clickedId.updatedAt.split("T")[0]}
              </span>
            </li>
          </ul>
        </li>
        <li className={styles.liBox}>
          <div className={styles.column}>작가정보</div>
          <ul className={styles.contentBox}>
            <li>
              <span className={styles.sColumn}>아이디</span>
              <span className={styles.sContent}>
                {clickedId.author.user_email}
              </span>
            </li>
            <li>
              <span className={styles.sColumn}>작가명</span>
              <span className={styles.sContent}>
                {clickedId.author.nickname}
              </span>
            </li>
          </ul>
        </li>
        <li className={styles.liBox}>
          <div className={styles.column}>전시정보</div>
          <ul className={styles.contentBox}>
            <li>
              <span className={styles.sColumn}>전시명</span>
              <span className={styles.sContent}>{clickedId.title}</span>
            </li>
            <li>
              <span className={styles.sColumn}>전시 타입</span>
              <span className={styles.sContent}>
                {clickedId.exhibit_type === 1 ? "standard" : "premium"}
              </span>
            </li>
            <li>
              <span className={styles.sColumn}>기간</span>
              <span className={styles.sContent}>
                {clickedId.start_date} ~ {clickedId.end_date}
              </span>
            </li>
            <li>
              <span className={styles.sColumn}>작품설명</span>
              <span className={styles.sContent}>{clickedId.exhibit_desc}</span>
            </li>
          </ul>
        </li>
        <li className={styles.liBox}>
          <div className={styles.column}>작품 디테일</div>
          <ul className={styles.contentBox2}>
            {clickedId.images.map((el, idx) => {
              return (
                <>
                  <li>
                    <span className={styles.sColumn}>작품 이미지</span>
                    <span className={styles.sContentImg}>
                      {el.image_urls === null ? (
                        <img
                          className={styles.artImg}
                          src={
                            "https://images.velog.io/images/beablessing/post/54131e26-0389-412e-b88d-a8b6a97600a8/noimg.png"
                          }
                          alt="작품이미지"
                        ></img>
                      ) : (
                        <img
                          className={styles.artImg}
                          src={el.image_urls}
                        ></img>
                      )}
                    </span>
                  </li>
                  <li>
                    <span className={styles.sColumn}>작품명</span>
                    <span className={styles.sContent}>
                      <span className={styles.sContentTxt}>{el.title}</span>
                    </span>
                  </li>
                  <li>
                    <span className={styles.sColumn}>작품 설명</span>
                    <span className={styles.sContent}>
                      <span className={styles.sContentTxt}>
                        {el.image_add_desc}
                      </span>
                    </span>
                  </li>
                </>
              );
            })}
          </ul>
        </li>
        <li className={styles.liBtnBox1} onClick={() => setClickStatus(false)}>
          <img
            className={styles.btn1}
            src="https://images.velog.io/images/beablessing/post/b3e80067-e3d2-4223-9021-c2c9ab26bf53/outline_expand_less_black_24dp.png"
            alt="스크롤업"
          ></img>
        </li>
      </ul>
    </section>
  );
};

export default ExPending;
