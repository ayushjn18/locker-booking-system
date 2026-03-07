import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const LockerGrid = () => {

  const navigate = useNavigate();

  const [lockers, setLockers] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);

  const [durationHours, setDurationHours] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idImage, setIdImage] = useState(null);

  useEffect(() => {
    fetchLockers();
  }, []);

  const fetchLockers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/lockers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLockers(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  // NEW BOOKING FLOW (redirect to payment)

  const handleBooking = () => {

    const bookingData = {
      lockerId: selectedLocker._id,
      lockerNumber: selectedLocker.lockerNumber,
      durationHours,
      idType,
      idNumber,
      idImage
    };

    navigate("/payment", { state: { bookingData } });

  };

  return (

    <div className="locker-container">

      <h2 className="locker-title">Locker Dashboard</h2>

      <div className="legend">

        <div className="legend-item available">Available</div>

        <div className="legend-item booked">Booked</div>

        <div className="legend-item selected">Selected</div>

      </div>

      <div className="locker-grid">

        {lockers.map((locker) => (

          <div
            key={locker._id}
            onClick={() => setSelectedLocker(locker)}
            className={`locker-box 
            ${locker.status === "booked" ? "booked" : ""}
            ${selectedLocker?._id === locker._id ? "selected" : ""}`}
          >

            {locker.lockerNumber}

          </div>

        ))}

      </div>

      {selectedLocker && (

        <div className="booking-form">

          <h3>Book Locker #{selectedLocker.lockerNumber}</h3>

          <input
            type="number"
            placeholder="Duration (hours)"
            value={durationHours}
            onChange={(e) => setDurationHours(e.target.value)}
          />

          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >

            <option value="">Select ID Type</option>

            <option value="Aadhaar Card">
              Aadhaar Card
            </option>

            <option value="PAN Card">
              PAN Card
            </option>

            <option value="Driving Licence">
              Driving Licence
            </option>

            <option value="Passport">
              Passport
            </option>

          </select>

          <input
            type="text"
            placeholder="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setIdImage(e.target.files[0])}
          />

          <button onClick={handleBooking}>
            Proceed to Payment
          </button>

        </div>

      )}

    </div>

  );

};

export default LockerGrid;