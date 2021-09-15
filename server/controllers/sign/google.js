"use strict";
const { Router } = require("express");
const router = Router();

const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

/**
 *
 * router.post("/receive/token", getToken);
 * router.get("/receive/userinfo?", getUserInfo);
 */
module.exports = {
  getToken: async (req, res) => {
    const URL = process.env.OAUTH_URL;

    const code = req.body.authorizationCode;
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const grant_type = process.env.GRANT_TYPE;

    let data = {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
    };
    let headers = {
      "content-type": "application/x-www-form-urlencoded",
    };

    await axios
      .post(URL, data, headers)
      .then((el) => {
        res.send(el.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getUserInfo: async (req, res) => {
    const googleInfoURL = process.env.GOOGLEINFO_URL;

    const accessToken = req.query.accessToken;
    await axios
      .get(googleInfoURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        res.json(result.data);
      });
  },
};
