import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import userById from "../utils/backendCall";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const user = await userById();
    const data = await axios.get(`${logoutRoute}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        )}`,
      },
    });
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
