import React from 'react';
import styled from 'styled-components'

const SignUpPageWrap = styled.div`
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
    background: #FFC700;
    border-radius: 15px;
    border: 0;
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
  #login_email {
    flex: flex;
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
  }
  #login_password {
    flex: flex;
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
  }
  #login_button {
    padding: 5px 40px;
    margin: 10px
  }
  .signup_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }
  #signup_repassword {
    flex: flex;
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
  }
  #login_nickname {
    flex: flex;
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
  }
  .btn_gender {
    display: flex;
    padding: 5px 40px;
    margin: 10px;
    width: 15.5%;
    border-radius: 5px;
  }
  .btn_old {
    display: flex;
    padding: 5px 40px;
    margin: 10px;
    width: 15.5%;
    border-radius: 5px;
  }
  .signup_signup {
    flex: flex;
    border: none;
    font-size: 16;
    height: 25px;
    justify-content: center;
    margin: 4px;
    width: 15.5%;
    background: #FFC700;
    border-radius: 5px;
  }
  #singup_email {
    flex: flex;
    padding: 5px 40px;
    margin: 10px;
    border-radius: 5px;
    background-color: gray;
  }
`
export default function SignUpPage() {
	
	return (
		<SignUpPageWrap>
		<div className="body">
<div className="signin_section">
<button id="login_cancle">취소</button>
	<div className="signin_container">
	<img src="bucketscombine_logo.png" alt="no" width="100px" height="100px"></img>
		<div className="login_title">BucketsCombine</div>
	   	<input id="login_email" type="text" placeholder="이메일" />
		  <input id="login_password" type="password" placeholder="비밀번호" />
		  <input id="signup_repassword" type="password" placeholder="비밀번호 재확인" />
		  <input id="login_nickname" type="text" placeholder="닉네임" />
		<select className="btn_old" required>
			<option value="" >연령대</option>
			<option value="teenages">10대</option>
			<option value="twenty">20대</option>
			<option value="thirty">30대</option>
			<option value="forty">40대</option>
			<option value="fifty">50대</option>
			<option value="sixty">60대</option>
			<option value="seventy">70대</option>
		</select>
		<select className="btn_gender" required>
			<option value="" >성별</option>
			<option value="teenages">남자</option>
			<option value="twenty">여자</option>
			<option value="thirty">선택안함</option>
		</select>
		<button className="signup_signup">가입하기</button>
	</div>
</div>
</div>
</SignUpPageWrap>
)
}