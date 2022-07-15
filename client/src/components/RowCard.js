import React from "react";
import styled from "styled-components";

const RowCardWrap = styled.div`

  .card {
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 330px;
    border-radius: 15px;
    margin: 10px;
    background-size: cover;
  }

  .card-info {
    margin: 10px;
    color: white;
  }

  .card-insert-button {
    width: 70px;
    height: 30px;
    border-radius: 10px;
    margin-left: 130px;
    border: none;
    box-shadow: none;
    font-size: 13px;
    background-color: #FFC700;
  }

  .card-title {
    font-size: 26px;
    color: white;
    height: 105px;
    margin: 10px;
  }

  .card-tegs {
    color: white;
    height: 85px;
    margin: 10px;
  }

  .card-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .card-writer {
    margin-left: 10px;
  }

  .card-member {
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

export default function RowCard ({title, tags, writer, memberCount, background}) {
  
  const tagLine = tags.map(tag => {
     return `#${tag}`
  })
  
  let backgroundImageStyle = {
    backgroundImage: "url(/images/" + background + ".jpg)"
  }

  return (
    <RowCardWrap>
      <div className='card' style={backgroundImageStyle}>
        <div className='card-info'>
          <button className='card-insert-button'>담기</button>
          <div className='card-title'>
            {title}
          </div>
          <div className='card-tegs'>
            {tagLine.join(' ')}
          </div>
          <div className='card-footer'>
            <div className='card-writer'>{writer}</div>
            <div className='card-member'>{memberCount}명</div>
          </div>
        </div>
      </div>
    </RowCardWrap>
  );
};
