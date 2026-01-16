import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import MyPage from "./pages/MyPage/MyPage.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/home"
        element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
      />
      <Route
        path="/about"
        element={isLoggedIn ? <AboutPage /> : <Navigate to="/" />}
      />
      <Route
      path="/mypage"
      element={isLoggedIn ? <MyPage /> : <Navigate to="/" />}/>
    </Routes>
  );
}
