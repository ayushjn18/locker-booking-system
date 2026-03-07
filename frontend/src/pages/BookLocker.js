import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const BookLocker = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { locker } = location.state || {};

  const [durationHours,setDurationHours] = useState("");
  const pricePerHour = 50;

  const totalAmount = durationHours * pricePerHour;
  const [idType,setIdType] = useState("");
  const [idNumber,setIdNumber] = useState("");
  const [idImage,setIdImage] = useState(null);
  
const handleNext = () => {

  if(!durationHours){
    toast.error("Duration is required");
    return;
  }

  if(!idType){
    toast.error("Please select ID type");
    return;
  }

  if(!idNumber){
    toast.error("ID number is required");
    return;
  }

  if(!idImage){
    toast.error("Please upload ID proof");
    return;
  }

  const bookingData = {
    lockerId: locker._id,
    lockerNumber: locker.lockerNumber,
    durationHours,
    idType,
    idNumber,
    idImage,
    amount:totalAmount
  };

  navigate("/payment",{state:{bookingData}});

};

  return(

    <div className="payment-page">

      <div className="payment-card">

        <h2>Book Locker #{locker?.lockerNumber}</h2>

        <input
          type="number"
          placeholder="Duration (hours)"
          onChange={(e)=>setDurationHours(e.target.value)}
        />

        {durationHours && (

        <p style={{fontWeight:"bold",marginTop:"10px"}}>

        Total Price: ₹{totalAmount}

        </p>

        )}

        <select
          onChange={(e)=>setIdType(e.target.value)}
        >

          <option value="">Select ID Type</option>
          <option value="Aadhaar Card">Aadhaar Card</option>
          <option value="PAN Card">PAN Card</option>
          <option value="Driving Licence">Driving Licence</option>
          <option value="Passport">Passport</option>

        </select>

        <input
          type="text"
          placeholder="ID Number"
          onChange={(e)=>setIdNumber(e.target.value)}
        />

        <input
          type="file"
          onChange={(e)=>setIdImage(e.target.files[0])}
        />

        <button onClick={handleNext}>
          Proceed to Payment
        </button>

      </div>

    </div>

  )

}

export default BookLocker;