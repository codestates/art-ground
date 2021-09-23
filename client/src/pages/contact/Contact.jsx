/* global kakao */
import styles from './Contact.module.css'
import React, { useEffect } from 'react'

const Contact = () => {
  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
            center: new kakao.maps.LatLng(37.496633, 127.024779),
      level: 3
    }
    const map = new kakao.maps.Map(container, options)
    const markerPosition = new kakao.maps.LatLng(37.496633, 127.024779)
    const marker = new kakao.maps.Marker({
      position: markerPosition
    })
    marker.setMap(map)

    const iwContent = '<div style="text-align:center">Art-Gallery</div>'
    const iwPosition = new kakao.maps.LatLng(37.496633, 127.024779)

    // 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent
    })

    infowindow.open(map, marker)
  }, [])

  return (
    <section className={styles.container}>
      <div className={styles.titleBox}>Contact Us</div>

      <div className={styles.contactBox}>
        <div className={styles.mapBox}>
          <div className={styles.mapBorder}>
            <div id='map' style={{ width: '400px', height: '300px' }} />
          </div>

          <div className={styles.finder}>
            <a
              href='https://map.kakao.com/link/to/코드스테이츠,37.496633, 127.024779'
              target='_blank'
            >
              길찾기
            </a>
          </div>
        </div>
        <div className={styles.textBox}>
          <ul className={styles.infoBox}>
            <li className={styles.infoTitle}>E-mail</li>
            <li className={styles.infoText}>art_gallery1234@gmail.com</li>
            <li className={styles.infoTitle}>Address</li>
            <li className={styles.infoText}>
              서울특별시 서초구 서초동 서초대로 396
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.titleBox}>Mail Us(opt)</div>
      <div className={styles.mailBox}>
        <ul className={styles.ulBox}>
          <li className={styles.liBox}>
            <input
              type='text'
              placeholder='성함을 입력해주세요.'
              className={styles.name}
            />
          </li>
          <li className={styles.liBox}>
            <input
              type='text'
              placeholder='회신받을 메일을 남겨주세요.'
              className={styles.mail}
            />
          </li>
          <li className={styles.liBox}>
            <textarea
              placeholder='문의하실 내용을 남겨주세요.'
              className={styles.content}
            />
          </li>
          <li className={styles.btnBox}>
            <button className={styles.btn}>문의하기</button>
          </li>
        </ul>
      </div>
    </section>
  )
}
export default Contact
