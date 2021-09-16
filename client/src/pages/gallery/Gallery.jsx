import React from 'react';
//import { Link } from 'react-router-dom';
import GalleryContent from '../../components/galleryContent/GalleryContent';
import SubNavBar from '../../components/subNavBar/SubNavBar';
import styles from './Gallery.module.css';

const Gallery = (props) => {
  return (
    <section className={styles.container}>
      <SubNavBar />
      <ul className={styles.objectList}>
        <GalleryContent />
        <GalleryContent />
        <GalleryContent />
        <GalleryContent />
      </ul>

    </section>

  );
};

export default Gallery;