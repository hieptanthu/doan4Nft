import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import lbr from "@/library";

function Chat({ tokenId, userId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [lastMessageIndex, setLastMessageIndex] = useState(-1);

  useEffect(() => {
    if (!tokenId) {
      return;
    }

    // Kết nối tới URL từ biến môi trường
    const socketURL = process.env.NEXT_PUBLIC_Socket_URL; // URL từ môi trường
    const newSocket = io(socketURL, {
      query: {
        userid: userId,
      },
    });
    setSocket(newSocket);

    newSocket.on("chatHistory", (messages) => {
      setMessages((prev) => [...messages, ...prev]);
      setLastMessageIndex((prevIndex) => prevIndex - 16);
    });

    newSocket.on("receiveMessage", (message) => {
      setLastMessageIndex((prevIndex) => prevIndex - 1);
      setMessages((prev) => [...prev, message]);
    });

    // Lắng nghe sự kiện từ server
    newSocket.emit("joinRoomChat", tokenId);

    loadMoreMessages(newSocket);

    return () => {
      if (newSocket && tokenId) {
        newSocket.emit("leaveRoomChat", tokenId);
        newSocket.disconnect();
      }
    };
  }, [tokenId]);

  useEffect(() => {
    const chatContainer = document.querySelector(".chat");
    const handleScroll = () => {
      if (chatContainer.scrollTop === 0) {
        loadMoreMessages(socket);
      }
    };

    chatContainer.addEventListener("scroll", handleScroll);

    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, [lastMessageIndex]);

  function send() {
    if (message.trim() && socket) {
      socket.emit("sendMessage", { room: tokenId, message });
      setMessage(""); // Clear input field
    }
  }

  function loadMoreMessages(socketInstance) {
    if (socketInstance) {
      socketInstance.emit("loadMoreMessages", { room: tokenId, lastMessageIndex });
    }
  }

  return (
    
    <div > 
      <h3>chat</h3>
      <div className="chat-container"  ref={(el) => (el ? (el.scrollTop = el.scrollHeight) : null)}>
        <ul className="chat" >
          {messages.map((msg, index) => {
            const messageObject = JSON.parse(msg); // Chuyển đổi chuỗi JSON thành đối tượng
            return (
              <li
                className={`message ${userId === messageObject.userId ? "left" : "right"}`}
                key={index}
              >
                <p>{lbr.string.shortenAddress(messageObject.userId )}</p>
                {messageObject.message}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="text_input">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Message..."
          />
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
  );
}

export default Chat;
