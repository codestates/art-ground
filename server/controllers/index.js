// router.use(endpoint, directory)
const { Router } = require("express");
const router = Router();
const { sign } = require("./sign");

const { getMyInfo } = require("./mypage");
const { register } = require("./exhibition/register");
const { getExhibition } = require("./exhibition");
const { exhibitionLike } = require("./exhibition/likes");
const { withdrawalLike } = require("./exhibition/withdrawalLike");

// sign
router.use("/sign-up", sign);
router.use("/sign-in", sign);
router.use("/sign-out", sign);
router.use("/receive", sign);
router.use("/kakao", sign);

// mypage
router.get("/mypage", getMyInfo);

// exhibition
router.post("/exhibition/register", register);
router.get("/exhibition", getExhibition);
router.post("/exhibition/like", exhibitionLike);
router.delete("/exhibition/like", withdrawalLike);
module.exports = router;
