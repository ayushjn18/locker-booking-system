const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    locker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locker",
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    accessCode: {
        type: String,
        required: true
    },
    idType: {
        type: String
    },
    idNumber: {
        type: String
    },
    idImage: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "expired"],
        default: "active"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Booking", bookingSchema);