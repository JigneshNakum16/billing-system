import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    Cookies.remove("token");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Dashboard;
