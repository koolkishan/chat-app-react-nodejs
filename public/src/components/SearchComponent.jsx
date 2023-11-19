import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
`;

const SearchButton = styled.div`
  position:absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background: #5234eb;
  border-radius: 50%;
  transition: all 1s;
  z-index: 4;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: "";
    position: absolute;
    margin: auto;
    top: 22px;
    right: 0;
    bottom: 0;
    left: 22px;
    width: 12px;
    height: 2px;
    background: white;
    transform: rotate(45deg);
    transition: all 0.5s;
  }

  &::after {
    content: "";
    position: absolute;
    margin: auto;
    top: -5px;
    right: 0;
    bottom: 0;
    left: -5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid white;
    transition: all 0.5s;
  }
`;

const Input = styled.input`
  font-family: 'Merriweather', serif;
  font-size: 15px;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 50px;
  outline: none;
  border: none;
  background: rgb(245, 245, 220);
  color: black;
  padding: 0 80px 0 20px;
  border-radius: 30px;
  box-shadow: rgb(245, 245, 220), 0 20px 25px 0 rgb(245, 245, 220);
  transition: all 1s;
  opacity: 0;
  z-index: 5;
  font-weight: bolder;
  letter-spacing: 0.1em;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    width: 300px;
    opacity: 1;
    cursor: text;
  }
  
  &::placeholder {
    color: black;
    font-weight: bolder;
  }
`;

const SearchComponent = ({ setText }) => {
  const [isInputFocused, setInputFocused] = useState(false);

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search..."
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        isInputFocused={isInputFocused}
        onChange={(e) => setText(e.target.value)}
      />
      <SearchButton isInputFocused={isInputFocused} />
    </Container>
  );
};

export default SearchComponent;
