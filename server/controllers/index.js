const { Router } = require("express");
const { sign } = require("./sign");
const router = Router();
const { getToken, getUserInfo } = require("./sign/google");
const { generalSignUp, authorSignUp } = require("./sign/signUp");

router.post("/receive/token", getToken);
router.get("/receive/userinfo?", getUserInfo);
router.post("/sign-up/user", generalSignUp);
router.post("/sign-up/author", authorSignUp);

module.exports = router;
