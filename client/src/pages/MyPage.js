import React from 'react';
import TopmenuMypage from '../components/TopMenuMypage';
import SideMenu from '../components/SideMenu';
import MyBucketSection from '../components/MyBucketSection';
import MyProfileSection from '../components/MyProfileSection';
import SideMenuMyPage from '../components/SideMenuMyPage'

export default function MyPage() {
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
}
