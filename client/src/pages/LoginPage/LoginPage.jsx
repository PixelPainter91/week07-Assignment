import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

export default function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error");
      console.error(err);
    }
  };

  const signup = async () => {
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        await login(); // Autologin
      } else {
        const data = await res.json();
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <img className="login-img" src="/public/assets/dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg" alt="Travel items including map, camera, photos, magnifying glass, and scrapbook on a table."/>
      <h1>Wonder</h1>
      <p>The Adventurers Scrapbook</p>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> 
      {/* maybe update for emails at a later date no email addresses for MVP */}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="error">{error}</p>}
      <div className="btn-container">
      <button onClick={login}>Log In</button>
      <button onClick={signup}>Sign Up</button>
      </div>
    </div>
  );
}
