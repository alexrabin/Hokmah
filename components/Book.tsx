import React from "react";
import styled from "@emotion/styled";
type StyledBookProps = {
  startColor?: string;
  endColor?: string;
  mainColor?: string;
};
const BookContainer = styled.div<StyledBookProps>`
  width: 180px;
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

  display: flex;
  flex-direction: row;
  align-items: center;

  :after {
    content: "";
    position: absolute;
    height: 42px;
    width: 174px;
    bottom: 6px;
    right: 0px;
    background: white;
    border-radius: 16px 4px 4px 16px;
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
  div {
    width: 60px;
  }
  p {
    color: white;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 20px;
    text-align: left;
    width: 60%;
  }
`;
type Props = {
  title: string;
  startColor?: string;
  endColor?: string;
  mainColor?: string;
};
const Book = ({ title, mainColor, startColor, endColor }: Props) => {
  return (
    <BookContainer
      mainColor={mainColor ?? "#f33139"}
      startColor={startColor ?? "#d11f2f"}
      endColor={endColor ?? "#ba0716"}
    >
      <div />
      <p className="no-select">{title}</p>
    </BookContainer>
  );
};

export default Book;
