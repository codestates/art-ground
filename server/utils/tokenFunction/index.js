require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET);
  },
  isAuthorized: (req) => {
    const authorization = req.headers.cookie;
    if (!authorization) {
      return null;
    }
    const token = authorization.split(";")[0].split("=")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  sendAccessToken: (res, accessToken) => {
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
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
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};