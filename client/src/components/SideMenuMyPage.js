import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";
import { useHistory } from 'react-router-dom';

const SideMenuWrap = styled.div`
  
  .sidemenu {
    position: fixed;
    height: 100%;
    width: 120px;
    background-color: rgb(41, 41, 41);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
  }

  .sidemenu-button-mybucket {
    position: absolute;
    top:35vh;
    border: none;
    box-shadow: none;
    font-size: 18px;
    color: white;
    background-color: transparent;
    font-size: 20px;
    font-weight: 100;
  }

  .sidemenu-button-myprofile {
    position: absolute;
    top:66vh;
    border: none;
    box-shadow: none;
    font-size: 18px;
    color: white;
    background-color: transparent;
    font-size: 20px;
    font-weight: 100;
  }

  .sidemenu-button:active, .sidemenu-button:focus {
    border: none;
    box-shadow: none;
  }

  .logo {
    display: flex;
    height: 60px;
    margin-top: 10px;
    z-index: 11;
  }

  .logo-part2 {
    display: flex;
    left: 42px;
    position: absolute;
    width: 35px;
    height: 35px;
    top: 70px;
    transition: all 500ms;
    z-index: 11;
  }

  .sidemenu-mobile {
    position: fixed;
    height: 100px;
    width: 100%;
    background-color: rgb(41, 41, 41);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    top: 0px;
    z-index: 10;
  }

  .sidemenu-button-mybucket-mobile {
    position: absolute;
    left:25vw;
    border: none;
    box-shadow: none;
    font-size: 18px;
    color: white;
    background-color: transparent;
    font-size: 20px;
    font-weight: 100;
  }

  .sidemenu-button-myprofile-mobile {
    position: absolute;
    left:60vw;
    border: none;
    box-shadow: none;
    font-size: 18px;
    color: white;
    background-color: transparent;
    font-size: 20px;
    font-weight: 100;
  }

  .logo-mobile {
    display: flex;
    height: 50px;
    align-self: start;
    margin-top: 20px;
    margin-left: 20px;
  }

  .logo-part2-mobile {
    display: flex;
    left: 33px;
    position: absolute;
    width: 25px;
    top: 70px;
    transition: all 300ms;
  }
`

export default function SideMenu(){
  const isDesktop = useMediaQuery({ minWidth: 921 })

  function changeLogoPosition (logo, scrollPosition, vh) {
    
    if(isDesktop) {
      logo.style.left = '33px'
      logo.style.transition = 'all 300ms'

      if(scrollPosition === 0){
        logo.style.top = '70px'
      } else if(scrollPosition <= 0.75 * vh ){
        logo.style.top = 'calc(35vh - 35px)'
      } else {
        logo.style.top = 'calc(66vh - 35px)'
      }
    } else {
      logo.style.top = '70px'
      logo.style.transition = 'all 150ms'

      if(scrollPosition === 0){
        logo.style.left = '33px'
      } else if(scrollPosition <= 0.75 * vh ){
        logo.style.left = 'calc(25vw + 35px)'
      } else {
        logo.style.left = 'calc(60vw + 35px)'
      }
    } 
  }
  
  window.addEventListener("scroll", (event) => {
    let logo = document.querySelector('.logo-part2') || document.querySelector('.logo-part2-mobile')
    if(logo){
      let scrollPosition = window.scrollY
      let vh = window.innerHeight
      changeLogoPosition(logo, scrollPosition, vh)
    }
  });

  window.addEventListener("resize", (event) => {
    let logo = document.querySelector('.logo-part2') || document.querySelector('.logo-part2-mobile')
    if(logo){
      if(isDesktop){
        logo.style.left = '33px'
        logo.style.top = '70px'
      } else {
        logo.style.top = '70px'
        logo.style.left = '33px'
      }
    }
  });

  const moveToBucket = () => {
    let vh = window.innerHeight
    //window.scrollTo(0, 2 * vh);
    window.scrollTo({ left: 0, top: 1, behavior: "smooth" });
  }
  const moveToProfile = () => {
    let vh = window.innerHeight
    //window.scrollTo(0, 2 * vh);
    window.scrollTo({ left: 0, top: vh, behavior: "smooth" });
  }

  const history = useHistory()

  const goToMain = () => {
    history.push('/')
    window.scrollTo({ left: 0, top: 0 });
  }

  return(
    <SideMenuWrap>
      <div className={isDesktop? 'sidemenu' : 'sidemenu-mobile'}>
      <img className={isDesktop? 'logo-part2' : 'logo-part2-mobile'} src='images/logo-part.png' />
          <img className={isDesktop?'logo' : 'logo-mobile'}  src='images/logo-small.png' onClick={goToMain} />
          <button className={isDesktop? 'sidemenu-button-mybucket' : 'sidemenu-button-mybucket-mobile'} onClick={moveToBucket}>My Bucket</button>
          <button className={isDesktop? 'sidemenu-button-myprofile' : 'sidemenu-button-myprofile-mobile'} onClick={moveToProfile}>My Profile</button>
      </div>
    </SideMenuWrap>
  )
}