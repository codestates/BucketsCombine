import React from 'react';
import TopmenuMypage from '../components/TopMenuMypage';
import SideMenu from '../components/SideMenu';
import MyBucketSection from '../components/MyBucketSection';
import MyProfileSection from '../components/MyProfileSection';
import SideMenuMyPage from '../components/SideMenuMyPage'
import { useHistory } from 'react-router-dom';

export default function MyPage() {
  let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
  const history = useHistory()

  if(isSignIn){
    return (
      <div className='mainpage'>
        <SideMenuMyPage />
        <div>
          <TopmenuMypage />
          <MyBucketSection />
          <MyProfileSection />
        </div>
      </div>
    )
  } else {
    history.push('/signin')
    window.location.reload();
  }
  
}
