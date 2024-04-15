import React, { useState } from "react";
import "./Header.css";
import userIcon from "./user.png";
import { Link } from "react-router-dom";
const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`headtag ${isMenuOpen ? "menu-open" : ""}`}>
      <div></div>
      <h1 className="h1tag">Expense Tracker</h1>
      {user ? (
        <div className="user-info" onClick={handleMenuToggle}>
          <img src={userIcon} alt="User Icon" className="user-icon" />
        </div>
      ) : (
        <h1>Welcome to the Dashboard</h1>
      )}

      {isMenuOpen && (
        <div className="side-menu1">
          <p>Welcome, {user.username}</p>
          <form>
            <ul>
              <li>
                <Link to={`/Profile`}>Profile details</Link>
              </li>
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          </form>
        </div>
      )}
      {isMenuOpen && <div className="overlay" onClick={handleMenuToggle}></div>}
    </header>
  );
};

export default Header;
