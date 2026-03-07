import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    if(password !== confirmPassword){

      toast.error("Passwords do not match");
      return;

    }

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      toast.success("Account created successfully");

      navigate("/login");

    }catch(error){

      toast.error("Registration failed");

    }

  };

  return(

    <div className="login-page">

      <div className="login-card">

        <h1 className="logo">Create Account</h1>
        <p className="subtitle">Smart Locker Booking System</p>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <div style={{position:"relative"}}>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            onClick={()=>setShowPassword(!showPassword)}
            style={{
              position:"absolute",
              right:"10px",
              top:"10px",
              cursor:"pointer"
            }}
          >
            👁
          </span>

        </div>

        <div style={{position:"relative"}}>

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <span
            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position:"absolute",
              right:"10px",
              top:"10px",
              cursor:"pointer"
            }}
          >
            👁
          </span>

        </div>

        <button onClick={handleRegister}>
          Register
        </button>

        <p className="register-link">
          Already have an account? 
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>

  )

}

export default Register;