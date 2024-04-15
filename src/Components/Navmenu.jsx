import React, { useState } from "react";
import { Link } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline"; // Import the close icon
import "./Navmenu.css";

const Navmenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={`page-container ${isOpen ? "menu-open" : ""}`}>
      <div className="menu-button" onClick={toggleMenu}>
        {isOpen ? (
          <span className="close-icon" onClick={closeMenu}>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        ) : (
          <span className="menu-icon">&#9776;</span> // Your menu icon character code
        )}
      </div>

      <div className="side-menu">
        <ul>
          <br />
          <br />
          <br />
          <br />
          <li>
            <Link to={`/Profile`} onClick={closeMenu}>
              Profile details
            </Link>
          </li>
          <li>
            <Link to={`/Addexp`} onClick={closeMenu}>
              Add Expense
            </Link>
          </li>
          <li>
            <Link to={`/Dataview`} onClick={closeMenu}>
              View Expenses
            </Link>
          </li>
          <li>
            <Link to={`/AddAccount`} onClick={closeMenu}>
              Add Account
            </Link>
          </li>
          <li>
            <Link to={`/AccountList`} onClick={closeMenu}>
              Account List
            </Link>
          </li>
          {/* <View userId={user ? user.user_id : null} /> */}
        </ul>
      </div>
    </div>
  );
};

export default Navmenu;
