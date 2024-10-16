import React, { useEffect, useState } from "react";
import { aceMenuItems } from "../../Data/DataList";
import { FaTimes, FaBars } from "react-icons/fa";
import "./navBar.css";
import CustomButton from "../customBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AceNavbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [changeActive, setChangeActive] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [remaining, setRemaining] = useState(0);
  const auth = localStorage.getItem("aauth");

  useEffect(() => {
    if (auth === null || auth === "null") {
      navigate("/ace/signin");
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      fetchData();
    }
  }, [auth, navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/getprojectsdata", {
        clientID: localStorage.getItem("aauth"),
      });

      if (response.status === 200) {
        if (response.data.message === "No Projects Done Yet") {
          localStorage.setItem("totalProjects", 0);
        } else {
          const requestedTasks = response.data.filter(
            (item) => item.status === "requested"
          );
          setRemaining(requestedTasks.length);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  const GotoSignin = () => {
    navigate("/ace/signin");
  };

  const Logout = () => {
    localStorage.setItem("aauth", null);
    setLoggedIn(false);
    navigate("/ace/signin");
  };

  const handleActiveRoute = (item) => {
    setChangeActive(item.title);
    if (window.innerWidth <= 768) {
      setDropdown(false); // Collapse the navbar on mobile devices
    }
    navigate(item.url);
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
        <div className="logoSlag">You Think We Build</div>
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
        {aceMenuItems.map((item, index) => (
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
            {item.title === "Service Request" &&
              remaining !== 0 &&
              !isNaN(remaining) && (
                <span className="newTasks">{remaining}</span>
              )}
          </li>
        ))}
        {loggedIn ? (
          <li className="item" onClick={Logout}>
            <CustomButton text={"LOG OUT"} />
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
