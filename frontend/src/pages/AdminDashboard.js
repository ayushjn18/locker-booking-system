import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {

  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/admin/stats", {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      setStats(res.data);

    } catch(error){
      console.log(error);
    }

  };

  return (

    <div>

      <Navbar/>

      <div className="admin-container">

        <h2 className="admin-title">Admin Dashboard</h2>

        <div className="admin-grid">

          <div className="admin-card">
            <h3>Total Lockers</h3>
            <p>{stats.totalLockers}</p>
          </div>

          <div className="admin-card">
            <h3>Available Lockers</h3>
            <p>{stats.availableLockers}</p>
          </div>

          <div className="admin-card">
            <h3>Booked Lockers</h3>
            <p>{stats.bookedLockers}</p>
          </div>

          <div className="admin-card">
            <h3>Total Bookings</h3>
            <p>{stats.totalBookings}</p>
          </div>

          <div className="admin-card">
            <h3>Active Bookings</h3>
            <p>{stats.activeBookings}</p>
          </div>

          <div className="admin-card">
            <h3>Expired Bookings</h3>
            <p>{stats.expiredBookings}</p>
          </div>

          <div className="admin-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;