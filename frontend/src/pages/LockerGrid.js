import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const LockerGrid = () => {

  const [lockers, setLockers] = useState([]);
  const navigate = useNavigate();

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

  const handleLockerClick = (locker) => {

    if(locker.status === "booked"){
      return;
    }

    navigate("/book-locker", {
      state: { locker }
    });

  };

  return (

    <div className="locker-container">

      <h2 className="locker-title">Locker Dashboard</h2>

      <div className="legend">

        <div className="legend-item available">
          Available
        </div>

        <div className="legend-item booked">
          Booked
        </div>

        <div className="legend-item selected">
          Selected
        </div>

      </div>

      <div className="locker-grid">

        {lockers.map((locker) => (

          <div
            key={locker._id}
            onClick={() => handleLockerClick(locker)}
            className={`locker-box 
              ${locker.status === "booked" ? "booked" : ""}
            `}
          >

            {locker.lockerNumber}

          </div>

        ))}

      </div>

    </div>

  );

};

export default LockerGrid;