import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUserNameRoute, registerRoute } from "../utils/APIRoutes";
import { debounce } from "../utils/Debounce";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";

export default function SetUsername() {
  onAuthStateChanged(firebaseAuth, (userData) => {
    if (!userData) {
      navigate("/login");
    } else {
      setEmail(
        userData.email ? userData.email : userData.providerData[0].email
      );
    }
  });

  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [label, setLabel] = useState("");
  const [usernameStatus, setUsernamStatus] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = debounce((name) => checkUsername(name), 300);

  const validateForm = () => {
    if (values.length < 3) {
      toast.error(
        "username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const checkUsername = async (username) => {
    if (username.length > 3) {
      const { data } = await axios.post(checkUserNameRoute, { username });
      setUsernamStatus(data.status);
      setLabel(data.msg);
      setValues(username);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { data } = await axios.post(registerRoute, {
        username: values,
        email,
        password: (Math.random() + 1).toString(20).substring(1),
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        {email && (
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <span>Check Username Availablity</span>
            <div className="row">
              <input
                className={`${
                  usernameStatus
                    ? "success"
                    : usernameStatus !== undefined
                    ? "danger"
                    : ""
                }`}
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e.target.value)}
                min="3"
              />
              <label
                htmlFor=""
                className={`${
                  usernameStatus
                    ? "success"
                    : usernameStatus !== undefined
                    ? "danger"
                    : ""
                }`}
              >
                {label}
              </label>
            </div>
            <button type="submit" className="btn">
              Create User
            </button>
          </form>
        )}
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .row {
    label {
      display: block;
      margin: 10px 0 0 5px;
      transition: 0.3s ease-in-out;
      height: 0.5rem;
    }
    label.success {
      color: #39ff14;
    }
    label.danger {
      color: #ff3131;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    transition: 0.3s ease-in-out;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  .success {
    border-color: #39ff14;
    &:focus {
      border-color: #39ff14;
    }
  }
  .danger {
    border-color: #ff3131;
    &:focus {
      border-color: #ff3131;
    }
  }
  .btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
  }
`;
