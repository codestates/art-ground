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
      랜딩페이지 클릭하세요(헤더없애기실험)
    </section>
  )
}
export default Landing
