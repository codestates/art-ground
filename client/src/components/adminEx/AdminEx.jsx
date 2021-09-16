import styles from './AdminEx.module.css'

import React from 'react'

const AdminEx = ({ updateEx, deleteEx, setUpdateEx, setDeleteEx }) => {
  const clickUpdate = () => {
    setUpdateEx(true)
    setDeleteEx(false)
  }
  const clickDelete = () => {
    setUpdateEx(false)
    setDeleteEx(true)
  }
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.filterBox}>
          <span className={styles.filterBtn} onClick={clickUpdate}>
            승인대기
          </span>
          <span className={styles.filterBtn} onClick={clickDelete}>
            마감대기
          </span>
        </div>
        {updateEx ? (
          <div className={styles.upDateBox}>
            <div className={styles.exBox}>
              <div className={styles.thumBox}>
                <img
                  src='../../../images/exhibit2.webp'
                  alt=''
                  className={styles.eximg}
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.title}>팰리스 드 도쿄 사진전</div>
                <div className={styles.date}>전시기간:10/16~12/30</div>
              </div>
              <div className={styles.btnBox}>
                <button className={styles.btn}>승인하기</button>
              </div>
            </div>

            <div className={styles.exBox}>
              <div className={styles.thumBox}>
                <img
                  src='../../../images/exhibit2.webp'
                  alt=''
                  className={styles.eximg}
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.title}>팰리스 드 도쿄 사진전</div>
                <div className={styles.date}>전시기간:10/16~12/30</div>
              </div>
              <div className={styles.btnBox}>
                <button className={styles.btn}>승인하기</button>
              </div>
            </div>

            <div className={styles.exBox}>
              <div className={styles.thumBox}>
                <img
                  src='../../../images/exhibit2.webp'
                  alt=''
                  className={styles.eximg}
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.title}>팰리스 드 도쿄 사진전</div>
                <div className={styles.date}>전시기간:10/16~12/30</div>
              </div>
              <div className={styles.btnBox}>
                <button className={styles.btn}>승인하기</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.DeleteBox}>
            <div className={styles.exBox}>
              <div className={styles.thumBox}>
                <img
                  src='https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134'
                  alt=''
                  className={styles.eximg}
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.title}>데이비드 호크니展</div>
                <div className={styles.date}>전시기간:10/16~12/30</div>
              </div>
              <div className={styles.btnBox}>
                <button className={styles.btn2}>마감하기</button>
              </div>
            </div>

            <div className={styles.exBox}>
              <div className={styles.thumBox}>
                <img
                  src='https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134'
                  alt=''
                  className={styles.eximg}
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.title}>데이비드 호크니展</div>
                <div className={styles.date}>전시기간:10/16~12/30</div>
              </div>
              <div className={styles.btnBox}>
                <button className={styles.btn2}>마감하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminEx
