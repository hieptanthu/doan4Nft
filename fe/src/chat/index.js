import React, { useState, useContext, useEffect } from "react";
import lbr from "@/library";
import { io } from "socket.io-client";
import Image from "next/image";
function Chat({ tokenId, userId }) {
  let socket;
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState();
  console.log(tokenId);
  useEffect(() => {
    if (!tokenId) {
      return;
    }
    // Kết nối tới URL từ biến môi trường
    const socketURL = process.env.NEXT_PUBLIC_Socket_URL; // URL từ môi trường
    socket = io(socketURL);
    // Lắng nghe sự kiện từ server
    socket.emit("joinRommChat", tokenId);

    return () => {
      if ((socket, tokenId)) {
        socket.emit("leaveRoomChat", tokenId);
      }
    };
  }, [tokenId]);
  async function send() {}
  return (
    <>
      <h3>chat</h3>
      <div className="chat-container">
        <ul className="chat"></ul>
        <div className="text_input">
          <input onChange={setMessage} type="text" placeholder="Message..." />
          <button onClick={send}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
