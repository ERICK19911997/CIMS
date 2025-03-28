import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const TopBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="navbar-nav ">
        <img
          src="./images/logo.png" // Path inside the 'public' folder
          alt="BoostiFy Logo"
          width="120"
          height="60"
          className="d-inline-block align-top"
        />
      </div>

      {/* Right Side - Profile Dropdown */}
      <div className="ms-auto">
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="profileDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/preferences">
                Preferences
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item text-danger" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
