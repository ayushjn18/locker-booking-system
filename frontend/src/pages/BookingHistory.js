import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const BookingHistory = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBookings(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div>

      <Navbar />

      <div className="history-container">

        <h2 className="history-title">My Bookings</h2>

        <div className="table-card">

          <table className="booking-table">

            <thead>
              <tr>
                <th>Locker</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Access Code</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr key={booking._id}>

                  <td>{booking.locker.lockerNumber}</td>

                  <td>
                    {new Date(booking.startTime).toLocaleString()}
                  </td>

                  <td>
                    {new Date(booking.endTime).toLocaleString()}
                  </td>

                  <td className="access-code">
                    {booking.accessCode}
                  </td>

                  <td>
                    <span className="status-badge">
                      {booking.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default BookingHistory;