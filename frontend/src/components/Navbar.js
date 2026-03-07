import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

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
          className={location.pathname === "/history" ? "active" : ""}
          onClick={() => navigate("/history")}
        >
          Booking History
        </button>

        {role === "admin" && (

          <button
            className={location.pathname === "/admin" ? "active" : ""}
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>

        )}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;