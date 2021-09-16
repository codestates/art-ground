import styles from './Modify.module.css'

import { useHistory } from 'react-router'
import { useState } from 'react'

const Modify = ({ userinfo }) => {
  const history = useHistory()

  const { userEmail, nickname, profileImg, authorDesc } = userinfo
  const cancleClick = () => {
    history.push('/mypage')
  }

  const [userMail, setUserMail] = useState(userEmail)
  const [nickName, setNickName] = useState(nickname)
  const [img, setImg] = useState(profileImg)
  const [authDesc, setAuthDesc] = useState(authorDesc)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  // 이미지 핸들링
  const imgHandle = (event) => {
    // url 가져오기
    const image = event.target.files[0]
    if (image) {
      const imageUrl = URL.createObjectURL(image)
      setImg(imageUrl)
    }
  }
  const emailHandle = (event) => {
    setUserMail(event.target.value)
  }
  const nickNameHandle = (event) => {
    setNickName(event.target.value)
  }
  const passHandle = (event) => {
    setPassword(event.target.value)
  }
  const passHandle2 = (event) => {
    setPassword2(event.target.value)
  }
  const authDescHandle = (event) => {
    setAuthDesc(event.target.value)
  }

  return (
    <section className={styles.container}>
      {/* 1번박스 */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.imgBox}>
          <label for='imgFile' className={styles.imgBorder}>
            <img className={styles.ProfileView} src={img} alt='' />
          </label>
          <label className={styles.editbox} for='imgFile'>
            <img
              src='../../../images/camera.svg'
              alt=''
              className={styles.edit}
            />
          </label>
          <input
            type='file'
            id='imgFile'
            accept='image/*'
            onChange={imgHandle}
            className={styles.imgInput}
          />
        </div>

        {/* 2번박스 */}
        <div className={styles.modiBox}>
          <ul className={styles.ulbox}>
            <li className={styles.libox}>
              <span className={styles.titlebox}>이 메 일</span>
              <input
                type='text'
                value={userMail}
                className={styles.inputedit}
                onChange={emailHandle}
                readOnly
              />
            </li>
            <li className={styles.libox}>
              <span className={styles.titlebox}>닉 네 임</span>
              <input
                type='text'
                value={nickName}
                className={styles.inputedit}
                onChange={nickNameHandle}
              />
            </li>
            <li className={styles.libox}>
              <span className={styles.titlebox}>비밀번호</span>
              <input
                type='text'
                value={password}
                className={styles.inputedit}
                onChange={passHandle}
              />
            </li>
            <li className={styles.libox}>
              <span className={styles.titlebox}>비밀번호확인</span>
              <input
                type='text'
                value={password2}
                className={styles.inputedit}
                onChange={passHandle2}
              />
            </li>
            <li className={styles.passcheck}>유효성검사-비밀번호none</li>
          </ul>
        </div>
        {/* 3번박스 */}
        <div className={styles.modiBox}>
          <div className={styles.authTitle}>작가소개</div>
          <textarea
            name='textarea'
            cols='75'
            rows='15'
            id='textarea'
            className={styles.authorText}
            defaultValue={authDesc}
            onChange={authDescHandle}
          />
        </div>
        {/* 4번박스 */}
        <div className={styles.modiBox}>
          <button className={styles.btn1} onClick={cancleClick}>
            수정취소
          </button>
          <button className={styles.btn2}>정보수정</button>
        </div>
      </form>
    </section>
  )
}

export default Modify
