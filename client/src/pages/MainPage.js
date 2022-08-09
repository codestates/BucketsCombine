import React from 'react';
import  { useSelector } from 'react-redux'
import Topmenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import MainSection from '../components/MainSection';
import CardsSection from '../components/CardsSection';
import StampedSection from '../components/StampedSection';
import styled from 'styled-components';
import MainPageCardModal from '../components/modals/MainPageCardModal'
import MainPageStampedCardModal from '../components/modals/MainPageStampedModal';


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
`

export default function MainPage() {
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
    </MainPageWrap>
  )
}