import React from 'react';
import styles from './ArtDetail.module.css';

const ArtDetail = ({ art, handleClose }) => {
  return (
    <section className={styles.container}>
      <div className={styles.background} onClick={handleClose}>
        <img className={styles.img} src={art.image_urls} alt="detail"/>
        <div className={styles.artMetaData}>
          <span className={styles.title}>{art.title}</span>
          <span className={styles.content}>{art.image_desc}</span>
          <p className={styles.subContent}>{art.image_add_desc}</p>
        </div>
      </div>
      <span className={styles.closeBtn} onClick={handleClose}><i className="fas fa-times"></i></span>
    </section>
    
  )
}

export default ArtDetail;