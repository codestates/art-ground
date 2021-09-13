import React from 'react';
import styles from './Gallery.module.css';

const Gallery = (props) => {
  
  
  
  return(
    <section className={styles.container}>
      <div className={styles.subNavBar}>
        <span className={styles.subMenu}>STANDARD</span>
        <span className={styles.subMenu}>PREMIUM</span>
      </div>
    </section>
  )
}

export default Gallery;