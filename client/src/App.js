import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  Router,
  BrowserRouter,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OAuthSignUpPage from "./pages/OAuthSignUpPage";
import RowList from "./components/RowList";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import MainPageCardModal from "./components/modals/MainPageCardModal";
import axios from "axios";
import "./App.css";

const App = () => {
  const { isOpen } = useSelector((store) => store.modal);
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useHistory();
  const isAuthenticated = async () => {
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
    await axios
      .get("https://localhost:4000/users/auth")
      .then((res) => {
        setIsLogin({ isLogin: true });
        setUserinfo({ userinfo: res.data });
        history.push("/mypage");
      })
      .catch((err) => err);
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {
    axios.get("https://localhost:4000/users/logout").then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      history.push("/");
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isOpen && <MainPageCardModal />}
            <MainPage />
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
          <Route exact path="/signupoauth">
            <OAuthSignUpPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/mypage">
            <MyPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
