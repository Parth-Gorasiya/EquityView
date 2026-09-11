import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const FRONTEND_URL =
  import.meta.env.VITE_FRONTEND_URL || "http://localhost:5174";

const Menu = () => {
  const { user } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getMenuClass = ({ isActive }) => (isActive ? "menu selected" : "menu");

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((currentValue) => !currentValue);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      window.location.replace(`${FRONTEND_URL}/signup`);
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);

      alert(
        error.response?.data?.message || "Unable to log out. Please try again.",
      );
    }
  };

  return (
    <div className="menu-container">
      <NavLink to="/" aria-label="EquityView dashboard">
        <img src="/logo.png" alt="EquityView" style={{ width: "50px" }} />
      </NavLink>

      <div className="menus">
        <ul>
          <li>
            <NavLink to="/" end className="menu-link">
              {({ isActive }) => (
                <p className={getMenuClass({ isActive })}>Dashboard</p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="menu-link">
              {({ isActive }) => (
                <p className={getMenuClass({ isActive })}>Orders</p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/holdings" className="menu-link">
              {({ isActive }) => (
                <p className={getMenuClass({ isActive })}>Holdings</p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/positions" className="menu-link">
              {({ isActive }) => (
                <p className={getMenuClass({ isActive })}>Positions</p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/funds" className="menu-link">
              {({ isActive }) => (
                <p className={getMenuClass({ isActive })}>Funds</p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/apps" className="menu-link">
              {({ isActive }) => (
                <p className={getMenuClass({ isActive })}>Apps</p>
              )}
            </NavLink>
          </li>
        </ul>

        <hr />

        <div className="profile-wrapper">
          <button
            type="button"
            className="profile"
            onClick={toggleProfileDropdown}
            aria-expanded={isProfileDropdownOpen}
          >
            <span className="avatar">{initials || "U"}</span>
            <span className="username">{user?.name || "User"}</span>
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
