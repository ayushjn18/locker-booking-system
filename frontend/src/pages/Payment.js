import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

const Payment = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { bookingData } = location.state || {};

  const handlePayment = async () => {

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("lockerId", bookingData.lockerId);
      formData.append("durationHours", bookingData.durationHours);
      formData.append("idType", bookingData.idType);
      formData.append("idNumber", bookingData.idNumber);
      formData.append("idImage", bookingData.idImage);

      const res = await API.post("/bookings", formData, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      navigate("/success",{
  state:{
    accessCode: res.data.accessCode,
    lockerNumber: bookingData.lockerNumber
  }
});

    } catch(error){

      toast.error("Payment failed");

    }

  };

  return (

    <div className="payment-page">

      <div className="payment-card">

        <h2>Locker Booking Payment</h2>

        <p>Amount to Pay</p>

        <h1>₹100</h1>

        <button onClick={handlePayment}>
          Pay Now
        </button>

      </div>

    </div>

  );

};

export default Payment;