import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {

      toast.error("Invalid email or password");

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1 className="logo">Smart Locker</h1>
        <p className="subtitle">Secure Locker Booking System</p>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>

      </div>

    </div>

  );
};

export default Login;