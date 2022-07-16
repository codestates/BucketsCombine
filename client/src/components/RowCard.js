import React from "react";
import styled from "styled-components";
import { openModal } from "../redux/reducers/ModalReducer.js";
import { useDispatch } from "react-redux";

const RowCardWrap = styled.div`
  .card {
    position: relative;
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 330px;
  border-radius: 15px;
  margin: 10px;
  background-image: url("https://source.unsplash.com/random");
  background-size: cover;
  z-index: 1;
  border: none;
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
    z-index: 2;
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

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 330px;
  border-radius: 15px;
  margin: 10px;
  background-image: url("https://source.unsplash.com/random");
  background-size: cover;
  z-index: -2;
  border: none;
`

export default function RowCard ({ number }) {
  const dispatch = useDispatch();
  return (
    <RowCardWrap>
      <button className="card">
        <div className='card-info' onClick={()=> {dispatch(openModal())}}>
          <button className="card-insert-button">
            담기
          </button>
          <div className='card-title'>
            제목
          </div>
          <div className='card-tegs'>
            태그
          </div>
          <div className='card-footer'>
            <div className='card-writer'>글쓴이</div>
            <div className='card-member'>2명</div>
          </div>
        </div>
      </button>
    </RowCardWrap>
  );
};