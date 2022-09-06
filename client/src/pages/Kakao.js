import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";

const Kakao = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  //const REDIRECT_URI = "https://www.bucketscombine.com/users/kakaologin";
  //const CLIENT_SECRET = ''

  const code = new URL(window.location.href).searchParams.get("code");

  const handleSignout = () => {
    localStorage.setItem('signInUserInfo', JSON.stringify(null));
    localStorage.setItem('isSignIn', JSON.stringify(false));
  };

  const history = useHistory();
  const getToken = async () => {
    const config = {
      headers: {
        code: code,
      },
      withCredential: true,
    };
    await axios.post(`${process.env.REACT_APP_API_URL}/users/kakaologin`,
      { "data": "data" },
      config)
      .then((res) => {
        const { jwtAccessToken } = res.data
        window.Kakao.init(REST_API_KEY); // Kakao Javascript SDK 초기화
        window.Kakao.Auth.setAccessToken(jwtAccessToken); // access token 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtAccessToken}`;
        const signInUserInfo = res.data.userInfo;
        localStorage.setItem('signInUserInfo', JSON.stringify(signInUserInfo));
        localStorage.setItem('isSignIn', JSON.stringify(true));
        setTimeout(() => {handleSignout()}, 5 * 3600 * 1000)
        history.replace("/");
      })
      .catch((err) => {
        console.log(err)
      })
  };

  useEffect(() => {
    getToken();
  }, []);
  return null;
};

export default Kakao;