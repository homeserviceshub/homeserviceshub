import React, { useState, useEffect } from "react";
import { menuItems } from "../../Data/DataList";
import { FaTimes, FaBars } from "react-icons/fa";
import "./navBar.css";
import CustomButton from "../customBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [changeActive, setChangeActive] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  const GotoSignin = () => {
    navigate("/signin");
  };

  const GotoProfile = () => {
    navigate("/user/profile");
  };

  const handleActiveRoute = (item) => {
    setChangeActive(item.title);
    if (window.innerWidth <= 768) {
      setDropdown(false); // Collapse the navbar on mobile devices
    }
  };

  // Update active route when domain path changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.url === currentPath);
    if (activeItem) {
      setChangeActive(activeItem.title);
    } else if (
      currentPath === "/services/service" ||
      currentPath === "/companyprofile" ||
      currentPath === "/servicerequest"
    ) {
      setChangeActive("Services");
    } else {
      // Handle the case when the route doesn't match any menu item (optional)
      setChangeActive("");
    }
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          H S H
        </div>
        <div className="logoSlag"> You Think We Build</div>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <span>
          {dropdown ? (
            <FaTimes fill="var(--color-primary)" />
          ) : (
            <FaBars fill="var(--color-primary)" />
          )}
        </span>
      </div>
      <ul className={dropdown ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="item"
            onClick={() => handleActiveRoute(item)}
          >
            <Link
              className={item.cName}
              style={{
                color: changeActive === item.title && "var(--color-primary)",
              }}
              to={item.url}
            >
              <span
                className={changeActive === item.title ? "itemSpan" : ""}
              ></span>
              {item.title}
            </Link>
          </li>
        ))}
        {loggedIn ? (
          <li className="item" onClick={GotoProfile}>
            <CustomButton text={"Profile"} />
          </li>
        ) : (
          <li className="item" onClick={GotoSignin}>
            <CustomButton text={"SIGN IN"} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
