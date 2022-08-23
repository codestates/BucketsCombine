import React from 'react';
import styled from 'styled-components';
import StampedList from './StampedList'
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";

const CardsWrap = styled.div`
  #card-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: calc(100vw - 120px);
    height: 100vh;
    min-height: 700px;
    margin-left: 120px;
  }

  .cards-ment {
    margin-left: 60px;
    height: 150px;
    z-index: 3;
  }

  .ment-title {
    font-size: 42px;
    margin-bottom: 20px;
  }

  .ment-description {
    font-size: 16px;
    line-height: 32px;
  }

  #cards-list-row {
    display: flex;
    height: 40%;
    margin: 20px;
  }

  .fog-left {
    z-index: 1;
    position: absolute;
    left: 170px;
    width: 20px;
    height: 100%;
    background: -webkit-linear-gradient(left,white 0%,rgba(0,0,0,0) 100%);
  }

  .fog-right {
    z-index: 1;
    position: absolute;
    right: 70px;
    width: 40px;
    height: 100%;
    background: -webkit-linear-gradient(right,white 0%,rgba(0,0,0,0) 100%);
  }

  #card-section-mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100vw;
    height: calc(100vh - 120px);
    min-height: 700px;
    margin-top: 120px;
  }

  .cards-ment-mobile {
    height: 150px;
    width: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    bottom: 50px;
  }

  .ment-title-mobile {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
  }

  #cards-list-row-mobile {
    display: flex;
    height: 40%;
    margin: 20px;
  }

  .fog-left-mobile {
    z-index: 3;
    position: absolute;
    left: 50px;
    width: 20px;
    height: 350px;
    background: -webkit-linear-gradient(left, white 0%,rgba(0,0,0,0) 100%);
  }

  .fog-right-mobile {
    z-index: 3;
    position: absolute;
    right: 50px;
    width: 40px;
    height: 350px;
    background: -webkit-linear-gradient(right, white 0%,rgba(0,0,0,0) 100%);
  }

  .ment-description-mobile {
    font-size: 16px;
    line-height: 32px;
    text-align: center;
  }
`



const StampedModal = () => {
  const isDesktop = useMediaQuery({ minWidth: 921 })
  const  amount  = useSelector((state) => state.card);
  return(
    <CardsWrap>
      <div id={isDesktop?'card-section' : 'card-section-mobile'}>
        <div className={isDesktop? "cards-ment" : "cards-ment-mobile"}>
          <div className={isDesktop? 'ment-title' : 'ment-title-mobile'}>
          여러분의 성취담을{isDesktop? '': <br/> } 공유해보세요.
          </div>
          <div className={isDesktop? 'ment-description' : 'ment-description-mobile'}>
          달성하신 카드는 도장을 찍어드려요.{isDesktop? '': <br/> }여러분의 후기를 담아 공유할 수 있습니다.
          </div>
        </div>
        <div id={isDesktop? 'cards-list-row' : 'cards-list-row-mobile'}>
        <div className={isDesktop? 'fog-left' : 'fog-left-mobile'}/>
        <div className={isDesktop? 'fog-right' : 'fog-right-mobile'}/>
          <StampedList/>
        </div>
      </div>
    </CardsWrap>
  )
}
export default StampedModal;