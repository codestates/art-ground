import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Join from './pages/join/Join';
import { useEffect, useState } from 'react';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import SignInDetail from './pages/signindetail/SignInDetail';
import MyPage from './pages/mypage/MyPage';
import SideBar from './components/sidebar/SideBar';
import MyInfo from './components/myinfo/MyInfo';
import Modify from './pages/modify/Modify';
import Google from './pages/google/Google';
import Kakao from './pages/kakao/Kakao';
import Gallery from './pages/gallery/Gallery';
import GalleryDetail from './pages/galleryDetail/GalleryDetail';

import axios from 'axios';

import Main from "./pages/main/Main";
import ArtDetail from "./components/artDetail/ArtDetail";


function App () {
  const history = useHistory();
  // 가입,로그인(page)
  const [isAuthorJoined, setIsAuthorJoined] = useState(false);
  const [isAudienceJoined, setIsAudienceJoined] = useState(false);
  const [isAuthorLogin, setIsAuthorLogin] = useState(false);
  const [isAudienceLogin, setIsAudienceLogin] = useState(false);

  // 로그인,유저인포(상태)
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);

  const isAuthenticated = () => {
    // 내정보 불러오기 axios요청
    // axios.get("/mypage").then((result) => {
    //   setIsLogin(true);
    //   setUserinfo(result.data.data.userInfo);
    // });
    setIsLogin(true);
    setUserinfo({
      userEmail: 'kim@gmail.com',
      nickname: 'photographer kim',
      profileImg: '../images/author.webp',
      authorDesc:
        '무용가들의 우아한 동작과 섬세한 표정을 고스란히 담아내는 무용 사진가입니다. 무용가를 전문적으로 촬영한다는 점도 무척 신기한데, 마치 무대 위에서 함께 연기를 하기라도 한 듯 실감나게 표현한다는 점은 더욱 놀랍습니다. 그리고, 김윤식 작가가 체코국립발레단 소속의 현역 발레리노라는 사실까지 알게 되면 그에 대한 호기심은 더욱 커집니다.'
    });
  };
  console.log(userinfo, 'appjs');
  const handleResponseSuccess = () => {
    isAuthenticated();
    // history.push("/");
  };

  const handleLogout = () => {
    // axios.post("sign-out").then((result) => {
    //   setUserinfo(null);
    //   setIsLogin(false);
    //   history.push("/");
    // });
    setUserinfo(null);
    setIsLogin(false);
  };

  useEffect(() => {}, []);

  return (
    <Router>
      <Navbar
        isLogin={isLogin}
        userinfo={userinfo}
        handleLogout={handleLogout}
      />

      <Switch>
        <Route exact path='/'>
          <Landing isLogin={isLogin} userinfo={userinfo} />

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
            handleResponseSuccess={handleResponseSuccess}
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
          {isLogin ? <MyPage userinfo={userinfo} /> : <SideBar />}

           
          

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
        <Route exact path="/modify">
        <Navbar /> 
          <Modify  userinfo={userinfo}/>

        </Route>
      </Switch>
    </Router>
  );
}

export default App;
