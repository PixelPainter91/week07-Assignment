import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim()) return;

    // fake login
    localStorage.setItem("username", username);
    navigate("/home");
  }

  return (
    <div className="login-container">
      <h1>Wonderlust</h1>
      <p>The Adventures Scrapbook</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
