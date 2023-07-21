import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";
import AceNavbar from "../navbar/AceNavbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
export function Layout2() {
  return (
    <>
      <AceNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
