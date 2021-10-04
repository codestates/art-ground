import "./AboutRevSlider.css";
import React, { useState } from "react";
import Carousel, { consts } from "react-elastic-carousel";

const AboutRevSlider = (props) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    // { width: 768, itemsToShow: 3 },
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
      nickname: "문순려 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/6cee083a-f884-4a87-9217-02005bec687e/Screenshot%20from%202021-09-30%2005-11-44.png",
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
      nickname: "유다희 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/530852f3-428f-4a28-8ac0-45781782f8a5/Screenshot%20from%202021-09-30%2005-12-04.png",
    },
    {
      nickname: "문순려 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/6cee083a-f884-4a87-9217-02005bec687e/Screenshot%20from%202021-09-30%2005-11-44.png",
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
      nickname: "유다희 님",
      title: "전시명: 자아성찰",
      review:
        "작가의 자아성찰이 잘 그려졌던 작품이었다.이런점은 이러했고,어떤점은 조금 어려운 난해하게 느껴졌던 부분도 있었다. 하지만 전반적으로 어쩌구저쩌구 그래서 매우 만족스러운 전시회였다.",
      img: "https://images.velog.io/images/beablessing/post/530852f3-428f-4a28-8ac0-45781782f8a5/Screenshot%20from%202021-09-30%2005-12-04.png",
    },
  ]);

  return (
    <section>
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
    </section>
  );
};

export default AboutRevSlider;
