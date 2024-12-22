import React, { useState, useEffect, useContext } from "react";
import lbr from "@/library";
import { useContract } from "@/context/NFTMarketplaceContext";

function Chat({ tokenId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessageIndex, setLastMessageIndex] = useState(-1);
  const { account, socket } = useContext(useContract);
  useEffect(() => {
    if (!tokenId) {
      return;
    }

    socket.emit("joinRoomChat", tokenId);

    socket.on("chatHistory", (messages) => {
      setMessages((prev) => [...messages, ...prev]);
      setLastMessageIndex((prevIndex) => prevIndex - 16);
    });

    socket.on("receiveMessage", (message) => {
      setLastMessageIndex((prevIndex) => prevIndex - 1);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      if (socket && tokenId) {
        socket.emit("leaveRoomChat", tokenId);
      }
    };
  }, [tokenId, socket]);

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    const handleScroll = () => {
      if (chatContainer.scrollTop === 0) {
        loadMoreMessages(socket);
      }
    };
    loadMoreMessages(socket);
    chatContainer.addEventListener("scroll", handleScroll);

    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, [lastMessageIndex, socket]);

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
    <div>
      <h3>chat</h3>
      <div className="chat-container" ref={(el) => (el ? (el.scrollTop = el.scrollHeight) : null)}>
        <ul className="chat">
          {messages.map((msg, index) => {
            const messageObject = JSON.parse(msg); // Chuyển đổi chuỗi JSON thành đối tượng
            return (
              <li
                className={`message ${account === messageObject.userId ? "left" : "right"}`}
                key={index}
              >
                <p>{lbr.string.shortenAddress(messageObject.userId)}</p>
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
