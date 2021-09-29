import React, { useEffect, useRef } from 'react'
import styles from "./Landing.module.css";
import gsap from "gsap";
import { useHistory } from 'react-router';


const Landing = () => {

  const wrapperRef = useRef(null);
  const loaderRef = useRef(null);
  const boxRef = useRef(null);
  const contentRef = useRef(null);
  
  
  useEffect(()=> {
    gsap.to(wrapperRef.current, {
      duration: 3,
      top: "-100%",
      ease: "power3.inOut",
      delay: 4
    });
  
    var tl = gsap.timeline();
  
    tl.from(loaderRef.current, {
        duration: 2,
        scaleY: 0,
        y: 80,
        ease: "power3.inOut",
        delay: 1,
        transformOrigin:"50% 100%"
    });
  
    tl.to(loaderRef.current, {
        duration: 2,
        height: 40,
        scaleY: 0,
        ease: "power3.inOut",
        transformOrigin:"0% -100%"
    });
    tl.from(contentRef.current, {
      duration: 2,
      scaleY: 0,
      y: 80,
      ease: "power3.inOut",
      delay: 1,
      transformOrigin:"50% 100%"
    });
  
    gsap.to(boxRef.current, {
      duration: 2,
      y: "-100%",
      ease: "power3.inOut",
      delay: 5,
    });
  }, [])
 
  const history = useHistory();

  const goAbout = () => {
    history.push('/about')  
  }

  return (

    <section>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div ref={loaderRef} class={styles.loader}>Anyone can be an „authience“</div>
      </div>
      <div>
        <div class={styles.container}>
          <div ref={boxRef} class={styles.box}></div>
          <div class={styles.imgWrapper}>
            <img class={styles.img} src="../images/video.gif"/>
          </div>
        </div>
        <div ref={contentRef} class={styles.title}>
          <h1 class={styles.content1}>누구나 예술가가 될 수 있는 공간,</h1>
          <h2 class={styles.content2}>아트그라운드</h2>
          <button class={styles.button} onClick={goAbout}>시작하기</button>
        </div>
        {/* <div ref={boxRef2} class={styles.box}></div> */}
      </div>
    </section>
  )
}
export default Landing
