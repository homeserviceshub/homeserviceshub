import React, { useState, useEffect } from "react";
// import { menuItems } from "../../Data/DataList";
import { FaTimes, FaBars } from "react-icons/fa";
import "./navBar.css";
import CustomButton from "../customBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [changeActive, setChangeActive] = useState("Home");
  const [userData, setUserData] = useState([]);
  const checklogin = useSelector((state) => {
    return state.checkLoginReducer;
  });
  const getMenuItems = (user) => {
    console.log(user);
    // Base menu items
    const menuItems = [
      {
        title: "Home",
        url: "/",
        cName: "nav-links",
      },
      {
        title: "Services",
        url: "/services",
        cName: "nav-links",
      },
    ];

    // Add the conditional menu item
    const aceMenuItem = {
      title: user?.aceData ? "Switch to Ace" : "Join Us",
      url: user?.isAce ? "/ace/signin" : "/ace",
      cName: "nav-links",
    };

    // Add the aceMenuItem to the menuItems array
    menuItems.push(aceMenuItem);

    return menuItems;
  };
  const menuItems = getMenuItems(userData);

  const [loggedIn, setLoggedIn] = useState(checklogin);
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = localStorage.getItem("auth");
  useEffect(() => {
    if (authToken !== null && authToken !== "null") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authToken]);

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
    navigate(item.url);
  };

  // Update active route when domain path changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.url === currentPath);
    if (activeItem) {
      setChangeActive(activeItem.title);
    } else if (
      currentPath === "/services/service" ||
      currentPath.includes("/companyprofile/") ||
      currentPath.includes("/servicerequest")
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
          <img
            src={
              process.env.PUBLIC_URL +
              "/photos/homeserviceshublogowithoutbg.png"
            }
            className="mobileImg"
            alt="mobileLogo"
            width={"55px"}
            height={60}
          />

          <img
            src={process.env.PUBLIC_URL + "/photos/hshlogo.png"}
            className="desptopImg"
            alt="desktopLogo"
            width={"100%"}
            height={60}
          />
        </div>
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
