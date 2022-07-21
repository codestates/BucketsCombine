import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SignInPageWrap = styled.div`
  .body {
    height: 100%;
    overflow: hidden;
  }
  #login_cancle {
    position: fixed;
    top: 15px;
    right: 15px;
    width: 100px;
    height: 30px;
    background-color: #ffc700;
    border: 0;
    border-radius: 5px;
  }
  .signin_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    background-color: rgb(41, 41, 41);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    overflow: hidden;
  }
  .signin_section {
    background-color: rgb(41, 41, 41);
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: hidden;
  }
  .login_title {
    font-weight: bold;
    color: white;
    font-size: 30px;
    margin: 20px;
    border-radius: 5px;
  }
  .login_signupbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 40px;
    margin: 2px 100px;
    width: 400px;
    border-radius: 5px;
    height: 200px; 
  }
  a{
    text-decoration-line : none;
  }
  #email {
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
    width: 246px;
    height: 40px;
    border: none;
  }
  #password {
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
    width: 246px;
    height: 40px;
    border: none;
  }
  #login_button {
    align-items: center;
    padding: 2px 30px;
    margin: 10px;
    width: 100px;
    height: 40px;
  }
  .login_box {
    background-color: #ff5c00;
    border: none;
    font-size: 16;
    margin: 5px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
  }
  .login_google {
    flex: flex;
    border: none;
    font-size: 16;
    justify-content: center;
    margin: 7px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
  }
  .login_signup {
    flex: flex;
    background-color: #ffc700;
    border: none;
    font-size: 16;
    width: 330px;
    height: 40px;
    justify-content: center;
    margin: 4px;
    border-radius: 5px;
  }
`

export default function SignInPage({ handleResponseSuccess, setIsLogin }) {
  const [logininfo, setLogininfo] = useState({
    email: "",
    password: ""
  });
  const [errormessage, setErrormessage] = useState('');
  const [errormessage2, setErrormessage2] = useState('');
  const history = useHistory();
  const handleInputValue = (key) => (e) => {
    setLogininfo({ ...logininfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
    // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
    if (!logininfo.email || !logininfo.email) {
      setErrormessage('이메일과 비밀번호를 입력해야 합니다')
    } else {
      setErrormessage('')
    }
    if (!errormessage) {
      axios.post(`${process.env.REACT_APP_API_URL}/users/signin`, {
        email: logininfo.email,
        password: logininfo.password
      })
      // .then((res) => {
      //   handleResponseSuccess()
      //   history.push("/");
      //  });



      .catch(error => setErrormessage2('비밀번호가 일치하지 않습니다'))
      .then(res => {
        sessionStorage.setItem('id', res.data.id);
        sessionStorage.setItem('email', res.data.email);
        sessionStorage.setItem('name', res.data.name);
        sessionStorage.setItem('nickname', res.data.nickname)
        setIsLogin(true)
        handleResponseSuccess()
      })
      .then(res => history.push("/"))
      .catch(error => setErrormessage2('비밀번호가 일치하지 않습니다'))
    }
  }



	return (
    <SignInPageWrap>
      <div className="body">
      <div>
      <div className="signin_section">
      <button id="login_cancle">취소</button>
      <div className="signin_container">
        <img 
src="images/bucketscombine_logo.png" alt="no" width="120px" height="120px"></img>
        <p />
          <div className="login_title">BucketsCombine</div>
          <form onSubmit={(e) => e.preventDefault()}>
          <input id="email" 
          type="email" 
          placeholder="이메일" 
          onChange={handleInputValue("email")} />
          <input id="password" 
          type="password" 
          placeholder="비밀번호" 
          onChange={handleInputValue("password")}/>
          <div className='alert-box'>{errormessage}</div>
          <li><Link to="/signup">아이디 / 비밀번호찾기</Link></li>
          <div className="login_signupbox">
            <button className="login_box" 
            type="submit" 
            value="로그인"
            onClick={handleLogin}>로그인</button>
            <div className='alert-box'>{errormessage}</div>
            <div className='alert-box'>{errormessage2}</div>
            <button className="login_google">
              <img src="images/unnamed.webp"
              alt="사진이 없습니다." width="20px" height="20px"></img>
              구글 로그인 / 회원가입
              </button>
            <button className="login_signup">회원가입</button>
          </div>
          </form>
        </div>
        
      </div>
      </div>
      </div>
		</SignInPageWrap>
	)
}