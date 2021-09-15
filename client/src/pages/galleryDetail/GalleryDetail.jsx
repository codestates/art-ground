import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GalleryDetail.module.css';

const GalleryDetail = ({viewArtDetail}) => {

  const [btnSlider, setBtnSlider] = useState(1);

  const tags = ['#현대미술', '#일러스트레이션', '#회화']
  const sliderNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const dummyImg = [
    'https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134',
    'https://images.velog.io/images/devjade/post/4f3086dd-2f8a-4f34-b0aa-cb5d7e8772d2/image.png',
    'https://www.jnilbo.com/photos/2021/08/01/2021080113162205012_l.jpg',
    'https://t1.daumcdn.net/cfile/tistory/99EFE6375A65DFEA33',
    'https://storage.oneslist.com/assets/2021/07/02110805/DAVID_HOCKNEY_5-768x537.jpeg',
    'https://storage.oneslist.com/assets/2021/07/02110805/DAVID_HOCKNEY_4-768x537.jpeg',
    'https://t1.daumcdn.net/cfile/tistory/99E5A8495C91A3021B',
    'https://images.velog.io/images/devjade/post/c11ba610-f5fe-4074-a3b8-c892edf13dd1/%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%B5%E1%84%83%E1%85%B3%E1%84%92%E1%85%A9%E1%84%8F%E1%85%B3%E1%84%82%E1%85%B5.png',
    'https://images.velog.io/images/devjade/post/794f3b2c-f679-4d69-9bd8-b845efd96993/image.png'
  ];


  const slider = (el) => {

    setBtnSlider(el);
  };

  return (
    <section className={styles.container}>
      <div className={styles.space}>
        {tags.map(el=> <span className={styles.tag}>{el}</span>)}
      </div>
      <div className={styles.title}>데이비드 호크니展</div>

      <div className={styles.outer}>
        <div className={
          btnSlider === 1
            ? styles.sliderOuter
            : btnSlider === 2
              ? styles.sliderOuter2
              : btnSlider === 3
                ? styles.sliderOuter3
                : btnSlider === 4
                  ? styles.sliderOuter4
                  : btnSlider === 5
                    ? styles.sliderOuter5
                    : btnSlider === 6
                      ? styles.sliderOuter6
                      : btnSlider === 7
                        ? styles.sliderOuter7
                        : btnSlider === 8
                          ? styles.sliderOuter8
                          : styles.sliderOuter9
          }
        >

          {dummyImg.map(el =>
            <div className={styles.sliderWrap}>
              <img className={styles.slider} src='https://images.velog.io/images/devjade/post/1716edd9-798c-4cf2-9fe9-26f8537d8084/image.png' alt='slider' />
              <img className={styles.sliderPic} src={el} alt='sliderIn' />
            </div>
          )}
        </div>
      </div>

      <div className={styles.btnWrap}>
        {sliderNum.map(el => <button className={el===btnSlider? styles.btnClicked : styles.btn} onClick={() => slider(el)}> </button>)}
      </div>

      <p className={styles.content}>생존작가로서 최고의 경매가를 기록한 데이비드 호크니의 작품 133점을 소개하는 아시아 지역 첫 대규모 개인전인 〈데이비드 호크니〉展에 여러분을 초대합니다.
        이번 전시에서는 호크니의 뮤즈와 주변인을 그린 초상화를 비롯하여 로스앤젤레스 시기의 작품과 호크니의 예술에 있어서 가장 풍요로웠던 60년대 중반의 작업들은 물론,
        80년대 이후 좀 더 실험주의자에 가깝게 변모한 호크니의 작품세계 등 호크니 전 생애에 걸친 시기별 주요작을 통해 호크니를 입체적으로 조명합니다.
      </p>

      <div className={styles.intro}>작가</div>
      <div className={styles.artist}>
        <div className={styles.imgBox}>
          <img className={styles.profilePic} src='https://cdn.indiepost.co.kr/uploads/images/2018/01/23/dPESdv-664x443.jpeg' alt='' />
        </div>
        <div className={styles.contentBox}>
          <span className={styles.artistName}>데이비드 호크니</span>
          <p className={styles.artistContent}>1960년대부터 현재까지 꾸준히 사랑을 받아온 현대미술을 그립니다.
            60여 년의 긴 작업 여정 동안 작품의 형식에 구애를 받지 않고 다양한 매체로, 다채로운 스타일을 시도하고 있습니다.
            여러 각도로 대상을 해체하고, 동양화의 다시점 투시법 등의 표현 방식을 지속적으로 연구하여 작품에 활용합니다.
          </p>

        </div>
      </div>

      <div className={styles.workList}>작품</div>
      <ul className={styles.workBox}>
        {dummyImg.map(el =>
          <li>
            <Link to='/artdetail'>
              <img className={styles.work} src={el} alt='art' onClick={() => viewArtDetail(el)}/>
            </Link>
            <span className={styles.workTitle}>호크니1</span>
            <span className={styles.workContent}>제작연도 : 2021, 재료 : Digital drawing, 크기 : 59.4x42.0cm</span>
          </li>)}

      </ul>
      <div className={styles.space} />
    </section>
  );
};

export default GalleryDetail;
