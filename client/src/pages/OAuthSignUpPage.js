import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

axios.defaults.withCredentials = true;

const OAuthSignUpPageWrap = styled.div`
  .signin_section {
      background-color: rgb(41, 41, 41);
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      overflow: hidden;
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
  
  .login_title {
    font-weight: bold;
    color: white;
    font-size: 30px;
    margin: 20px;
    border-radius: 5px;
  }
  .login_signupbox {
    display: flex;
    flex-direction: column;
    padding: 5px 40px;
    margin: 2px 100px;
    width: 250px;
    border-radius: 5px;
  }
  .login_box {
    background-color: orange;
    border: none;
    font-size: 16;
    margin: 7px;
    height: 30px;
    border-radius: 5px;
  }
  .login_google {
    flex: flex;
    border: none;
    font-size: 16;
    justify-content: center;
    margin: 7px;
    height: 30px;
    border-radius: 5px;
  }
  .login_signup {
    flex: flex;
    background-color: yellow;
    border: none;
    font-size: 16;
    height: 30px;
    justify-content: center;
    margin: 4px;
    border-radius: 5px;
  }
  .BC_logo {
    width: 120px;
    height: 120px;
    background-image: url("images/bucketscombine_logo.png");
    background-size: cover;
    margin-top: 50px;
  }
  .signup_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }
  .input-area {
    width: 246px;
    height: 45px;
    padding: 2px 40px;
    margin: 10px;
    border-radius: 5px;
    border: none;
  }
  .btn_old {
    padding: 2px 40px;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
    border: none;

  }
  .btn_gender {
    padding: 2px 40px;
    margin: 10px;
    width: 330px;
    height: 50px;
    border-radius: 5px;
    border: none;
  }
  .signup-button {
    border: none;
    background: #ffc700;
    border-radius: 5px;
    width: 330px;
    height: 50px;
    padding: 2px;
    margin: 30px 10px 100px 10px;
    border-radius: 5px;
  }

  #cancle {
    position: fixed;
    top: 20px;
    right: 0;
    margin-right: 30px;
    border: none;
    box-shadow: none;
    width: 120px;
    height: 36px;
    border-radius: 12px;
    font-size: 15px;
    background-color: #FFC700;
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .find {
    color: white;
    margin: 10px;
  }
  .warning-message {
    color: #FF5C00;
    font-size: 15px;
  }

  .cancle-button {
    position: absolute;
    top: 20px;
    right: 0;
    margin-right: 30px;
    border: none;
    box-shadow: none;
    width: 120px;
    height: 36px;
    border-radius: 12px;
    font-size: 15px;
    background-color: #FFC700;
  }

  .cancle-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    background-image: url('/images/cancel-yellow-icon.png');
    background-size: cover;
  }
`
export default function OAuthSignUpPage() {
  const history = useHistory();

  const cancle = () => {
    history.goBack()
  }

  const [emailWarning, setEmailWarning] = useState(false)
  const [usernameWarning, setUsernameWarning] = useState(false)
  const [ageWaring, setAgeWarning] = useState(false)
  const [genderWarning, setGenderWarning] = useState(false)

  const [emptyEmailWarning, setEmptyEmailWarning] = useState(false)
  const [emptyUsernameWarning, setEmptyUsernameWarning] = useState(false)

  const [aleadyEmailWarning, setAleadyEmailWarning] = useState(false)
  const [aleadyUsernameWarning, setAleadyUsernameWarning] = useState(false)

  const [inputEmail, setInputEmail] = useState('');
  const [inputUsername, setInputUsername ] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputGender, setInputGender] = useState('');

  const emailFilter = (value) => {
    setEmptyEmailWarning(false)
    const regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(value === ''){
      setInputEmail(value)
      setEmailWarning(false)
    } else {
      if(regExp.test(value)){
        setInputEmail(value)
        setEmailWarning(false)
      } else {
        setInputEmail(value)
        setEmailWarning(true)
      }
    }
  }

  const usernameFilter = (value) => {
    setEmptyUsernameWarning(false)
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

    if(regExp.test(value)){
      const inputValue = value.slice(0, value.length - 1)
      setInputUsername(inputValue)
      return
    } 

    if(value.length > 12){
      const inputValue = value.slice(0, 12)
      setInputUsername(inputValue)
      return
    }

    setInputUsername(value)
  }

  const signUp = async () => {
    setAgeWarning(false)
    setGenderWarning(false)
    setEmptyEmailWarning(false)
    setEmptyUsernameWarning(false)
    if(emailWarning === true || inputEmail === "" ||
      usernameWarning === true || inputUsername === "" ||
      inputAge === "" ||
      inputGender === ""
    ){
      if(inputEmail === ""){
        setEmptyEmailWarning(true)
      }
      if(inputUsername === ""){
        setEmptyUsernameWarning(true)
      }
      if (inputAge === "") {
        setAgeWarning(true)
      }
      if (inputGender === "") {
        setGenderWarning(true)
      }
    } else {
      setAleadyEmailWarning(false)
      setAleadyUsernameWarning(false)
      await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
        email: inputEmail,
        username: inputUsername,
        age: inputAge,
        gender: inputGender,
      })
      .then((res) => {
        if(res.data.message === '회원가입 성공'){
          alert('가입되었습니다.')
          history.push("/signin")
        }
        if(res.data.message === '이미 사용중인 이메일입니다'){
          setAleadyEmailWarning(true)
        }
        if(res.data.message === '이미 사용중인 별명입니다'){
          setAleadyUsernameWarning(true)
        }
        if(res.data.message1 && res.data.message2){
          setAleadyEmailWarning(true)
          setAleadyUsernameWarning(true)
        }
      })
    }
  }

  const isDesktop = useMediaQuery({ minWidth: 921 })

  return (
    <OAuthSignUpPageWrap>
        <div className="signin_section">
        {isDesktop? 
            <button className="cancle-button" onClick={cancle}>취소</button>
            : <div className='cancle-icon' onClick={cancle}/>}
          <div className="signin_container">
            <img
              className="BC_logo"
              src="images/bucketscombine_logo.png"
              alt="no"
              width="120px"
              height="120px"
            ></img>
            <div className="login_title">BucketsCombine</div>
            <div className='list' onSubmit={(e) => e.preventDefault()}>
            <input
              className="input-area"
              type="email"
              placeholder="이메일"
              onChange={(e) => {emailFilter(e.target.value)}}
              value={inputEmail}
              maxLength='40'
            />
            <div className="warning-message">
              {emailWarning? "이메일 형식이 올바르지 않습니다." : "" }
            </div>
            <div className="warning-message">
              {emptyEmailWarning? "이메일을 입력해주세요." : "" }
            </div>
            <div className="warning-message">
              {aleadyEmailWarning? "이미 사용중인 이메일입니다." : "" }
            </div>
            <input
              className="input-area"
              type="username"
              placeholder="별명"
              onChange={(e) => {usernameFilter(e.target.value)}}
              value={inputUsername}
            />
            <div className="warning-message">
              {aleadyUsernameWarning? "이미 사용중인 별명입니다." : "" }
            </div>
            <div className="warning-message">
              {emptyUsernameWarning? "별명을 입력해주세요." : "" }
            </div>
            <select className="btn_old" onChange={(e) => {
              setAgeWarning(false)
              setInputAge(e.target.value)
              }} method="get" required>
              <option value="DEFAULT" >연령대</option>
              <option value="10대">10대</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대">50대</option>
              <option value="60대">60대</option>
              <option value="70대">70대</option>
              <option value="80대">80대</option>
              <option value="90대">90대</option>
              <option value="100대">100세 이상</option>
            </select>
            <div className="warning-message">
              {ageWaring? "연령대를 선택해주세요." : "" }
            </div>
            <select className="btn_gender" onChange={(e) => {
              setGenderWarning(false)
              setInputGender(e.target.value)
              }} method="get" required>
              <option value="DEFAULT" >성별</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
              <option value="선택안함">선택안함</option>
		        </select>
            <div className="warning-message">
              {genderWarning? "성별을 선택해주세요." : "" }
            </div>
            <button
              className="signup-button"
              onClick={signUp}
            >
              가입하기
            </button>
            </div>
          </div>
        </div>
    </OAuthSignUpPageWrap>
  );
}
