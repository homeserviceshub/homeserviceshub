import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const tokenID = localStorage.getItem("auth");

  return tokenID !== null && tokenID !== "null" ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
