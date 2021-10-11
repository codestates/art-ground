import React, { useEffect, useRef, useState } from 'react'
import styles from "./Landing.module.css";
import gsap from "gsap";
import { useHistory } from 'react-router';


const Landing = () => {

  const wrapperRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderRef2 = useRef(null);
  const contentRef = useRef(null);
 
  const txt = 'an artist + audience = "artience"';
  const [Text, setText] = useState('');
  const [Count, setCount] = useState(0);
  
  useEffect(()=> {
    gsap.to(wrapperRef.current, {
      duration: 2.5,
      height: 0,
      ease: "power3.inOut",
      delay: 7
    });
  
    var tl = gsap.timeline();
  
    tl.from(loaderRef.current, {
        duration: 1,
        scaleY: 0,
        y: 80,
        ease: "power3.inOut",
        delay: 0.5,
        transformOrigin:"50% 100%"
    });
    tl.to(loaderRef.current, {
      duration: 1,
      height: 30,
      scaleY: 0,
      ease: "power3.inOut",
      transformOrigin:"0% -100%", 
      delay: 0.4
  });
    tl.from(loaderRef2.current, {
      duration: 0.8,
      scaleY: 0,
      y: 80,
      ease: "power3.inOut",
      delay: 0.3,
      transformOrigin:"50% 100%"
  });

    tl.to(loaderRef2.current, {
      duration: 2,
      height: 30,
      scaleY: 0,
      ease: "power3.inOut",
      transformOrigin:"0% -100%", 
      delay: 1.7
  });
    tl.from(contentRef.current, {
      duration: 2,
      scaleY: 0,
      y: 80,
      ease: "power3.inOut",
      delay: 0,
      transformOrigin:"50% 100%"
    });
  }, [])
 
  //타이핑 효과 function
  useEffect(() => {
    const interval = setInterval(() => {
      setText(Text + txt[Count]); 
      setCount(Count + 1); 
    }, 145);
    if(Count === txt.length){  
        clearInterval(interval); 
    } 
    return () => clearInterval(interval); 
  })

  const history = useHistory();

  const goAbout = () => {
    history.push('/about')  
  }
 
  return (

    <section>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div ref={loaderRef} className={styles.loader}>Anyone can be</div>
        <div ref={loaderRef2} className={styles.loader}>{Text}</div>
      </div>
      <div>
        <div className={styles.container}>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src="../images/video.gif" alt="landing video"/>
          </div>
        </div>
        <div ref={contentRef} className={styles.title}>
          <h1 className={styles.content1}>누구나 예술가가 될 수 있는 공간,</h1>
          <h2 className={styles.content2}>아트그라운드</h2>
          <span className={styles.button} onClick={goAbout}>시작하기</span>
        </div>
      </div>
    </section>
  )
}
export default Landing