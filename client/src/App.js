import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Join from "./pages/join/Join";
import { useState } from "react";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import SignInDetail from "./pages/signindetail/SignInDetail";
import MyPage from "./pages/mypage/MyPage";
import SideBar from "./components/sidebar/SideBar";
import MyInfo from "./components/myinfo/MyInfo";
import Modify from "./pages/modify/Modify";
import Google from "./pages/google/Google";
import Kakao from "./pages/kakao/Kakao";
import Gallery from './pages/gallery/Gallery';
import GalleryDetail from './pages/galleryDetail/GalleryDetail';
import Main from "./pages/main/Main";
import ArtDetail from "./components/artDetail/ArtDetail";
import ReviewList from "./pages/reviewList/ReviewList";
import ReviewDetail from "./pages/reviewDetail/ReviewDetail";

function App() {
  //가입
  const [isAuthorJoined, setIsAuthorJoined] = useState(false);
  const [isAudienceJoined, setIsAudienceJoined] = useState(false);
  // 로그인
  const [isAuthorLogin, setIsAuthorLogin] = useState(false);
  const [isAudienceLogin, setIsAudienceLogin] = useState(false);
  // 개별작품상세
  const [artDetail, setArtDetail] = useState('');

  const viewArtDetail = (el) => {
    setArtDetail(el);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/signin'>
          <Navbar /> 
          <SignIn
            setIsAuthorLogin={setIsAuthorLogin}
            setIsAudienceLogin={setIsAudienceLogin}
          />
        </Route>
        <Route path='/signin/detail'>
          <Navbar /> 
          <SignInDetail
            isAuthorLogin={isAuthorLogin}
            isAudienceLogin={isAudienceLogin}
          />
        </Route>
        <Route path="/signin/google">
          <Navbar /> 
          <Google />
        </Route>
        <Route path="/signin/kakao">
          <Navbar /> 
          <Kakao />
        </Route>
        <Route exact path="/join">
          <Navbar /> 
          <Join
            setIsAuthorJoined={setIsAuthorJoined}
            setIsAudienceJoined={setIsAudienceJoined}
          />
        </Route>
        <Route path='/join/signup'>
          <Navbar /> 
          <SignUp
            isAuthorJoined={isAuthorJoined}
            isAudienceJoined={isAudienceJoined}
          />
        </Route>
        <Route exact path='/mypage'>
          <Navbar /> 
          <MyPage />
        </Route>
        <Route path='/gallery'>
          <Navbar />  
          <Gallery />
        </Route>
        <Route path='/gallerydetail'>
          <Navbar />  
          <GalleryDetail viewArtDetail={viewArtDetail}/>
        </Route>
        {artDetail ? 
        <Route path='/artdetail'>
          <ArtDetail art={artDetail}/>
        </Route> : null}
        <Route path='/reviewlist'>
          <Navbar />  
          <ReviewList />
        </Route>
        <Route path='/reviewdetail'>
          <Navbar />  
          <ReviewDetail />
        </Route>
        <Route exact path="/modify">
        <Navbar /> 
          <Modify />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
