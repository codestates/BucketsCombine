import React, { useState, useEffect, useRef } from 'react';
import useOutSideClick from './hook/UseOutSideClick';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
  }

  .topmenu-button:hover {
    align-self: center;
    margin-right: 30px;
    border: none;
    box-shadow: none;
    width: 120px;
    height: 36px;
    border-radius: 12px;
    font-size: 15px;
    background-color: #FFC700;
    box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.3) ;
    transition: all 300ms;
  }

  .username-board {
    top: 70px;
    right: 30px;
    position: fixed;
    width: 120px;
    height: 160px;
    border-radius: 12px;
    z-index: 16;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .board-button {
    border: none;
    box-shadow: none;
    width: 100px;
    height: 34px;
    border-radius: 8px;
    font-size: 15px;
    color: black;
    background-color: #D9D9D9;
    margin: 10px;
  }

  .board-button:hover {
    border: none;
    box-shadow: none;
    width: 100px;
    height: 34px;
    border-radius: 8px;
    font-size: 15px;
    color: white;
    background-color: #323232;
    margin: 10px;
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

  .board-button-mobile-mb {
    border: none;
    box-shadow: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    color: black;
    background-image: url('/images/bucket-icon.png');
    background-size: cover;
    margin: 10px;

    :hover {
      background-image: url('/images/bucket-icon-hover.png');
    }
  }
  .board-button-mobile-mp {
    border: none;
    box-shadow: none;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    font-size: 15px;
    color: black;
    background-image: url('/images/profile-icon.png');
    background-size: cover;
    margin: 10px;

    :hover {
      background-image: url('/images/profile-icon-hover.png');
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
  const isDesktop = useMediaQuery({ minWidth: 921 })

  const [isBoardOpen, setIsBoardOpen] = useState(false)
  const [isUsernameclick, setIsUsernameclick] = useState(false)

  const usernameclick = () => {
    setIsUsernameclick(true)
    setIsBoardOpen(!isBoardOpen)
    setTimeout(()=> {setIsUsernameclick(false)}, 25)
  }

  const modalRef = useRef(null);
  const handleClose = () => {
    if(isUsernameclick === true){
      setIsUsernameclick(false)
    } else {
      setTimeout(()=>{setIsBoardOpen(!isBoardOpen)}, 25)
    }
  };
  useOutSideClick(modalRef, ()=> setTimeout(handleClose, 50));

  const history = useHistory()
  
  const goToMyProfile = async () => {
    let vh = window.innerHeight
    await history.push('/mypage')
    await  window.scrollTo({ left: 0, top: vh });
  }

  const goToMyBucket = async () => {
    let vh = window.innerHeight
    await history.push('/mypage')
    await window.scrollTo({ left: 0, top: 1 });
  }

  const goToSignIn = async () => {
    await history.push('/signin')
  }


  const handleSignout = () => {
    localStorage.setItem('signInUserInfo', JSON.stringify(null));
    localStorage.setItem('isSignIn', JSON.stringify(false));
    window.location.replace("/");
  };


  let signInUserInfo = JSON.parse(localStorage.getItem('signInUserInfo'))
  let isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
  return(
    <TopMenuWrap >
      <div className={isDesktop ? 'topmenu' : 'topmenu-mobile'}>
        {isDesktop ?
          <div className='topmenu-title'>Buckets Combine</div>
          : <div />}
        {isSignIn ? 
          isDesktop? <button className='topmenu-button' onClick={usernameclick}>{signInUserInfo.username}</button>
          : <img className='topmenu-button-mobile' src='/images/menu-icon.png' onClick={usernameclick} />
          : isDesktop? <button className='topmenu-button' onClick={goToSignIn}>Sign In</button>
            : <img className='topmenu-button-mobile' src='/images/sign-in-icon.png' onClick={goToSignIn}/>
          }
      </div>
      {isBoardOpen ? isDesktop? <div className='username-board' ref={modalRef}>
        <button className='board-button' onClick={goToMyBucket}>My Bucket</button>
        <button className='board-button' onClick={goToMyProfile}>My Profile</button>
        <button className='board-button' onClick={handleSignout}>Sign Out</button>
      </div> 
      : <div className='username-board-mobile' ref={modalRef}>
      <div className='board-button-mobile-mb'onClick={goToMyBucket}/>
      <div className='board-button-mobile-mp' onClick={goToMyProfile}/>
      <div className='board-button-mobile-so' onClick={handleSignout}/>
    </div> 
      :  <div />}
    </TopMenuWrap>
  )
}