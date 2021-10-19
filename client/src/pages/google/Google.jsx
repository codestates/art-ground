import styles from "./Google.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Google = ({ handleResponseSuccess }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [refreshToken, setRefreshToken] = useState();
  useEffect(() => {
    //console.log("useEffect...");
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    //console.log(authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    return () => {};
  }, []);

  useEffect(() => {
    getUserInfo(accessToken);
    return () => {};
  }, [accessToken]);

  const getUserInfo = async (accessToken) => {
    axios
      .get(
        `https://art-ground.link/receive/userinfo?accessToken=${accessToken}`
      )
      .then((res) => {
        // console.log(res.data);
        // setUserInfo(res.data);
        handleResponseSuccess();
      });
  };

  const getAccessToken = async (authorizationCode) => {
    //console.log(authorizationCode);
    axios
      .post(`https://art-ground.link/receive/token`, { authorizationCode })
      .then((res) => {
        //console.log(res.data);
        if (!refreshToken) {
          setRefreshToken(res.data.refreshToken);
        }
        setAccessToken(res.data.access_token);
      });
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={styles.container}>
      <div></div>
    </section>
  );
};

export default Google;
