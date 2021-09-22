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
    console.log(authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    return () => {};
  }, []);

  useEffect(() => {
    getUserInfo(accessToken);
    return () => {};
  }, [accessToken]);
  
  const getAccessToken = (authorizationCode) => {
    axios
      .post(`${process.env.LOCAL_SERVER_URI}/kakao-login/token`, { authorizationCode })
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
    axios
      .get(`${process.env.LOCAL_SERVER_URI}/kakao-login/userinfo?accessToken=${accessToken}`)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={styles.container}>
      <div>카카오</div>
    </section>
  )
}

export default Kakao
