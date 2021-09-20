import React from 'react';
import styles from './About.module.css';

const About = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>허전하니까 일단 그냥 채워놓은 페이지</div>
      <div className={styles.imgBox}>
        <img className={styles.img} src="../../../images/main.jpeg" alt=""/>
        <img className={styles.img} src="../../../images/main2.jpeg" alt=""/>
      </div>
    </section>
  )
}

export default About;