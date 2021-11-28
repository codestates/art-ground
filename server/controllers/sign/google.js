"use strict";
require("dotenv").config();
const axios = require("axios");
const { users } = require("../../models");
const {
  generateAccessToken,
  sendAccessToken,
} = require("../../utils/tokenFunction");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  getToken: async (req, res) => {
    const URL = process.env.ART_GROUND_OAUTH_URL;

    const code = req.body.authorizationCode;
    const client_id = process.env.ART_GROUND_CLIENT_ID;
    const client_secret = process.env.ART_GROUND_CLIENT_SECRET;
    const redirect_uri = process.env.ART_GROUND_REDIRECT_URI;
    const grant_type = process.env.ART_GROUND_GRANT_TYPE;

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
    try {
      const googleInfoURL = process.env.ART_GROUND_GOOGLEINFO_URL;

      const accessToken = req.query.accessToken;
      const userInfo = await axios.get(googleInfoURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const { name: nickname, email: userEmail } = userInfo.data;
      let password = userEmail + process.env.CRYPTOJS_SECRETKEY;

      const salt = await bcrypt.genSalt(saltRounds);
      password = await bcrypt.hash(password, salt);

      const result = await users.findOne({
        where: {
          user_email: userEmail,
        },
      });

      if (result) {
        delete result.dataValues.password;
        const accessToken = generateAccessToken(result.dataValues);
        res
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 24 * 1000,
            domain: "art-ground.link",
            path: "/",
            ovewrite: true,
          })
          .status(200)
          .json({ data: result.dataValues, message: "AccessToken ready" });
      } else {
        const generatedInfo = await users.create({
          user_email: userEmail,
          password,
          nickname,
          user_type: 1,
          login_type: "google",
        });

        delete result.dataValues.password;
        const accessToken = generateAccessToken(result.dataValues);
        res
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 24 * 1000,
            domain: "art-ground.link",
            path: "/",
            ovewrite: true,
          })
          .status(200)
          .json({ data: result.dataValues, message: "AccessToken ready" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
