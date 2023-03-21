import React from "react";
import styled from "@emotion/styled";
import { HebrewText, ShortenedHebrewText } from "@/types/Text";
import { useTheme as useNextTheme } from "next-themes";
import Link from "next/link";

type StyledBookProps = {
  startColor?: string;
  endColor?: string;
  mainColor?: string;
  darkMode: boolean;
};

// book css source https://codepen.io/poulamic/pen/RwrKqmb
const BookContainer = styled.div<StyledBookProps>`
  width: 250px;
  height: 300px;
  transform: translate(0%, 0%);
  top: 0%;
  left: 0%;
  background: ${(props) => props.mainColor};
  border-radius: 16px 12px 8px 20px;
  background-image: linear-gradient(
    to right,
    ${(props) => props.startColor} 38px,
    ${(props) => props.endColor} 40px,
    transparent 40px
  );
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  box-shadow: 0 10px 15px
    ${(props) =>
      props.darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.3)"};

  :after {
    content: "";
    position: absolute;
    height: 42px;
    width: 240px;
    bottom: 6px;
    right: 0px;
    background: white;
    border-radius: 16px 1px 5px 16px;
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
    box-shadow: 0 10px 15px
      ${(props) =>
        props.darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"};
  }
  div {
    width: 50px;
  }
  span {
    margin-top: 12px;
    width: 70%;
    height: 80%;
    color: white;
  }
  h2 {
    line-height: 1.2;
    margin-bottom: 5px;
  }
  p {
    text-align: left;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
type Props = {
  text: ShortenedHebrewText;
  startColor?: string;
  endColor?: string;
  mainColor?: string;
  href?: string;
};
const Book = ({ text, mainColor, startColor, endColor, href }: Props) => {
  const { category: title } = text;
  const { resolvedTheme } = useNextTheme();

  return (
    <Link href={href ?? `/texts/${title}`}>
      <BookContainer
        mainColor={mainColor ?? "#f33139"}
        startColor={startColor ?? "#d11f2f"}
        endColor={endColor ?? "#ba0716"}
        darkMode={resolvedTheme === "dark"}
      >
        <div />
        <span className="no-select">
          <h2>{title}</h2>
          <p>{text.enShortDesc}</p>
        </span>
      </BookContainer>
    </Link>
  );
};

export default Book;
