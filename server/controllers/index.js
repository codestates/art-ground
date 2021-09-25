// router.use(endpoint, directory)
const { Router } = require("express");
const router = Router();
const signCtrl = require("./sign/sign.ctrl");
const kakaoCtrl = require("./sign/kakao");
const googleCtrl = require("./sign/google");
const adminCtrl = require("./admin/admin.ctrl");
const { getMyInfo } = require("./mypage");
const { register } = require("./exhibition/register");
const { getExhibition } = require("./exhibition");
const { exhibitionLike } = require("./exhibition/likes");
const { withdrawalLike } = require("./exhibition/withdrawalLike");
const { deleteReview } = require("./review/deleteReview");
const { postReview } = require("./review/register");
const { getExhibitionReview } = require("./review");
// sign

// router.use("/sign-up", sign);
// router.use("/sign-in", sign);
// router.use("/sign-out", sign);
// router.use("/receive", sign);

// 일반 회원가입
router.post("/sign-up/user", signCtrl.generalSignUp);

// 작가 회원가입
router.post("/sign-up/author", signCtrl.authorSignUp);

// 로그인
router.post("/sign-in", signCtrl.signIn);

// 로그아웃
router.post("/sign-out", signCtrl.signOut);

// Goole
router.get("/receive/userinfo?", googleCtrl.getUserInfo);
router.post("/receive/token", googleCtrl.getToken);

// Kakao
router.post("/kakao-login/token", kakaoCtrl.getToken);
router.get("/kakao-login/userinfo?", kakaoCtrl.getUserInfo);

// mypage
router.get("/mypage", getMyInfo);

// exhibition
router.post("/exhibition/register", register);
router.get("/exhibition/:type", getExhibition);
router.get("/exhibition", getExhibition);
router.post("/exhibition/like", exhibitionLike);
router.delete("/exhibition/like", withdrawalLike);

//review

router.post("/review", postReview);
router.delete("/review", deleteReview);
router.get("/review", getExhibitionReview);
// admin
// 전시 승인
router.post("/admin/exhibition", adminCtrl.approveExhibition);

module.exports = router;
