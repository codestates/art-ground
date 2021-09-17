require("dotenv").config();
const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunction");
const cryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  signIn: (req, res) => {
    const { userEmail, password } = req.body;
    console.log(userEmail, password);
    try {
      users
        .findOne({
          where: {
            user_email: userEmail,
          },
        })
        .then(async (data) => {
          if (!data) {
            return res.status(401).json({ message: "invalid user" }); //404로 바꿔야 하나?
          }
        });
    } catch {}
  },
};
