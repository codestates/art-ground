import React from 'react'
import Reply from '../../components/reply/Reply'
import styles from './ReviewDetail.module.css'

const ReviewDetail = (props) => {
  const tags = ['#현대미술', '#일러스트레이션', '#회화']
  return (
    <section className={styles.container}>
      <div className={styles.artDetail}>

        <div className={styles.imgBox}>
          <img className={styles.thumbnail} src='https://t1.daumcdn.net/cfile/tistory/99EFE6375A65DFEA33' alt='thumbnail' />
        </div>

        <div className={styles.metaData}>
          <h2 className={styles.title}>데이비드 호크니展</h2>
          <div className={styles.metaContent}>

            <div className={styles.list}>
              <span className={styles.listDetail}>작가:</span>
              <span className={styles.listDetail}>전시기간:</span>
              <span className={styles.listDetail}>카테고리:</span>
            </div>

            <div className={styles.content}>
              <span className={styles.listDetail}>데이비드 호크니</span>
              <span className={styles.listDetail}>2021-09-13 ~ 2021-12-31</span>
              <div className={styles.tagList}>
                {tags.map(el => <span className={styles.tag}>{el}</span>)}
              </div>
            </div>

          </div>
        </div>
      </div>

      <span className={styles.review}>리뷰</span>

      <ul className={styles.replies}>

        <div className={styles.replyBox}>
          <input className={styles.reply} placeholder='로그인하셔야 리뷰를 작성할 수 있습니다' type='text' />
          <button className={styles.replyIcon}>등록</button>
        </div>

        <Reply />
        <Reply />
        <Reply />
      </ul>
    </section>
  )
}

export default ReviewDetail
