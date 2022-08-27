import React from 'react';
import ColumnList from './ColumnList';
import styled from 'styled-components';
import { useMediaQuery } from "react-responsive";

// 스타일 컴포넌트 작성 태그전달

const MyBucketWrap = styled.div `
  #mybucket-section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 120px);
    height: 100vh;
    margin-left: 120px;
  }

  .card-list-column {
  width: 70vw;
  max-width: 1000px;
  height: calc(100vh - 400px) ;
  flex-direction: column;
  align-items: center;
  }

  .search-bar {
    margin-top: 50px;
    align-self: center;
    position: relative;
    margin-left: 0px;
    height: 10px;
    width: calc(70vw - 100px);
    max-width: 700px;
  }

  .search-input {
    width: 100%;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
  }

  .search-icon {
    position : absolute;
    width: 17px;
    top: 10px;
    right: 0px;
    margin: 0px;
  }

  .fog-top {
    position: absolute;
    top: 170px;
    width: 70vw;
    max-width: 1000px;
    height: 30px;
    background: -webkit-linear-gradient(top,white 0%,rgba(0,0,0,0) 100%);
    z-index: 2;
  }

  .fog-bottom {
    position: absolute;
    bottom: 230px;
    width: 70vw;
    max-width: 1000px;
    height: 40px;
    background: -webkit-linear-gradient(bottom,white 0%,rgba(0,0,0,0) 100%);
    z-index: 2;
  }

  #mybucket-section-mobile {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 120px);
    margin-top: 120px;
  }

  .card-list-column-mobile {
  width: 100vw;
  max-width: 1000px;
  height: calc(100vh - 400px) ;
  flex-direction: column;
  align-items: center;
  }

  .search-bar-mobile {
    margin-top: 50px;
    align-self: center;
    position: relative;
    margin-left: 0px;
    height: 10px;
    width: calc(100vw - 100px);
    max-width: 700px;
  }

  .fog-top-mobile {
    position: absolute;
    top: 230px;
    width: 100vw;
    height: 30px;
    background: -webkit-linear-gradient(top,white 0%,rgba(0,0,0,0) 100%);
    z-index: 2;
  }

  .fog-bottom-mobile {
    position: absolute;
    bottom: 150px;
    width: 100vw;
    height: 40px;
    background: -webkit-linear-gradient(bottom,blue 0%,rgba(0,0,0,0) 100%);
    z-index: 2;
  }
`

export default function MyBucketSection(){
  const isDesktop = useMediaQuery({ minWidth: 921 })

  return(
    <MyBucketWrap>
      <div id={isDesktop ? 'mybucket-section' : 'mybucket-section-mobile'}>
        <div className={isDesktop ? 'fog-top' : 'fog-top-mobile'} />
        <div className={isDesktop ? 'card-list-column' : 'card-list-column-mobile'}>
          <ColumnList />
        </div>
      </div>
    </MyBucketWrap>
  )
}