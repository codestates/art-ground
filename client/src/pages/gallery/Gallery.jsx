
import React, { useEffect } from 'react';
import { getStandardGallery } from '../../api/galleryApi';
//import { Link } from 'react-router-dom';
import GalleryContent from '../../components/galleryContent/GalleryContent';
import SubNavBar from '../../components/subNavBar/SubNavBar';
import styles from './Gallery.module.css';

const Gallery = ({ isLogin }) => {

  useEffect(() => {
    //getStandardGallery();
    
  }); 

  const handleFilter = (el) => {
    //getStandardGallery or getPremiumGallery 요청 받은 거에서 필터링...!
  }

  return (
    <section className={styles.container}>
      <SubNavBar />
      <ul className={styles.objectList}>
        <GalleryContent isLogin={isLogin} handleFilter={handleFilter}/>
        <GalleryContent />
        <GalleryContent />
        <GalleryContent />
      </ul>

    </section>

  );
};

export default Gallery;