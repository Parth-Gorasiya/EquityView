import { useState } from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((currentValue) => !currentValue);
  };

  const getMenuClass = ({ isActive }) =>
    isActive ? "menu selected" : "menu";

  return (
    <div className="menu-container">
      <NavLink to="/" aria-label="EquityView dashboard">
        <img
          src="/logo.png"
          alt="EquityView logo"
          style={{ width: "50px" }}
        />
      </NavLink>

      <div className="menus">
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={getMenuClass}
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              className={getMenuClass}
              style={{ textDecoration: "none" }}
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/holdings"
              className={getMenuClass}
              style={{ textDecoration: "none" }}
            >
              Holdings
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/positions"
              className={getMenuClass}
              style={{ textDecoration: "none" }}
            >
              Positions
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/funds"
              className={getMenuClass}
              style={{ textDecoration: "none" }}
            >
              Funds
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/apps"
              className={getMenuClass}
              style={{ textDecoration: "none" }}
            >
              Apps
            </NavLink>
          </li>
        </ul>

        <hr />

        <div className="profile-wrapper">
          <button
            type="button"
            className="profile"
            onClick={handleProfileClick}
            aria-expanded={isProfileDropdownOpen}
          >
            <div className="avatar">PG</div>
            <p className="username">PARTH</p>
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <p>Profile</p>
              <p>Settings</p>
              <button type="button">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;