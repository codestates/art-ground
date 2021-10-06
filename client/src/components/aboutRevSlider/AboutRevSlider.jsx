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
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/6d329d22-be8b-40a6-8e26-1b81f0171a1e/%EC%88%9C%EB%A0%A4%EB%8B%98.jpg",
    },
    {
      nickname: "박지영 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/25809c97-d973-4a68-b8ca-0f834128d3ed/Screenshot%20from%202021-09-30%2005-11-38.png",
    },
    {
      nickname: "이동욱 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/cbb9a9be-2030-4a9f-ade0-74cf3677b9ca/Screenshot%20from%202021-09-30%2005-11-48.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/fda8834e-b1aa-497d-a36b-3aa24090d9a9/%EB%82%98.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
    },
    {
      nickname: "smw1234 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/ed6eed82-4668-4e3f-b2c4-a104789e0a39/%EC%82%AC%EB%9E%8C1.png",
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
