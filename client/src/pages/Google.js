import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";

const Google = () => {
  const history = useHistory();

  const code = new URL(window.location.href).searchParams.get("code");

  const handleSignout = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/logout`)
    .then(() => {
      localStorage.setItem('signInUserInfo', JSON.stringify(null));
      localStorage.setItem('isSignIn', JSON.stringify(false));
    })
  };

  const getToken = async () => {
    const config = {
      headers: {
        code: code,
      },
      withCredential: true,
    };
    await axios.post(`${process.env.REACT_APP_API_URL}/users/googlelogin`,
      { "data": "data" },
      config)
      .then((res) => {
        const { jwtAccessToken } = res.data;
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
}

export default Google;