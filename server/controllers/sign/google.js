"use strict";
require("dotenv").config();
const axios = require("axios");
const { users } = require("../../models");
const { generateAccessToken } = require("../../utils/tokenFunction");
const bcrypt = require("bcrypt");

const { signUpCaching } = require("../../utils/customFunction");
const saltRounds = 10;

module.exports = {
  getToken: async (req, res) => {
    const URL = process.env.ART_GROUND_OAUTH_URL;
    const code = req.body.authorizationCode;
    const client_id = process.env.ART_GROUND_CLIENT_ID;
    const client_secret = process.env.ART_GROUND_CLIENT_SECRET;
    const redirect_uri = process.env.ART_GROUND_REDIRECT_URI;
    const grant_type = process.env.ART_GROUND_GRANT_TYPE;

    const token = await axios.post(
      URL,
      {
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
      },
      {
        "content-type": "application/x-www-form-urlencoded",
      }
    );
    res.send(token.data);
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

      const data = await users.findOne({
        raw: true,
        where: {
          user_email: userEmail,
        },
      });

      if (data) {
        delete data.password;
        const accessToken = generateAccessToken(data);
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
          .json({ data, message: "AccessToken ready" });
      } else {
        const data = (
          await users.create({
            user_email: userEmail,
            password,
            nickname,
            user_type: 1,
            login_type: "google",
          })
        ).dataValues;
        await signUpCaching(data);
        res
          .cookie("accessToken", generateAccessToken(data), {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 24 * 1000,
            domain: "art-ground.link",
            path: "/",
            ovewrite: true,
          })
          .status(200)
          .json({
            data,
            message: "AccessToken ready",
          });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
