import React, { useEffect } from 'react';
import './KakaoShare.css';


function KakaoShare({ image, url, title}) {
  
  function createShareButton() {
    if (window.Kakao) {
      window.Kakao.Link.createDefaultButton({
        container: '.kakaoBtn',
        objectType: 'feed',
        content: {
          title: '누구나 예술가가 될 수 있는 공간, 아트그라운드',
          description: `전시명: ${title}`,
          imageUrl: image,
          link: {
            mobileWebUrl: `https://art-ground.io${url}`,
            webUrl: `https://art-ground.io${url}`
          }
        },
        buttons: [
          {
            title: '관람하러 가기',
            link: {
              mobileWebUrl: `https://art-ground.io${url}`,
              webUrl: `https://art-ground.io${url}`
            }
          }
        ]
      })
    } else {
      console.log('KaKao CDN fetch error')
    }
  }

  useEffect(() => {
    createShareButton()
  }, [])

  return (
    <>
      <span className="kakaoBtn">
        <img src="../../../images/kakaoLogo.png" alt="kakaoLogo"/>
      </span>
    </>
  )
}

export default KakaoShare