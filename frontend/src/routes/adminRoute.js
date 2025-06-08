import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setIsAdmin(false);
          return;
        }
        const response = await fetch("http://localhost:3000/userdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: userId }),
        });
        const data = await response.json();
        setIsAdmin(data[0]?.isAdmin || false);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return null; // Loading state
  return isAdmin ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminRoute;
