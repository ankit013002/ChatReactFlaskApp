import React, { useState } from "react";
import "./Mainpage.css";
import Message from "../components/Message";

const Mainpage = (props) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    props.socket.emit("message", `${props.username}: ${input}`);
    setInput("");
  };

  return (
    <div className="mainpage-container">
      <div className="chat-screen-container">
        {props.messageCollection.map((item, index) => {
          console.log(item.message);
          if (item.username == props.username) {
            return (
              <div className="outgoing-chat-message-container">
                <div className="outgoing-chat-username-container">
                  {item.username}
                </div>
                <div className="message outgoing-message" key={index}>
                  <Message item={item} outgoing={true} />
                </div>
              </div>
            );
          } else {
            return (
              <div className="incoming-chat-message-container">
                <div className="incoming-chat-username-container">
                  {item.username}
                </div>
                <div className="message incoming-message" key={index}>
                  <Message item={item} outgoing={false} />
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="message-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="message-input"
          placeholder="Enter Message..."
        />
        <button onClick={() => handleClick()} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Mainpage;
