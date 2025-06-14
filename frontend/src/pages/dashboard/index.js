import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styles from "./index.module.css";
import axios from "axios";
import CustomButton from "../../components/customBtn";
import ServiceRequests from "./ServiceRequests";
import Customers from "./Customers";
import Clients from "./Clients";
import Reviews from "./Reviews";
import Subscriptions from "./Subscriptions";
import VerificationRequest from "./VerificationRequest";

// Dashboard Home with Buttons
const sections = [
  { name: "Service Requests", path: "/api/admin/dashboard/servicerequests" },
  { name: "Customers", path: "/api/admin/dashboard/customers" },
  { name: "Clients", path: "/api/admin/dashboard/clients" },
  { name: "Reviews", path: "/api/admin/dashboard/reviews" },
  { name: "Subscriptions", path: "/api/admin/dashboard/subscriptions" },
  {
    name: "VerificationRequest",
    path: "/api/admin/dashboard/verificationrequest",
  },
];

const DashboardHome = () => {
  const navigate = useNavigate();
  // const sections = [
  //   { name: "Service Requests", path: "/api/admin/dashboard/servicerequests" },
  //   { name: "Customers", path: "/api/admin/dashboard/customers" },
  //   { name: "Clients", path: "/api/admin/dashboard/clients" },
  //   { name: "Reviews", path: "/api/admin/dashboard/reviews" },
  //   { name: "Subscriptions", path: "/api/admin/dashboard/subscriptions" },
  //   {
  //     name: "VerificationRequest",
  //     path: "/api/admin/dashboard/verificationrequest",
  //   },
  // ];

  return (
    <div className={styles.content}>
      <h1>Dashboard</h1>
      <div className={styles.buttonContainer}>
        {sections.map((section) => (
          <CustomButton
            key={section.name}
            className={styles.sectionButton}
            onClick={() => navigate(section.path)}
            text={section.name}
            width={"10rem"}
          />
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const userId = localStorage.getItem("auth");
      try {
        const response = await axios.post(`/api/dashboard/getuserdata`, {
          _Id: userId,
        });

        const data = response.data;
        setIsAuthenticated(data.user?.isAdmin || false);
      } catch (error) {
        if (error.response) {
          console.error(
            "Server Error:",
            error.response.status,
            error.response.data
          );
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;
  if (!isAuthenticated) return <Navigate to="/signin" />;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        <nav>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/api/admin/dashboard"
                end
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                Dashboard
              </NavLink>
            </li>
            {sections.map((item, index) => {
              return (
                <li>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? styles.activeLink : styles.navLink
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/servicerequests" element={<ServiceRequests />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route
            path="/verificationrequest"
            element={<VerificationRequest />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
