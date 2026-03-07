import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const BookingSuccess = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { accessCode, lockerNumber } = location.state || {};

  return (

    <div>

      <Navbar/>

      <div className="success-container">

        <div className="success-card">

          <h1>✅ Booking Successful</h1>

          <p>Thank you for booking!</p>

          <h3>Locker Number: {lockerNumber}</h3>

          <h2 className="access-code">
            Access Code: {accessCode}
          </h2>

          <p>
            Now you can unlock your locker.
          </p>

          <button onClick={()=>navigate("/dashboard")}>
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>

  );

};

export default BookingSuccess;