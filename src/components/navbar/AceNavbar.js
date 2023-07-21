import React, { useState } from "react";
import { aceMenuItems } from "../../Data/DataList";
import { FaTimes, FaBars } from "react-icons/fa";
import "./navBar.css";
import CustomButton from "../customBtn";
import { Link, useNavigate } from "react-router-dom";

const AceNavbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [changeActive, setChangeActive] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setDropdown(!dropdown);
  };
  const GotoLogOut = () => {
    navigate("/ace/signin");
  };
  const GotoProfile = () => {
    navigate("/ace/profile");
  };
  const handleActiveRoute = (item) => {
    setChangeActive(item.title);
    console.log(item.title);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo">House Maker</div>
        <div className="logoSlag"> You Think We Build</div>
      </div>
      <div className="menu-icon" onClick={() => handleClick()}>
        <span>
          {dropdown ? (
            <FaTimes fill="var(--color-primary)" />
          ) : (
            <FaBars fill="var(--color-primary)" />
          )}
        </span>
      </div>
      <ul className={dropdown ? "nav-menu active" : "nav-menu"}>
        {aceMenuItems.map((item, index) => {
          return (
            <div key={index}>
              <li
                key={index}
                className="item"
                onClick={() => {
                  handleActiveRoute(item);
                }}
              >
                <Link
                  className={item.cName}
                  style={{
                    color:
                      changeActive === item.title && "var(--color-primary)",
                  }}
                  to={item.url}
                >
                  <span
                    className={changeActive === item.title ? "itemSpan" : ""}
                  ></span>
                  {item.title}
                </Link>
              </li>
            </div>
          );
        })}

        <li
          className="item"
          onClick={() => {
            GotoLogOut();
          }}
        >
          <CustomButton text={"Log Out"} />
        </li>
      </ul>
    </nav>
  );
};

export default AceNavbar;
