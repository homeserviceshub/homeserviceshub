import React, { useEffect, useState } from "react";
import { aceMenuItems } from "../../Data/DataList";
import { FaTimes, FaBars } from "react-icons/fa";
import "./navBar.css";
import CustomButton from "../customBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AceNavbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [changeActive, setChangeActive] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const remainingTasks = useSelector((state) => {
    return state.RemainingTasksReducer;
  });

  const handleClick = () => {
    setDropdown(!dropdown);
  };
  const GotoSignin = () => {
    navigate("/ace/signin");
  };

  const handleActiveRoute = (item) => {
    setChangeActive(item.title);
    if (window.innerWidth <= 768) {
      setDropdown(false); // Collapse the navbar on mobile devices
    }
  };
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = aceMenuItems.find((item) => item.url === currentPath);
    if (activeItem) {
      setChangeActive(activeItem.title);
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
            navigate("/ace/signin");
          }}
        >
          House Maker
        </div>
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
                  color: changeActive === item.title && "var(--color-primary)",
                }}
                to={item.url}
              >
                <span
                  className={changeActive === item.title ? "itemSpan" : ""}
                ></span>
                {item.title}
              </Link>
              {item.title == "Service Request" && remainingTasks !== 0 && (
                <span className="newTasks">{remainingTasks}</span>
              )}
            </li>
          );
        })}

        {loggedIn ? (
          <li className="item" onClick={GotoSignin}>
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

export default AceNavbar;
