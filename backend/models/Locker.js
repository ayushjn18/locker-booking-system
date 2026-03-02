const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema(
{
    lockerNumber: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["available", "booked"],
        default: "available"
    },
    currentBooking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default: null
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Locker", lockerSchema);