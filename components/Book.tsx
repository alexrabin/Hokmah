import React, { useState } from "react";
import styled from "@emotion/styled";
import { HebrewText } from "@/types/Text";
type StyledBookProps = {
  startColor?: string;
  endColor?: string;
  mainColor?: string;
};
const BookContainer = styled.div<StyledBookProps>`
  width: 200px;
  height: 250px;
  transform: translate(0%, 0%);
  top: 0%;
  left: 0%;
  background: ${(props) => props.mainColor};
  border-radius: 16px 12px 10px 25px;
  background-image: linear-gradient(
    to right,
    ${(props) => props.startColor} 48px,
    ${(props) => props.endColor} 50px,
    transparent 50px
  );
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: row;

  :after {
    content: "";
    position: absolute;
    height: 42px;
    width: 190px;
    bottom: 6px;
    right: 0px;
    background: white;
    border-radius: 16px 1px 1px 16px;
    box-shadow: inset 4px 4px 0px 0px #e4e0ce;
    background-image: linear-gradient(
      to bottom,
      transparent 6px,
      #e4e0ce 8px,
      transparent 8px,
      transparent 12px,
      #e4e0ce 12px,
      transparent 14px,
      transparent 18px,
      #e4e0ce 18px,
      transparent 20px,
      transparent 24px,
      #e4e0ce 24px,
      transparent 26px,
      transparent 30px,
      #e4e0ce 30px,
      transparent 32px,
      transparent 36px,
      #e4e0ce 36px,
      transparent 38px,
      transparent 42px,
      #e4e0ce 42px,
      transparent 44px,
      transparent 48px,
      #e4e0ce 48px,
      transparent 50px
    );
  }
  :hover {
    transform: scale(1.1);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  }
  div {
    width: 55px;
  }
  span {
    margin-top: 50px;
    width: 60%;
    color: white;
  }
  p {
    font-weight: 500;
    font-size: 20px;
    text-align: left;
  }
`;
type Props = {
  text: HebrewText;
  startColor?: string;
  endColor?: string;
  mainColor?: string;
};
const Book = ({ text, mainColor, startColor, endColor }: Props) => {
  const { category: title } = text;

  return (
    <BookContainer
      mainColor={mainColor ?? "#f33139"}
      startColor={startColor ?? "#d11f2f"}
      endColor={endColor ?? "#ba0716"}
    >
      <div />
      <span>
        <h2 className="no-select">{title}</h2>
      </span>
    </BookContainer>
  );
};

export default Book;
