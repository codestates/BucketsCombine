import React, { useState } from "react";
import styled from "styled-components";
import { openCardModal } from "../redux/reducers/ModalReducer.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const RowCardWrap = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 330px;
    border-radius: 15px;
    margin: 10px;
    background-size: cover;
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
`;

export default function RowCard({
  cardID,
  writerID,
  title,
  cardtext,
  background,
  createdAt,
  completed,
}) {
  // const tagLine = tags.map((tag) => {
  //   return `#${tag}`;
  // });
  // {tagLine.join(" ")}
  const [isInBucket, setIsInBucket] = useState(false);

  const dispatch = useDispatch();

  const putInBucket = (id) => {
    id.stopPropagation();
    setIsInBucket(true);
  };
  const pullOutBucket = (id) => {
    id.stopPropagation();
    setIsInBucket(false);
  };

  let backgroundImageStyle = {
    backgroundImage: "url(/images/card-" + background + ".jpg)",
  };
  return (
    <RowCardWrap>
      <div
        className="card"
        style={backgroundImageStyle}
        onClick={() => {
          dispatch(openCardModal());
        }}
      >
        <div className="card-info">
          {isInBucket ? (
            <button className="card-subtract-button" onClick={pullOutBucket}>
              빼기
            </button>
          ) : (
            <button className="card-insert-button" onClick={putInBucket}>
              담기
            </button>
          )}
          <div className="card-title">{title}</div>
          <div className="card-tegs">#태그 #태그</div>
          <div className="card-footer">
            <div className="card-writer">글쓴이</div>
            <div className="card-member">0명</div>
          </div>
        </div>
      </div>
    </RowCardWrap>
  );
}
