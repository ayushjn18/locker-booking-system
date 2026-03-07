import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div className="navbar">

      <div className="nav-logo">
        Smart Locker
      </div>

      <div className="nav-buttons">

        <button
          className={location.pathname === "/dashboard" ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
  className={location.pathname === "/admin" ? "active" : ""}
  onClick={() => navigate("/admin")}
>
  Admin
</button>

        <button
          className={location.pathname === "/history" ? "active" : ""}
          onClick={() => navigate("/history")}
        >
          Booking History
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;