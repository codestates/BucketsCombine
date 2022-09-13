import React, { useState, useEffect, useRef } from 'react';
import useOutSideClick from './hook/UseOutSideClick';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const TopMenuWrap = styled.div`
  .topmenu {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    width: 100vw;
    height: 80px;
    align-items: center;
    position: fixed;
    z-index: 5;
  }

  .topmenu-title {
    font-size: 28px;
    margin-left: 140px;
  }

  .topmenu-button {
    align-self: center;
    margin-right: 30px;
    border: none;
    box-shadow: none;
    width: 120px;
    height: 36px;
    border-radius: 12px;
    font-size: 15px;
    background-color: #FFC700;
    :hover{
          box-shadow:  3px 3px 6px rgba(0,0,0,0.2);
          transition: box-shadow 0.2s;
        }
  }

  .username-board {
    top: 70px;
    right: 30px;
    position: fixed;
    width: 120px;
    height: 160px;
    border-radius: 12px;
    z-index: 16;
    background-color: #ededed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow:  3px 3px 6px rgba(0,0,0,0.3);
  }

  .board-button {
    border: none;
    box-shadow: none;
    width: 100px;
    height: 34px;
    border-radius: 8px;
    font-size: 15px;
    color: black;
    background-color: transparent;
    margin: 10px;
    :hover{
      color: white;
          background-color: #323232;
          box-shadow:  3px 3px 6px rgba(0,0,0,0.3);
        }
  }

  

  .topmenu-mobile {
    display: flex;
    flex-direction: row;
    justify-content:flex-end;
    right: 0px;
    width: 10vw;
    height: 80px;
    align-items: center;
    position: fixed;
    z-index: 10;
    top:0px
  }

  .topmenu-button-mobile {
    position: absolute;
    top: 38px;
    right: 12px;
    align-self: center;
    border: none;
    width: 22px;
  }

  .username-board-mobile {
    top: 100px;
    right: 0px;
    position: fixed;
    width: 46px;
    height: 180px;
    border-radius: 12px;
    z-index: 16;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  
  .board-button-mobile-c {
    border: none;
    box-shadow: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    color: black;
    background-image: url('/images/cards-icon.png');
    background-size: cover;
    margin: 10px;

    :hover {
      background-image: url('/images/cards-icon-hover.png');
    }
  }

  .board-button-mobile-s {
    border: none;
    box-shadow: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    color: black;
    background-image: url('/images/stamped-icon.png');
    background-size: cover;
    margin: 10px;

    :hover {
      background-image: url('/images/stamped-icon-hover.png');
    }
  }

  .board-button-mobile-so {
    border: none;
    box-shadow: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    font-size: 15px;
    background-image: url('/images/sign-out-icon.png');
    background-size: cover;
    margin: 10px;

    :hover {
      background-image: url('/images/sign-out-icon-hover.png');
    }
  }
`

export default function Topmenu({location}){
  // console.log(location)
  const isDesktop = useMediaQuery({ minWidth: 921 })
  const [isBoardOpen, setIsBoardOpen] = useState(false)
  const [isUsernameclick, setIsUsernameclick] = useState(false)


  const usernameclick = () => {
    setIsUsernameclick(true)
    setIsBoardOpen(!isBoardOpen)
    setTimeout(()=> {setIsUsernameclick(false)}, 50)
  }

  const modalRef = useRef(null);
  const handleClose = () => {
    if(isUsernameclick === true){
      setIsUsernameclick(false)
    } else {
      setTimeout(()=>{setIsBoardOpen(!isBoardOpen)}, 50)
    }
  };
  useOutSideClick(modalRef, ()=> setTimeout(handleClose, 100));

  const history = useHistory()
  
 

  const goToCards = async () => {
    const vh = window.innerHeight
    await history.push('/')
    await window.scrollTo({ left: 0, top: vh });
  }

  const goToMyStamped = async () => {
    const vh = window.innerHeight
    await history.push('/')
    await window.scrollTo({ left: 0, top: 2 * vh });
  }

  const dispatch = useDispatch();
  // const handleLogout = () => {
  //   axios.post(`${process.env.REACT_APP_API_URL}/users/logout`).then((res) => {
  //     dispatch(setSignInUserId(0))
  //     dispatch(setIsSignIn(false))
  //     history.push('/');
  //   });
  // };
  const handleSignout = () => {
    localStorage.setItem('signInUserInfo', JSON.stringify(null));
    localStorage.setItem('isSignIn', JSON.stringify(false));
    window.location.replace("/");
  };

  let signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
  let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))

  return(
    <TopMenuWrap>
      <div className={isDesktop ? 'topmenu' : 'topmenu-mobile'}>
        {isDesktop ?
          <div className='topmenu-title'>Buckets Combine</div>
          : <div />}
          {isDesktop? <button className='topmenu-button' onClick={usernameclick}>{signInUserInfo.username}</button>
          : <img className='topmenu-button-mobile' src='/images/menu-icon.png' onClick={usernameclick}/>}
      </div>
      {isBoardOpen ? isDesktop? <div className='username-board' ref={modalRef}>
        <button className='board-button' onClick={goToCards}>Cards</button>
        <button className='board-button' onClick={goToMyStamped}>Stamped</button>
        <button className='board-button' onClick={handleSignout}>로그아웃</button>
      </div>
      : <div className='username-board-mobile' ref={modalRef}>
      <div className='board-button-mobile-c'onClick={goToCards}/>
      <div className='board-button-mobile-s' onClick={goToMyStamped}/>
      <div className='board-button-mobile-so'onClick={handleSignout}/>
    </div> 
      :  <div />}
    </TopMenuWrap>
  )
}