import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingHistory from "./pages/BookingHistory";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";
import BookingSuccess from "./pages/BookingSuccess";
import BookLocker from "./pages/BookLocker";
import Home from "./pages/Home";

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard/>
    </ProtectedRoute>
  }
/>
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route path="/book-locker" element={<BookLocker/>}/>
<Route path="/payment" element={<Payment />} />
<Route
  path="/history"
  element={
    <ProtectedRoute>
      <BookingHistory />
    </ProtectedRoute>
  }
/>
<Route path="/success" element={<BookingSuccess/>}/>

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

    </BrowserRouter>

  );

}

export default App;