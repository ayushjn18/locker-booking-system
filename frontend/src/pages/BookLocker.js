import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

const BookLocker = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { locker } = location.state || {};

  const [durationHours, setDurationHours] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idImage, setIdImage] = useState(null);

  const pricePerHour = 50;
  const totalAmount = durationHours * pricePerHour;

  const handlePayment = async () => {

    if (!durationHours) {
      toast.error("Duration is required");
      return;
    }

    if (!idType) {
      toast.error("Please select ID type");
      return;
    }

    if (!idNumber) {
      toast.error("ID number is required");
      return;
    }

    if (!idImage) {
      toast.error("Please upload ID proof");
      return;
    }

    try {

      const orderRes = await API.post(
        "/payment/create-order",
        {
          amount: totalAmount
        }
      );

      const options = {

        key: "rzp_test_T0kcpPQbl5pWfJ",

        amount: orderRes.data.amount,

        currency: orderRes.data.currency,

        name: "AJ Smart Locker",

        description: `Locker Booking #${locker.lockerNumber}`,

        order_id: orderRes.data.id,

        handler: async function (response) {

          try {

            console.log("Payment Success");
            console.log(response);

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("lockerId", locker._id);
            formData.append("durationHours", durationHours);
            formData.append("idType", idType);
            formData.append("idNumber", idNumber);
            formData.append("idImage", idImage);

            const res = await API.post(
              "/bookings",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data"
                }
              }
            );

            navigate("/success", {
              state: {
                accessCode: res.data.accessCode,
                lockerNumber: locker.lockerNumber
              }
            });

          } catch (error) {

            console.log(error);
            toast.error("Booking Failed");

          }

        },

        prefill: {

          name: "Locker User",
          email: "user@example.com"

        },

        theme: {

          color: "#3399cc"

        }

      };

      const rzp = new window.Razorpay(options);

      rzp.open();

    } catch (error) {

      console.log(error);
      toast.error("Payment Initialization Failed");

    }

  };

  return (

    <div className="payment-page">

      <div className="payment-card">

        <h2>
          Book Locker #{locker?.lockerNumber}
        </h2>

        <input
          type="number"
          placeholder="Duration (hours)"
          value={durationHours}
          onChange={(e) =>
            setDurationHours(e.target.value)
          }
        />

        {durationHours && (

          <p
            style={{
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            Total Price: ₹{totalAmount}
          </p>

        )}

        <select
          value={idType}
          onChange={(e) =>
            setIdType(e.target.value)
          }
        >

          <option value="">
            Select ID Type
          </option>

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
          onChange={(e) =>
            setIdNumber(e.target.value)
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setIdImage(e.target.files[0])
          }
        />

        <button onClick={handlePayment}>
          Pay ₹{totalAmount || 0} & Book Locker
        </button>

      </div>

    </div>

  );

};

export default BookLocker;