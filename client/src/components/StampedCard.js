import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {openStampedModal, setModalCardID } from '../redux/reducers/ModalReducer'
import { useMediaQuery } from "react-responsive";

const StampedCardWrap = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 330px;
    border-radius: 15px;
    margin: 10px;
    background-size: cover;
    background-position: center center;
    z-index: 1;
    transition: box-shadow 0.2s;
  }

  .card:hover {
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 330px;
    border-radius: 15px;
    margin: 10px;
    background-size: cover;
    background-position: center center;
    z-index: 1;
    box-shadow: 6px 6px 6px 6px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.2s;
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
    background-color: #ffc700;
    z-index: 10;
    transition: box-shadow 0.2s;
  }

  .card-insert-button:hover {
    width: 70px;
    height: 30px;
    border-radius: 10px;
    margin-left: 130px;
    border: none;
    font-size: 13px;
    background-color: #ffc700;
    z-index: 10;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.2s;
  }

  .card-subtract-button {
    width: 70px;
    height: 30px;
    border-radius: 10px;
    margin-left: 130px;
    border: none;
    box-shadow: none;
    font-size: 13px;
    background-color: #ff5c00;
    z-index: 10;
    font-weight: bold;
    color: white;
    transition: box-shadow 0.2s;
  }
  .card-subtract-button:hover {
    width: 70px;
    height: 30px;
    border-radius: 10px;
    margin-left: 130px;
    border: none;
    font-size: 13px;
    background-color: #ff5c00;
    z-index: 10;
    font-weight: bold;
    color: white;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.2s;
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

  .complete-stamp {
    width: 120px;
    position: relative;
    transform: rotate(-50deg);
    left: 120px;
    top: 200px;
  }
`;

export default function StampedCard({
  cardID,
  writername,
  title,
  cardtext,
  background,
  createdAt,
  completed,
  tags,
  membersID,
}) {
  const isDesktop = useMediaQuery({ minWidth: 921 })


  const dispatch = useDispatch();


  const tagLine = tags.map((tag) => {
    return `#${tag}`;
  });

  let backgroundImageStyle = {
    backgroundImage: "url(" + background + ")",
  };
  return (
    <StampedCardWrap>
      <div
        className="card"
        style={backgroundImageStyle}
        onClick={() => {
          dispatch(setModalCardID(cardID));
          dispatch(openStampedModal());
        }}
      >
        <div className="card-info">
          <div className="card-footer">
          </div>
        </div>
        <img className="complete-stamp" src="/images/complete-stamp.png"/>
      </div>
    </StampedCardWrap>
  );
}
