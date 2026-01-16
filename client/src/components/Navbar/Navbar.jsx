import { Link } from "react-router-dom";
import "./navbar.css";
import HomePage from "../../pages/HomePage/HomePage.jsx";



export default function Navbar() {
  return (
    <nav className="navbar">
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
          <button aria-expanded="false">My Profile</button>
          <ul className="sub-menu" aria-label="Apps">
            <li><a href="#">Chat</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">Settings</a></li>
            
          </ul>
        </li>
        <li><img className="nav-avatar" src="./public/assets/profileavatar.png"/>
        </li>
      </ul>
    </nav>
  );
}
        