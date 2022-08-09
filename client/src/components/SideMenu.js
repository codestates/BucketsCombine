import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";



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

  .sidemenu-button-main {
    position: absolute;
    top:30vh;
    border: none;
    box-shadow: none;
    font-size: 18px;
    color: white;
    background-color: transparent;
    font-size: 20px;
    font-weight: 100;
  }

  .sidemenu-button-cards {
    position: absolute;
    top:50vh;
    border: none;
    box-shadow: none;
    font-size: 18px;
    color: white;
    background-color: transparent;
    font-size: 20px;
    font-weight: 100;
  }

  .sidemenu-button-stamped {
    position: absolute;
    top:70vh;
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
  }

  .logo-part {
    display: flex;
    left: 42px;
    position: absolute;
    width: 35px;
    height: 35px;
    top: 70px;
    transition: all 300ms;
  }

  .sidemenu-mobile {
    position: fixed;
    height: 120px;
    width: 100%;
    background-color: rgb(41, 41, 41);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    z-index: 10;
  }

  .sidemenu-button-main-mobile {
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

  .sidemenu-button-cards-mobile {
    position: absolute;
    left:45vw;
    border: none;
    box-shadow: none;
    font-size: 18px;
    color: white;
    background-color: transparent;
    font-size: 20px;
    font-weight: 100;
  }

  .sidemenu-button-stamped-mobile {
    position: absolute;
    left:65vw;
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
    height: 60px;
    align-self: start;
    margin-top: 10px;
    margin-left: 30px;
  }

  .logo-part-mobile {
    display: flex;
    left: 42px;
    position: absolute;
    width: 35px;
    height: 35px;
    top: 70px;
    transition: all 300ms;
  }
`

export default function SideMenu(){
  const isDesktop = useMediaQuery({ minWidth: 921 })

  function changeLogoPosition (logo, scrollPosition, vh) {
    
    if(isDesktop) {
      logo.style.left = '43px'
      logo.style.transition = 'all 300ms'

      if(scrollPosition === 0){
        logo.style.top = '70px'
      } else if(scrollPosition <= 0.75 * vh ){
        logo.style.top = 'calc(30vh - 35px)'
      } else if(scrollPosition <= 1.75 * vh){
        logo.style.top = 'calc(50vh - 35px)'
      } else {
        logo.style.top = 'calc(70vh - 35px)'
      }
    } else {
      logo.style.top = '70px'
      logo.style.transition = 'all 150ms'

      if(scrollPosition === 0){
        logo.style.left = '43px'
      } else if(scrollPosition <= 0.75 * vh ){
        logo.style.left = 'calc(25vw + 10px)'
      } else if(scrollPosition <= 1.75 * vh){
        logo.style.left = 'calc(45vw + 15px)'
      } else {
        logo.style.left = 'calc(65vw + 27px)'
      }
    } 
  }
  
  window.addEventListener("scroll", (event) => {
    let logo = document.querySelector('.logo-part') || document.querySelector('.logo-part-mobile')
    if(logo){
      let scrollPosition = window.scrollY
      let vh = window.innerHeight
      changeLogoPosition(logo, scrollPosition, vh)
    }
  });

  window.addEventListener("resize", (event) => {
    let logo = document.querySelector('.logo-part') || document.querySelector('.logo-part-mobile')
    if(logo){
      if(isDesktop){
        logo.style.left = '43px'
        logo.style.top = '70px'
      } else {
        logo.style.top = '70px'
        logo.style.left = '43px'
      }
    }
  });

  const moveToMain = () => {
    let vh = window.innerHeight
    //window.scrollTo(0, 2 * vh);
    window.scrollTo({ left: 0, top: 1, behavior: "smooth" });
  }
  const moveToCards = () => {
    let vh = window.innerHeight
    //window.scrollTo(0, 2 * vh);
    window.scrollTo({ left: 0, top: vh, behavior: "smooth" });
  }

  const moveToStmaped = () => {
    let vh = window.innerHeight
    //window.scrollTo(0, 2 * vh);
    window.scrollTo({ left: 0, top: 2 * vh, behavior: "smooth" });
  }

  return(
    <SideMenuWrap>
      <div className={isDesktop? 'sidemenu' : 'sidemenu-mobile'}>
      <img className={isDesktop? 'logo-part' : 'logo-part-mobile'} src='images/logo-part.png' />
          <img className={isDesktop?'logo' : 'logo-mobile'} src='images/logo-small.png' onClick={() => {console.log('qwe')}}/>
          <button className={isDesktop?'sidemenu-button-main' : 'sidemenu-button-main-mobile'} onClick={moveToMain}>Main</button>
          <button className={isDesktop? 'sidemenu-button-cards' : 'sidemenu-button-cards-mobile'} onClick={moveToCards}>Cards</button>
          <button className={isDesktop? 'sidemenu-button-stamped' : 'sidemenu-button-stamped-mobile' }onClick={moveToStmaped}>Stamped</button>
      </div>
    </SideMenuWrap>
  )
}