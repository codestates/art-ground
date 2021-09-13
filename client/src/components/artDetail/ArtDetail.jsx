import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArtDetail.module.css';

const ArtDetail = ({ art }) => {
  return (
    <section className={styles.container}>
      <div className={styles.background}></div>
      <Link to='/gallerydetail'>
        <span className={styles.closeBtn}><i class="fas fa-times"></i></span>
      </Link>
      <img className={styles.img} src={art} alt="detail"/>
    </section>
    
  )
}

export default ArtDetail;