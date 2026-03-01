const authRoutes = require("./routes/authRoutes");
const express =require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MONGODB CONNECTED"))
.catch((err)=> console.log(err));

app.get("/",(req,res)=>{
    res.send("Locker Booking API Running");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});