import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md"; // Import attachment icon
import styled from "styled-components";
import Picker from "emoji-picker-react";
import axios from "axios"; // Import Axios for HTTP requests
import { useEffect } from "react/cjs/react.production.min";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null); // State to handle file

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save the selected file to state
  };

  const sendChat = async (event) => {
    event.preventDefault();

    let messageData =  {msg} ; // Initialize the message data

    // Send file if exists
    if (file) {
      const formData = new FormData();
      
      formData.append("file", file);

      try {
        const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const fileData = res.data;
        console.log("File uploaded successfully: ", fileData);

        messageData.fileUrl = fileData.filePath;
        setFile(null);
      } catch (err) {
        console.error("File upload failed: ", err);
      }
    }

    // Send message and file URL to the parent component
    if (msg.length > 0 || messageData.fileUrl) {
      handleSendMsg(messageData);
      setMsg(""); // Clear message after sending
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder={file ? "File selected" : "Type a message"}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <label htmlFor="file-upload" className="file-attach">
          <MdAttachFile />
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }} // Hide the default file input
          onChange={handleFileChange}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

 export function ChatMessage({ message }) {

  return (
    <div className="chat-message">
      <p>{message?.msg || "Hrllo"}</p>
      {message?.fileUrl && (
        <div className="file-attachment">
          {/* Render the file URL */}
          <a href={`http://localhost:5000${message?.fileUrl}`} target="_blank" rel="noopener noreferrer">
            {/* {message?.fileUrl?.endsWith(".png") || message?.fileUrl?.endsWith(".jpg") ? (
              <img src={`http://localhost:5000${message?.fileUrl}`} alt="attachment" />
            ) : (
              "Download File"
            )} */}
          </a>
        </div>
      )}
    </div>
  );
}


const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    input {
      width: 75%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    .file-attach {
      cursor: pointer;
      svg {
        font-size: 1.5rem;
        color: #9a86f3;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
