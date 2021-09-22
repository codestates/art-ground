import styles from './Kakao.module.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
require("dotenv").config();

const Kakao = (props) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    console.log("useEffect...");
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    console.log("code:", authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    return () => {};
  }, []);

  console.log("accesstoken:", accessToken)
  
  useEffect(() => {
    console.log("useEffect2...")
    setTimeout(()=> {
      getUserInfo(accessToken);
    }, 2000)
    return () => {};
  }, [accessToken]);
  
  const getAccessToken = (authorizationCode) => {
    axios({
      method: "post",
      url: `https://localhost:5000/kakao-login/token`,
      data: {
        authorizationCode
      }
    })
      .then((res) => {
        console.log(res.data);
        if (!refreshToken) {
          setRefreshToken(res.data.refresh_token);
        }
        setAccessToken(res.data.access_token)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserInfo = (accessToken) => {
    axios({
      method: "get",
      url: `https://localhost:5000/kakao-login/userinfo?accessToken=${accessToken}`
    })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("userinfo:", userInfo)
  return (
    <section className={styles.container}>
      <div>카카오</div>
    </section>
  )
}

export default Kakao
