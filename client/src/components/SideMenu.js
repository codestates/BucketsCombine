import React from 'react';
import styled from 'styled-components';


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
  }
`

function changeLogoPosition (scrollPosition, vh) {
  const logo = document.querySelector('.logo-part')

  if(scrollPosition === 0){
    logo.style.top = '70px'
  } else if(scrollPosition <= 2 * vh / 3 ){
    logo.style.top = 'calc(30vh - 35px)'
  } else if(scrollPosition <= 5 * vh / 3){
    logo.style.top = 'calc(50vh - 35px)'
  } else {
    logo.style.top = 'calc(70vh - 35px)'
  }
}

window.addEventListener("scroll" || "resize", (event) => {
  let scrollPosition = window.scrollY
  let vh = window.innerHeight
  changeLogoPosition(scrollPosition, vh)
});


export default function SideMenu(){
  return(
    <SideMenuWrap>
      <div className='sidemenu'>
      <img className='logo-part' src='images/logo-part.png' />
          <img className='logo' src='images/logo-small.png' />
          <button className='sidemenu-button-main'>Main</button>
          <button className='sidemenu-button-cards'>Cards</button>
          <button className='sidemenu-button-stamped'>Stamped</button>
      </div>
    </SideMenuWrap>
  )
}