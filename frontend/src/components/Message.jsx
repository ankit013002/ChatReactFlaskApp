import React from "react";
import "./Message.css";

const Message = (props) => {
  return (
    <div className="chat-main-container">
      <div
        className={`chat-message-container ${
          props.outgoing ? "outgoing-color" : "incoming-color"
        }`}
      >
        {props.item.message}
      </div>
    </div>
  );
};

export default Message;
