import LockerGrid from "./LockerGrid";
import Navbar from "../components/Navbar";

const Dashboard = () => {

  return (
    <div>

      <Navbar />

      <div style={{ padding: "20px" }}>
        <LockerGrid />
      </div>

    </div>
  );

};

export default Dashboard;