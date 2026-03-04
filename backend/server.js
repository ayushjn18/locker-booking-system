const authRoutes = require("./routes/authRoutes");
const express =require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const lockerRoutes = require("./routes/lockerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const startCronJobs = require("./utils/cronJobs");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
app.use("/api/lockers", lockerRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    startCronJobs();
})
.catch((err) => console.log(err));

app.get("/",(req,res)=>{
    res.send("Locker Booking API Running");
});

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        userId: req.user.id
    });
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});