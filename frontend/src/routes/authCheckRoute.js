import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  Outlet } from "react-router-dom";
import { CHECKLOGIN } from "../redux/actions/actionCheckLogin";
import axios from "axios";

const AuthCheckRoute = () => {
  const dispatch = useDispatch();
  // const id = localStorage.getItem("auth");
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = localStorage.getItem("auth");
    id !== "null" && console.log(id, "id hegi");
    if (id && id !== null && id !== "null") {
      dispatch(CHECKLOGIN(true));
    } else {
      dispatch(CHECKLOGIN(false));
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/usersData")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <Outlet />;
};

export default AuthCheckRoute;
