/* global kakao */
import styles from "./Contact.module.css";
import React, { useEffect, useState } from "react";

const Contact = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.496633, 127.024779),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(37.496633, 127.024779);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    const iwContent = '<div style="text-align:center">art-Ground</div>';
    const iwPosition = new kakao.maps.LatLng(37.496633, 127.024779);

    // 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    infowindow.open(map, marker);
  }, []);

  const clickAsk = () => {
    setIsOpenModal(true);
  };
  return (
    <section className={styles.container}>
      <div className={styles.titleBox}>
        <span>CONTACT US</span>
        <span>아트그라운드에게 궁금한점이 있다면 메일을 보내주세요</span>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.mailBox}>
          <ul className={styles.ulBox}>
            <li className={styles.liBox}>
              <textarea
                placeholder="문의하실 내용을 남겨주세요."
                className={styles.content}
              />
            </li>
            <li className={styles.liBox}>
              <input
                type="text"
                placeholder="이름을 입력해주세요."
                className={styles.name}
              />
              <input
                type="text"
                placeholder="이메일을 입력해주세요."
                className={styles.email}
              />
            </li>
            <li className={styles.liBox2}>
              <input
                type="text"
                placeholder="전화번호를 입력해주세요."
                className={styles.phone}
              />
              <div className={styles.btnBox}>
                <button className={styles.btn} onClick={clickAsk}>
                  문의하기
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.mapBox}>
        <div className={styles.mapBorder}>
          <div
            id="map"
            style={{ width: "700px", height: "350px", overflow: "hidden" }}
          />
        </div>
        <div className={styles.addr}>서울특별시 서초구 서초동 서초대로 396</div>
        <div className={styles.finder}>
          <a
            href="https://map.kakao.com/link/to/코드스테이츠,37.496633, 127.024779"
            target="_blank"
          >
            길찾기
          </a>
        </div>
      </div>
      {""}
      <div className={styles.introBox}>
        <div className={styles.introBorder}>
          <div className={styles.sInfo}>
            <span>문순려</span>
            <span>Back-end</span>
            <span>github</span>
          </div>
          <div className={styles.sInfo}>
            <span>이동욱</span>
            <span>Back-end</span>
            <span>github</span>
          </div>
          <div className={styles.sInfo}>
            <span>유다희</span>
            <span>Front-end</span>
            <span>github</span>
          </div>
          <div className={styles.sInfo}>
            <span>박지영</span>
            <span>Front-end</span>
            <span>github</span>
          </div>
        </div>
      </div>
      {isOpenModal ? (
        <section className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <span className={styles.modalText}>문의메일이 전송되었습니다.</span>
            <div className={styles.btnBox}>
              <button
                className={styles.modifyBtn}
                onClick={() => {
                  setIsOpenModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
};
export default Contact;