import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";


const MainSectionWrap = styled.div`
  #main-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: calc(100vw - 120px);
    height: 100vh;
    min-height: 700px;
    margin-left: 120px;
  }

  .main-ment {
    z-index: 3;
    width: 500px;
    margin-left: 60px;
    position: absolute;
    top: 20%;
    left: 120px;
  }
  .ment-title {
    font-size: 42px;
    margin-bottom: 20px;
  }

  .ment-description {
    font-size: 16px;
    line-height: 32px;
  }
  .videos-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 50%;
    max-width: 1000px;
    height: 70%;
    max-height: 1400px;
    margin-right: 1%;
  }
  .video {
    width: 30%;
    height: 100%;
    margin: 10px;
    object-fit: cover;
    border-radius: 1.8vh;
  }

  .videos-blur-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 50%;
    max-width: 1000px;
    height: 70%;
    max-height: 1400px;
    margin-right: 1%;
    top: 88%;
  }

  .video-blur {
    width: 30%;
    height: 100%;
    margin: 10px;
    object-fit: cover;
    border-radius: 0 0 1.8vh 1.8vh;
    filter: blur(10px);
    transform: scaleY(-1);
  }

  .fog {
    z-index: 1;
    position: absolute;
    top:100%;
    width: 60%;
    height: 70%;
    max-height: 1400px;
    background: -webkit-linear-gradient(bottom,white 80%,rgba(0,0,0,0) 100%);
  }

  .whiteboard {
    width: 30%;
    height: 100%;
    margin: 10px;
    object-fit: cover;
    border-radius: 1.8vh;
    background-color: white;
  }

  #main-section-mobile {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 120px);
    min-height: 700px;
    margin-top: 120px;
  }

  .main-ment-mobile {
    z-index: 3;
    width: 100%;
    position: absolute;
    top: 20%;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ment-title-mobile {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
  }

  .ment-description-mobile {
    font-size: 16px;
    line-height: 32px;
    text-align: center;
  }
  .videos-container-mobile {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    height: 30%;
    margin-bottom: 50px;
  }
  .video-mobile {
    width: 30%;
    height: 100%;
    margin: 5px;
    object-fit: cover;
    border-radius: 1.8vh;
  }
`

export default function MainSection(){
  const isDesktop = useMediaQuery({ minWidth: 921 })
  const isExtend = useMediaQuery({ minWidth: 1301})

  return(
    <MainSectionWrap>
    <div id={isDesktop?'main-section' : 'main-section-mobile'}>
      <div className={isDesktop?"main-ment" : "main-ment-mobile" }>
        <div className={isDesktop? 'ment-title' : 'ment-title-mobile' }>
          사람들과 함께<br />버킷리스트를 이뤄보세요
        </div>
        <div className={isDesktop ? 'ment-description' : 'ment-description-mobile'}>
        누구나 오랫동안 이루고 싶은 일들이나<br />
        시간이 지나가기 전에 해보고 싶은 일들을<br />
        마음에 품고 있습니다.<br />
        혼자서도 해낼 수 있지만<br />
        여럿과 함께한다면 성취하기 더 쉬울 것입니다.<br />
        또한 다른 사람에게서 새로운 목표를 얻을 수도 있겠죠.<br />
        여러분의 성취 Buckets Combine이 도와드립니다.
        </div>
      </div>
      {isDesktop? <div className='fog'/> : <div/>}
      <div className={isDesktop?'videos-container' : 'videos-container-mobile'}>
        {isExtend? 
        <video className={isDesktop?"video" : "video-mobile"} autoPlay muted loop playsInline>
          <source src="/videos/A.mp4" type="video/mp4"></source>
        </video> : isDesktop? <div className='whiteboard'/> :  <video className={isDesktop?"video" : "video-mobile"} autoPlay muted loop playsInline>
          <source src="/videos/A.mp4" type="video/mp4"></source>
        </video>}
        <video className={isDesktop?"video" : "video-mobile"} autoPlay muted loop playsInline>
          <source src="/videos/B.mp4" type="video/mp4"></source>
        </video>
        <video className={isDesktop?"video" : "video-mobile"} autoPlay muted loop playsInline>
          <source src="/videos/C.mp4" type="video/mp4"></source>
        </video>
      </div>
      {isDesktop?
      <div className='videos-blur-container'>
      {isExtend? <video className="video-blur" autoPlay muted loop playsInline>
          <source src="/videos/A.mp4" type="video/mp4"></source>
        </video> : <div className='whiteboard'/>}
        <video className="video-blur" autoPlay muted loop playsInline>
          <source src="/videos/B.mp4" type="video/mp4"></source>
        </video>
        <video className="video-blur" autoPlay muted loop playsInline>
          <source src="/videos/C.mp4" type="video/mp4"></source>
        </video>
      </div>
      : <div />
      }
    </div>
    </MainSectionWrap>
  )
}