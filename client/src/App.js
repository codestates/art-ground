import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Join from "./pages/join/Join";
import { useEffect, useState } from "react";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import SignInDetail from "./pages/signindetail/SignInDetail";
import MyPage from "./pages/mypage/MyPage";
import SideBar from "./components/sidebar/SideBar";
import MyInfo from "./components/myinfo/MyInfo";
import Modify from "./pages/modify/Modify";
import Google from "./pages/google/Google";
import Kakao from "./pages/kakao/Kakao";
import Gallery from "./pages/gallery/Gallery";
import GalleryDetail from "./pages/galleryDetail/GalleryDetail";
import axios from "axios";
import ArtDetail from "./components/artDetail/ArtDetail";
import ReviewList from "./pages/reviewList/ReviewList";
import ReviewDetail from "./pages/reviewDetail/ReviewDetail";
import Landing from "./pages/landing/Landing";
import Contact from "./pages/contact/Contact";
import Admin from "./pages/admin/Admin";
import Register from "./pages/register/Register";
import ScrollButton from "./components/scrollButton/ScrollButton";
import About from "./pages/about/About";
import ScrollTab from "./components/scrollTab/ScrollTab";
import ScrollTop from "./components/scrollTop/ScrollTop";
import ThreeDGallery from "./pages/3dGallery/ThreeDGallery";

function App() {
  const history = useHistory();
  // 가입,로그인(page)
  const [isAuthorJoined, setIsAuthorJoined] = useState(false);
  const [isAudienceJoined, setIsAudienceJoined] = useState(false);
  const [isAuthorLogin, setIsAuthorLogin] = useState(false);
  const [isAudienceLogin, setIsAudienceLogin] = useState(false);

  // 로그인,유저인포(상태)
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [modifyRender, setModifyRender] = useState(false);
  useEffect(() => {
    //로딩창 띄워야함
    setTimeout(() => {
      setModifyRender(true);
    }, 1000);
  });

  const isAuthenticated = () => {
    // 내정보 불러오기 axios요청
    // axios.get("https://localhost:5000/mypage").then((result) => {
    //   setIsLogin(true);
    //   setUserinfo(result.data.data.userInfo);
    // });
    setIsLogin(true);
    setUserinfo({
      userEmail: "kim@gmail.com",
      nickname: "photographer kim2",
      profileImg: "../images/author.webp",
      authorDesc:
        "무용가들의 우아한 동작과 섬세한 표정을 고스란히 담아내는 무용 사진가입니다. 무용가를 전문적으로 촬영한다는 점도 무척 신기한데, 마치 무대 위에서 함께 연기를 하기라도 한 듯 실감나게 표현한다는 점은 더욱 놀랍습니다. 그리고, 김윤식 작가가 체코국립발레단 소속의 현역 발레리노라는 사실까지 알게 되면 그에 대한 호기심은 더욱 커집니다.",
      userType: '2'
    });
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
    history.push("/about");
  };

  const handleLogout = () => {
    axios.post("https://localhost:5000/sign-out").then((result) => {
      console.log(result, "signout~~~~~~~~~~~~~~~~~~");
    });

    setUserinfo(null);
    setIsLogin(false);
  };

  //로그인될때까지 임시
  useEffect(() => {
    setIsLogin(true);
    setUserinfo({
      userEmail: "kim@gmail.com",
      nickname: "photographer kim2",
      profileImg: "https://t1.daumcdn.net/cfile/tistory/9995E34F5D5C9FB134",
      authorDesc:
        "무용가들의 우아한 동작과 섬세한 표정을 고스란히 담아내는 무용 사진가입니다. 무용가를 전문적으로 촬영한다는 점도 무척 신기한데, 마치 무대 위에서 함께 연기를 하기라도 한 듯 실감나게 표현한다는 점은 더욱 놀랍습니다. 그리고, 김윤식 작가가 체코국립발레단 소속의 현역 발레리노라는 사실까지 알게 되면 그에 대한 호기심은 더욱 커집니다.",
      userType: '2'
    });
    return () => {};
  }, []);

  // window.localStorage.setItem("userinfo", JSON.stringify(userinfo));

  // 개별작품상세
  const [artDetail, setArtDetail] = useState("");
  const [gallerySelected, setGallerySelected] = useState(null);
  const [reviewSelected, setReviewSelected] = useState(null);

  // const viewArtDetail = (el) => {
  //   setArtDetail(el);
  // };

  return (
    <ScrollTop>
      <Switch>
        <Route exact path="/">
          <Landing isLogin={isLogin} userinfo={userinfo} />
        </Route>
        <Route exact path="/signin">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <SignIn
            setIsAuthorLogin={setIsAuthorLogin}
            setIsAudienceLogin={setIsAudienceLogin}
          />
        </Route>
        <Route path="/signin/detail">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <SignInDetail
            isAuthorLogin={isAuthorLogin}
            isAudienceLogin={isAudienceLogin}
            handleResponseSuccess={handleResponseSuccess}
          />
        </Route>

        <Route path="/signin/google">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <Google />
        </Route>
        <Route path="/signin/kakao">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <Kakao />
        </Route>
        <Route exact path="/join">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <Join
            setIsAuthorJoined={setIsAuthorJoined}
            setIsAudienceJoined={setIsAudienceJoined}
          />
        </Route>
        <Route path="/join/signup">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <SignUp
            isAuthorJoined={isAuthorJoined}
            isAudienceJoined={isAudienceJoined}
          />
        </Route>
        <Route exact path="/mypage">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <MyPage userinfo={userinfo} setUserinfo={setUserinfo} />
          {/* {isLogin ? <MyPage userinfo={userinfo} /> : <SideBar />} */}
        </Route>
        <Route path="/about">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <About />
          <ScrollTab />
        </Route>
        <Route path="/gallery">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <Gallery
            isLogin={isLogin}
            gallerySelect={(el) => setGallerySelected(el)} 
          />
          <ScrollButton />
        </Route>
        <Route path="/gallerydetail">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <GalleryDetail 
            viewArtDetail={(el) => setArtDetail(el)} 
            gallerySelected={gallerySelected}
          />
          <ScrollButton />
        </Route>
        {artDetail ? (
          <Route path="/artdetail">
            <ArtDetail art={artDetail} />
          </Route>
        ) : null}
        <Route path="/reviewlist">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <ReviewList 
            isLogin={isLogin}
            reviewSelect={(el) => setReviewSelected(el)} 
            />
          <ScrollButton />
        </Route>
        <Route path="/reviewdetail">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <ReviewDetail 
            reviewSelected={reviewSelected}
          />
          <ScrollButton />
        </Route>
        <Route path="/register">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <Register
            userinfo={userinfo}
            isAuthorLogin={isAuthorLogin}
            isAudienceLogin={isAudienceLogin}
          />
          <ScrollButton />
        </Route>
        <Route path="/3dgallery">
          <ThreeDGallery />
        </Route>
        <Route exact path="/modify">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          {modifyRender ? <Modify userinfo={userinfo} /> : "로딩페이ㅣ지!!"}
        </Route>
        <Route exact path="/contact">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
          />
          <Contact />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
      </Switch>
    </ScrollTop>
  );
}

export default App;
