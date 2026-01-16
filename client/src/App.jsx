import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage.jsx";



export default function App() {
  const isLoggedIn = localStorage.getItem("username");

  return (
    <Routes>
     
      <Route path="/" element={<Login />} />

      
      <Route
  path="/home"
  element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
/>


    </Routes>
  );
}
