import React from "react";
import "./Message.css";

const Message = (props) => {
  return (
    <div
      className={`chat-message-container ${
        props.outgoing ? "outgoing-color" : "incoming-color"
      }`}
    >
      {props.item.message}
    </div>
  );
};

export default Message;
