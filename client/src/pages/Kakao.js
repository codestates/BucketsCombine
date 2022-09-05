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
  
  const history = useHistory();
  console.log('인가코드',code)
  const getToken = async () => {
    console.log('getToken 동작')
    const config = {
      headers: {
        code: code,
      },
      withCredential: true,
    };
    console.log('config', config)
    await axios.post(`${process.env.REACT_APP_API_URL}/users/kakaologin`,
      { data: 'data' },
      config)
      .then((res) => {
        console.log('post요청 동작')
        console.log('res데이터', res.data)
        const { jwtAccessToken } = res.data
        window.Kakao.init(REST_API_KEY); // Kakao Javascript SDK 초기화
        window.Kakao.Auth.setAccessToken(jwtAccessToken); // access token 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtAccessToken}`;
        const signInUserInfo = res.data.userInfo;
        localStorage.setItem('signInUserInfo', JSON.stringify(signInUserInfo));
        localStorage.setItem('isSignIn', JSON.stringify(true));
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