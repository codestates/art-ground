require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ART_GROUND_ACCESS_SECRET, {
      expiresIn: "1d",
    });
  },
  isAuthorized: (req) => {
    const authorization = req.headers.cookie;
    if (!authorization) {
      return null;
    }
    const token = authorization.split("accessToken=")[1]; //.split(";")[0].split("=")[1];
    try {
      return verify(token, process.env.ART_GROUND_ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  sendAccessToken: (res, accessToken) => {
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
      .send("AccessToken ready");
  },
  sendRefreshToken: (res, refreshToken) => {
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send("RefreshToken ready");
  },
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.ART_GROUND_REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
