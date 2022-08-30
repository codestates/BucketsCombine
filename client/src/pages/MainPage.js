import React from 'react';
import  { useSelector } from 'react-redux'
import Topmenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import MainSection from '../components/MainSection';
import CardsSection from '../components/CardsSection';
import StampedSection from '../components/StampedSection';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";


const MainPageWrap = styled.div`
  .mainpage {
    display: flex;
    flex-direction: row;
    background-color: rgb(145, 58, 116);
  }
  .mainpage-section {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100vw;
  }

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

export default function MainPage() {
  const isDesktop = useMediaQuery({ minWidth: 921 })
  return (
    <MainPageWrap>
      <div className='mainpage'>
        <SideMenu />
        <div className='mainpage-section'>
          <Topmenu />
          <MainSection />
          <CardsSection> 
          </CardsSection>
          <StampedSection>
          </StampedSection>
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
    </MainPageWrap>
  )
}