import React from "react";
import styled from "styled-components";

const ColumnCardWrap = styled.div`
  .ColumnCard {
    display: flex;
    flex-direction: row;
    color: white;
    max-width: 100%;
  }

  .ColumnCard-progress {
    background-color: red;
    height: 80px;
    width: 10px;
    border-radius: 10px;
    margin: 5px;
  }

  .ColumnCard-info {
    width: calc(70vw - 60px);
    max-width: 940px;
    height: 60px;
    border-radius: 15px;
    background-image: url("https://source.unsplash.com/random");
    background-size: cover;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .ColumnCard-info-text {
    margin-left: 10px;
    width: 40vw;
    text-align: start;
    flex-grow: 1;
  }

  .ColumnCard-title {
    font-size: 24px;
  }

  .ColumnCard-writer {
    width: 100px;
  }

  .ColumnCard-share-icon {
    width: 30px;
    top: 10px;
    right: 0px;
    margin: 10px;
  }

  .ColumnCard-member-count {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    font-size: 1em;
    color: black;
    background-color: white;
    font-display: flex;
    text-align: center;
    line-height: 60px;
  }

`;

export default function ColumnCard ({ number }) {
  return (
    <ColumnCardWrap>
      <div className="ColumnCard">
        <div className='ColumnCard-progress'/>
        <div className='ColumnCard-info'>
        <div className='ColumnCard-info-text'>
            <div className="ColumnCard-title">제목</div>
            <div className="ColumnCard-tag">태그</div>
        </div>
        <div className="ColumnCard-writer">작성자작성자</div>
        <img className='ColumnCard-share-icon' src='/images/share-icon.png' />
        <div className='ColumnCard-member-count'>
            4명
        </div>
        </div>
      </div>
    </ColumnCardWrap>
  );
};