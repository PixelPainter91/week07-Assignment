import { Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    console.log("Message sent:", message);
    setMessage("");
    setChatOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">Wonder</h2>

        <ul>
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>

          <li className="nav-item">
            <Link to="/mypage">My Page</Link>
          </li>

          <li className="nav-item">
            <button type="button">My Profile</button>
            <ul className="sub-menu">
              <li>
                <button
                  className="chat-btn"
                  onClick={() => setChatOpen(true)}
                >
                  Chat
                </button>
              </li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </li>

          <li>
            <img
              className="nav-avatar"
              src="/assets/profileavatar.png"
              alt="Profile avatar"
            />
          </li>
        </ul>
      </nav>

      {chatOpen && (
        <div
          className="chat-overlay"
          onClick={() => setChatOpen(false)}
        >
          <div
            className="chat-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Chat</h3>

            <textarea
              placeholder="Mock Social Messaging box..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />

            <div className="chat-actions">
              <button
                className="cancel"
                onClick={() => setChatOpen(false)}
              >
                Cancel
              </button>
              <button
                className="send"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


        