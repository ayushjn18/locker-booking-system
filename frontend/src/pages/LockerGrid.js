import React, { useEffect, useState } from "react";
import API from "../services/api";

const LockerGrid = () => {

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

  const handleBooking = async () => {

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("lockerId", selectedLocker._id);
      formData.append("durationHours", durationHours);
      formData.append("idType", idType);
      formData.append("idNumber", idNumber);
      formData.append("idImage", idImage);

      const res = await API.post("/bookings", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Locker booked! Access Code: " + res.data.accessCode);

      fetchLockers();
      setSelectedLocker(null);

    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Locker Grid</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 60px)",
          gap: "10px"
        }}
      >

        {lockers.map((locker) => (

          <div
            key={locker._id}
            onClick={() => setSelectedLocker(locker)}
            style={{
              width: "60px",
              height: "60px",
              backgroundColor:
                selectedLocker?._id === locker._id
                  ? "yellow"
                  : locker.status === "available"
                  ? "green"
                  : "red",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >

            {locker.lockerNumber}

          </div>

        ))}

      </div>


      {selectedLocker && (

        <div style={{ marginTop: "30px" }}>

          <h3>Book Locker #{selectedLocker.lockerNumber}</h3>

          <input
            type="number"
            placeholder="Duration (hours)"
            value={durationHours}
            onChange={(e) => setDurationHours(e.target.value)}
          />

          <br /><br />

          <input
            type="text"
            placeholder="ID Type (Aadhaar / PAN)"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          />

          <br /><br />

          <input
            type="text"
            placeholder="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />

          <br /><br />

          <input
            type="file"
            onChange={(e) => setIdImage(e.target.files[0])}
          />

          <br /><br />

          <button onClick={handleBooking}>
            Book Locker
          </button>

        </div>

      )}

    </div>

  );

};

export default LockerGrid;