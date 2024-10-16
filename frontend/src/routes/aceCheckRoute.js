import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { ACECHECKLOGIN } from "../redux/actions/aceCheckLogin";

const AceCheckRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const id = localStorage.getItem("auth");
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = localStorage.getItem("aauth");
    // id !== "null" && console.log(id, "id hegi");
    if (id && id !== null && id !== "null") {
      dispatch(ACECHECKLOGIN(true));
      navigate("/ace/profile");
    } else {
      dispatch(ACECHECKLOGIN(false));
    }
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("/usersData")
  //     // .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
  return <Outlet />;
};

export default AceCheckRoute;
