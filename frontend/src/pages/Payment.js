import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

const Payment = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state?.bookingData;

  const [timeLeft,setTimeLeft] = useState(300); // 5 minutes

  useEffect(()=>{

    const timer = setInterval(()=>{

      setTimeLeft(prev => prev-1);

    },1000);

    return ()=>clearInterval(timer);

  },[]);

  const minutes = Math.floor(timeLeft/60);
  const seconds = timeLeft % 60;

  const handlePayment = async ()=>{

  try{

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("lockerId", bookingData.lockerId);
    formData.append("durationHours", bookingData.durationHours);
    formData.append("idType", bookingData.idType);
    formData.append("idNumber", bookingData.idNumber);
    formData.append("idImage", bookingData.idImage);

    const res = await API.post("/bookings", formData, {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
    });

    navigate("/success",{
      state:{
        accessCode: res.data.accessCode,
        lockerNumber: bookingData.lockerNumber
      }
    });

  }catch(error){

    console.log(error);

  }

};

  return (

    <div className="payment-container">

      <div className="payment-left">

        <h3>Payment options</h3>

        <div className="payment-option active">
          Pay by any UPI App
        </div>

        <div className="payment-option">
          Debit / Credit Card
        </div>

        <div className="payment-option">
          Mobile Wallet
        </div>

        <div className="payment-option">
          Net Banking
        </div>

      </div>

      <div className="payment-right">

        <h2>Pay ₹{bookingData.amount}</h2>

        <p>Scan QR code to pay</p>

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SmartLockerPayment"
          alt="QR"
        />

        <p className="timer">

          Time Remaining: {minutes}:{seconds.toString().padStart(2,"0")}

        </p>

        <button onClick={handlePayment}>
          I Have Paid
        </button>

      </div>

    </div>

  );

};

export default Payment;