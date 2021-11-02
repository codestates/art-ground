import styles from "./Kakao.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const Kakao = ({ handleResponseSuccess }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    //console.log("useEffect...");
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    //console.log("code:", authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    return () => {};
  }, []);

  useEffect(() => {
    //console.log("useEffect2...", accessToken);
    getUserInfo(accessToken);
    return () => {};
  }, [accessToken]);

  //console.log("accesstoken:", accessToken);

  const getAccessToken = (authorizationCode) => {
    axios({
      method: "post",
      url: `https://art-ground.link/kakao-login/token`,
      data: {
        authorizationCode,
      },
    })
      .then((res) => {
        //console.log(res.data);
        if (!refreshToken) {
          setRefreshToken(res.data.refresh_token);
        }
        setAccessToken(res.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserInfo = (accessToken) => {
    axios({
      method: "get",
      url: `https://art-ground.link/kakao-login/userinfo?accessToken=${accessToken}`,
    })
      .then((res) => {
        // console.log(res.data);
        // setUserInfo(res.data);
        handleResponseSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //console.log("userinfo:", userInfo);
  return (
    <section className={styles.container}>
      <div>카카오</div>
    </section>
  );
};

export default Kakao;
