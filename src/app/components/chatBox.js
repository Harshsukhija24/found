import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const ChatBox = ({ accepted }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (accepted) {
      socket = io();

      socket.on("connect", () => {
        console.log("Connected to socket.io server");
      });

      socket.on("message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [accepted]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      {accepted ? (
        <>
          <div
            style={{
              border: "1px solid black",
              padding: "10px",
              height: "300px",
              overflowY: "scroll",
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} style={{ margin: "10px 0" }}>
                {msg}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            style={{ marginTop: "10px", width: "80%" }}
          />
          <button onClick={sendMessage} style={{ marginLeft: "10px" }}>
            Send
          </button>
        </>
      ) : (
        <p>Waiting for acceptance...</p>
      )}
    </div>
  );
};

export default ChatBox;
