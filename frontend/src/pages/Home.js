import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (

    <div className="home-container">

      <div className="home-overlay">

        <h1 className="home-title">
          HELLO!! WELCOME TO AJ SMART LOCKER BOOKING SYSTEM,BHOPAL
        </h1>

        <p className="home-subtitle">
          ARE YOU AN EXISTING USER OR NEW USER?
        </p>

        <div className="home-buttons">

          <button
            onClick={()=>navigate("/login")}
            className="home-btn login-btn"
          >
            Existing User
          </button>

          <button
            onClick={()=>navigate("/register")}
            className="home-btn register-btn"
          >
            New User
          </button>

        </div>

      </div>

    </div>

  );

};

export default Home;