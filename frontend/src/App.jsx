import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [connection, setConnection] = useState(false);
  const [socket, setSocket] = useState();

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
      console.log("Message from server:", data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    console.log(socket);
    socket.emit("message", "Hi");
  };

  return (
    <>
      <div>
        <p>{connection.toString()}</p>
        <button onClick={() => handleClick()}>Button</button>
      </div>
    </>
  );
}

export default App;
