import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Mainpage from "./pages/Mainpage";

function App() {
  const [connection, setConnection] = useState(false);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [messageCollection, setMessageCollection] = useState([]);

  useEffect(() => {
    const connectionString =
      "http://" + import.meta.env.VITE_HOST + ":" + import.meta.env.VITE_PORT;
    const socket = io(connectionString);
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to Server");
      setConnection(true);
    });

    socket.on("message", (data) => {
      let colonIndex = data.indexOf(":");
      let incomingUsername = data.slice(0, colonIndex);
      let incomingMessage = data.slice(colonIndex + 1, data.length);
      setMessageCollection((prevMessageCollection) => {
        let newCollection = [
          ...prevMessageCollection,
          { username: incomingUsername, message: incomingMessage },
        ];
        return newCollection;
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const UpdateUsername = () => {
    setUsername(tempInput);
    localStorage.setItem("username", tempInput);
    socket.on("username", tempInput);
  };

  return (
    <>
      <div className="main-container">
        {connection && username != "" ? (
          <Mainpage
            socket={socket}
            username={username}
            messageCollection={messageCollection}
          />
        ) : (
          <div className="launch-container">
            {connection ? (
              <div className="waiting-container">Connected</div>
            ) : (
              <div className="waiting-container">Waiting To Connect...</div>
            )}
            {username == "" ? (
              <div className="username-insert-container">
                <input
                  className="username-input"
                  onChange={(e) => setTempInput(e.target.value)}
                  placeholder="Enter Username..."
                />
                <button
                  className="username-button"
                  onClick={() => UpdateUsername()}
                >
                  Enter
                </button>
              </div>
            ) : (
              <div className="username-insert-container">Hey {username}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
