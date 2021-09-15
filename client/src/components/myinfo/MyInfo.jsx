import styles from './MyInfo.module.css';

import React from 'react';
import { useHistory } from 'react-router';

const MyInfo = ({ userinfo }) => {
  const history = useHistory();
  const { userEmail, nickname, profileImg, authorDesc } = userinfo;
  console.log(userEmail, '-----------myinfo');

  const modifyCLick = () => {
    history.push('/modify');
  };
  const deleteAccount = () => {
    // 탈퇴요청보내기
  };
  return (
    <section className={styles.container}>
      <div className={styles.infobox1}>
        <div className={styles.imgbox}>
          <div className={styles.imgborder}>
            <img className={styles.ProfileView} src={profileImg} alt='' />
          </div>
        </div>
        <div className={styles.textbox}>
          <ul className={styles.ulbox}>
            <li className={styles.libox}>
              <span className={styles.title}>이메일</span>
              <input
                type='text'
                className={styles.inputbox}
                defaultValue={userEmail}
                readOnly
              />
            </li>
            <li className={styles.libox}>
              <span className={styles.title}>닉네임</span>
              <input
                type='text'
                className={styles.inputbox}
                defaultValue={nickname}
                readOnly
              />
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.infobox2}>
        <div className={styles.authorinfo}>
          <div className={styles.authorinfoTitle}>작가소개</div>
          <textarea
            name='textarea'
            cols='80'
            rows='8'
            id='textarea'
            className={styles.authorText}
            placeholder='작가님을 소개해주세요'
            defaultValue='무용가들의 우아한 동작과 섬세한 표정을 고스란히 담아내는 무용 사진가입니다. 무용가를 전문적으로 촬영한다는 점도 무척 신기한데, 마치 무대 위에서 함께 연기를 하기라도 한 듯 실감나게 표현한다는 점은 더욱 놀랍습니다. 그리고, 김윤식 작가가 체코국립발레단 소속의 현역 발레리노라는 사실까지 알게 되면 그에 대한 호기심은 더욱 커집니다. '
            readOnly
          />
        </div>
      </div>
      <div className={styles.infobox3}>
        <button className={styles.delete} onClick={deleteAccount}>
          회원탈퇴
        </button>
        <button className={styles.modify} onClick={modifyCLick}>
          정보수정
        </button>
      </div>
    </section>
  );
};

export default MyInfo;
