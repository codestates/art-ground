import React, { useState } from 'react'
import styles from './SubNavBar.module.css'

const SubNavBar = (props) => {
  const tags = ['전체', '#회화', '#일러스트레이션', '#순수미술', '#응용미술', '#판화']
  const [tagClicked, setTagClicked] = useState('전체')
  const [isStandard, setIsStandard] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  const tagHandle = (el) => {
    setTagClicked(el)
  }
  const standardHandle = () => {
    setIsStandard(!isStandard)
    setIsPremium(!isPremium)
  }

  return (
    <section className={styles.container}>
      <div className={styles.subNavBar}>
        <span className={isStandard ? styles.subMenuClicked : styles.subMenu} onClick={standardHandle}>STANDARD</span>
        <span className={isPremium ? styles.subMenuClicked : styles.subMenu} onClick={standardHandle}>PREMIUM</span>
      </div>
      <div className={styles.categories}>
        {tags.map(el => <span className={el === tagClicked ? styles.hashtagClicked : styles.hashtag} onClick={() => tagHandle(el)}>{el}</span>)}
      </div>
      <div className={styles.sortWrap}>
        <select className={styles.sort}>
          <option value='최신순'>최신순</option>
          <option value='인기순'>전시마감일순</option>
        </select>
      </div>

    </section>
  )
}

export default SubNavBar
