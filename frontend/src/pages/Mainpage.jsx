import React, { useState } from "react";
import "./Mainpage.css";
import Message from "../components/Message";

const Mainpage = (props) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    props.socket.emit("message", `${props.username}: ${input}`);
  };

  return (
    <div className="mainpage-container">
      <div className="chat-screen-container">
        {props.messageCollection.map((item, index) => {
          console.log(item.message);
          if (item.username == props.username) {
            return (
              <div className="message outgoing-message" key={index}>
                <Message item={item} outgoing={true} />
              </div>
            );
          } else {
            return (
              <div className="message incoming-message" key={index}>
                <Message item={item} outgoing={false} />
              </div>
            );
          }
        })}
      </div>
      <div className="message-container">
        <input
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
