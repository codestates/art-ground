import "./AboutRevSlider.css";
import React, { useState } from "react";
import Carousel, { consts } from "react-elastic-carousel";

const AboutRevSlider = (props) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    // { width: 1200, itemsToShow: 4 },
  ];

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? "<" : ">";
    return (
      <button onClick={onClick} disabled={isEdge} className="btn">
        {pointer}
      </button>
    );
  };

  const [items, setItems] = useState([
    {
      nickname: "elma9700 님",
      title: "전시명: 인간의 불완전함",
      review:
        "형태를 알아보기 어려운 추상화 위주라서 오히려 집중하면서 전시를 감상했습니다. 작가님이 의도하시는게 무엇인지 파악해보려고 생각하는 시간이 즐거웠어요~!",
      img: "https://images.velog.io/images/beablessing/post/6d329d22-be8b-40a6-8e26-1b81f0171a1e/%EC%88%9C%EB%A0%A4%EB%8B%98.jpg",
    },
    {
      nickname: "먼지 님",
      title: "전시명: 자아 게임",
      review:
        "저는 작가님이 뭘 말하고자 하는 지 정확히 느끼지는 못했지만.. 색감이 특이해서 오래도록 관람했던 전시회였어요. 개인적으로 이런 추상화에 관심이 많은데 특이한 주제에 잘 맞는 표현법이었던 것 같아요!",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "m_ssy_ 님",
      title: "전시명: 도시 남녀",
      review:
        "과감한 색 대비와 명확하지 않은 경계선이 극도로 디지털화된 현대인의 혼란스러운 자아를 더욱 잘 드러내는 것 같습니다. 추상화의 특징을 잘 살려낸 전시였습니다. 전시 잘 봤습니다!",
      img: "https://images.velog.io/images/beablessing/post/096edf93-4304-4884-b06f-0be71957b71f/image0.jpg",
    },
    {
      nickname: "oreo 님",
      title: "전시명: Tropical mood",
      review:
        "차가운 색감이 많이 들어가서 인지, 왠지 모르게 시원한 느낌이 드는 그림들입니다~ 잘봤습니다",
      img: "https://images.velog.io/images/beablessing/post/fda8834e-b1aa-497d-a36b-3aa24090d9a9/%EB%82%98.png",
    },
    {
      nickname: "조지브르주아팬 님",
      title: "전시명: 자아 게임",
      review:
        "과감한 색 대비와 명확하지 않은 경계선이 극도로 디지털화된 현대인의 혼란스러운 자아를 더욱 잘 드러내는 것 같습니다. 추상화의 특징을 잘 살려낸 전시였습니다. 전시 잘 봤습니다!",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: Tropical mood",
      review:
        "형태를 알아보기 어려운 추상화 위주라서 오히려 집중하면서 전시를 감상했습니다. 작가님이 의도하시는게 무엇인지 파악해보려고 생각하는 시간이 즐거웠어요~!",
      img: "https://images.velog.io/images/beablessing/post/096edf93-4304-4884-b06f-0be71957b71f/image0.jpg",
    },
    {
      nickname: "춘식이 님",
      title: "전시명: 너머의 세계",
      review:
        "차가운 색감이 많이 들어가서 인지, 왠지 모르게 시원한 느낌이 드는 그림들입니다~ 잘봤습니다",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "claud 님",
      title: "전시명: 자아성찰",
      review:
        "일상적인 소재라 더 공감할 수 있었어요. 일상 속 풍경인 듯 하지만 어딘가 여행온 느낌도 들었구요 ㅎㅎ 좋은 전시 감사합니다~",
      img: "https://images.velog.io/images/beablessing/post/749ea467-8876-4ce5-ab73-6d867a8902d4/Screenshot%20from%202021-10-08%2000-07-58.png",
    },
    {
      nickname: "udada 님",
      title: "전시명: 자아성찰",
      review:
        "마음에 쏙 드는 일러스트네요 ! 요 일러스트로 스마트톡 하고 다니고 싶을 정도입니다아 !",
      img: "https://images.velog.io/images/beablessing/post/fda8834e-b1aa-497d-a36b-3aa24090d9a9/%EB%82%98.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "클로에모네의 작품을 이렇게 온라인으로 감상 할 수 있다는 점에 폴짝 놀라고 갑니다~~",
      img: "https://images.velog.io/images/beablessing/post/6d329d22-be8b-40a6-8e26-1b81f0171a1e/%EC%88%9C%EB%A0%A4%EB%8B%98.jpg",
    },
  ]);

  return (
    <>
      <h1 className="seperator">
        아트그라운드에서 수백개의 관람 후기를 만나보세요.
      </h1>
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints} renderArrow={myArrow}>
          {items.map((item) => (
            <div className="revContent">
              <div className="revImgtBox">
                <img src={item.img} alt={item.img} className="revimg"></img>
              </div>
              <div className="revTxtBox">
                <span className="revTxt">{item.nickname}</span>
                <span className="revTxt">{item.title}</span>
                <span className="revTxt">{item.review}</span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default AboutRevSlider;
