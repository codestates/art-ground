import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArtDetail.module.css';

const ArtDetail = ({ art }) => {
  return (
    <section className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.artMetaData}>
        <h2 className={styles.title}>호크니2</h2>
        <span className={styles.content}>제작연도 : 2021, 재료 : Digital drawing, 크기 : 59.4x42.0cm</span>
        <p className={styles.subContent}>Artspace 15.8의 개관기념전, 퍼블릭갤러리의 아트마켓 참여 이후 서울 옥션 전시를 함께한 아티스트죠. 
          그의 붓끝에서 태어난 인물들은 정면 대신 자신이 보고 싶은 곳을 바라봅니다. 
          즉흥적으로 섞은 물감의 조화로운 색상을 감상하세요.</p>
      </div>
      <Link to='/gallerydetail'>
        <span className={styles.closeBtn}><i class="fas fa-times"></i></span>
      </Link>
      <img className={styles.img} src={art} alt="detail"/>
    </section>
    
  )
}

export default ArtDetail;