import React from 'react';
import TopmenuMypage from '../components/TopMenuMypage';
import SideMenu from '../components/SideMenu';
import MyBucketSection from '../components/MyBucketSection';
import MyProfileSection from '../components/MyProfileSection';
import SideMenuMyPage from '../components/SideMenuMyPage'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";

const MyPageWrap = styled.div`
  #copyright {
    margin-left: 120px;
    margin-top: 100px;
    width: calc(100vw - 120px);
    display: flex;
    flex-direction: row;
    z-index: 20;
  }

  #copyright-mobile {
    margin-top: 100px;
    width: 100vw;
    display: flex;
    flex-direction: row;
    z-index: 20;
  }

  .projectInformation {
    margin: 30px;
    color: gray;
    font-size: 18px;
    z-index: 20;
    
  }
`

export default function MyPage() {
  const isDesktop = useMediaQuery({ minWidth: 921 })
  let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
  const history = useHistory()

  if(isSignIn){
    return (
      <MyPageWrap>
      <div className='mainpage'>
        <SideMenuMyPage />
        <div>
          <TopmenuMypage />
          <MyBucketSection />
          <MyProfileSection />
        </div>
      </div>
      <div id={isDesktop? 'copyright' : 'copyright-mobile'}>
        <div className='projectInformation'>
          프로젝트명: 버킷츠컴바인<br/>
          팀명: 다크서클즈 <br/>
          팀장: 윤태영 <br/>
          팀원: 김도훈 이태훈 이윤창 이현석<br/>
          ©2022 BucketsCombine. All Rights Reserved.
        </div>
      </div>
      </MyPageWrap>
    )
  } else {
    history.push('/signin')
    window.location.reload();
  }
  
}
