import React from 'react'
import { useHistory } from 'react-router'
import styles from './Landing.module.css';

const Landing = () => {
  const history = useHistory()
  const goAbout = () => {
    history.push('/about')
  }
  return (
    <section className={styles.container} onClick={goAbout}>
      <video muted autoPlay loop className={styles.landingVideo} src="../images/landingVideo.mp4"></video>
      <div className={styles.content}>
        Click to start
      </div>
    </section>
  )
}
export default Landing
