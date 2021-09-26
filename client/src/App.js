import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Join from "./pages/join/Join";
import { useEffect, useState } from "react";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import SignInDetail from "./pages/signindetail/SignInDetail";
import MyPage from "./pages/mypage/MyPage";

import Modify from "./pages/modify/Modify";
import Google from "./pages/google/Google";
import Kakao from "./pages/kakao/Kakao";
import Gallery from "./pages/gallery/Gallery";
import GalleryDetail from "./pages/galleryDetail/GalleryDetail";
import axios from "axios";
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
import Loading from "./components/loading/Loading";
import { getSignOutRes } from "./api/signApi";
import { getMyinfo } from "./api/mypageApi";

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
  const [isAdmin, setisAdmin] = useState(false);

  const [modifyRender, setModifyRender] = useState(false);
  useEffect(() => {
    //로딩창 띄워야함
    setTimeout(() => {
      setModifyRender(true);
    }, 1000);
  }, []);

  const isAuthenticated = () => {
    getMyinfo(setIsLogin, setUserinfo, setisAdmin);
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
    history.push("/about");
  };

  const handleLogout = () => {
    getSignOutRes(setUserinfo, setIsLogin, setisAdmin);
    history.push("/about");
  };

  useEffect(() => {
    getMyinfo(setIsLogin, setUserinfo, setisAdmin);
    return () => {};
  }, []);

  // window.localStorage.setItem("userinfo", JSON.stringify(userinfo));

  // 개별작품상세
  const [gallerySelected, setGallerySelected] = useState(null);
  const [reviewSelected, setReviewSelected] = useState(null);

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
            isAdmin={isAdmin}
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
            isAdmin={isAdmin}
          />
          <SignInDetail
            isAuthorLogin={isAuthorLogin}
            isAudienceLogin={isAudienceLogin}
            handleResponseSuccess={handleResponseSuccess}
            setisAdmin={setisAdmin}
          />
        </Route>

        <Route path="/signin/google">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <Google />
        </Route>
        <Route path="/signin/kakao">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <Kakao />
        </Route>
        <Route exact path="/join">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
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
            isAdmin={isAdmin}
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
            isAdmin={isAdmin}
          />
          <MyPage userinfo={userinfo} setUserinfo={setUserinfo} />
          {/* {isLogin ? <MyPage userinfo={userinfo} /> : <SideBar />} */}
        </Route>
        <Route path="/about">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <About />
          <ScrollTab />
        </Route>
        <Route path="/gallery">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <Gallery
            isLogin={isLogin}
            userinfo={userinfo}
            selectGallery={(el) => setGallerySelected(el)}
          />
          <ScrollButton />
        </Route>
        <Route path="/gallerydetail">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <GalleryDetail gallerySelected={gallerySelected} />
          <ScrollButton />
        </Route>
        <Route path="/reviewlist">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <ReviewList
            isLogin={isLogin}
            selectReview={(el) => setReviewSelected(el)}
          />
          <ScrollButton />
        </Route>
        <Route path="/reviewdetail">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <ReviewDetail
            userinfo={userinfo}
            isLogin={isLogin}
            reviewSelected={reviewSelected}
          />
          <ScrollButton />
        </Route>
        <Route path="/register">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
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
            isAdmin={isAdmin}
          />
          {modifyRender ? <Modify userinfo={userinfo} /> : <Loading />}
        </Route>
        <Route exact path="/contact">
          <Navbar
            isLogin={isLogin}
            userinfo={userinfo}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <Contact />
        </Route>
        <Route exact path="/admin">
          <Admin isAdmin={isAdmin} setisAdmin={setisAdmin} />
        </Route>
      </Switch>
    </ScrollTop>
  );
}

export default App;
