import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { CHECKLOGIN } from "../redux/actions/actionCheckLogin";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("auth");

  return id && id !== null && id !== "null"
    ? dispatch(CHECKLOGIN(true)) && <Outlet />
    : dispatch(CHECKLOGIN(false)) && <Navigate to="/signin" replace />;
};

export default PrivateRoute;
