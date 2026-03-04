const express = require("express");
const router = express.Router();

const Locker = require("../models/Locker");
const Booking = require("../models/Booking");
const User = require("../models/User");

router.get("/stats", async (req, res) => {
    try {

        const totalLockers = await Locker.countDocuments();

        const availableLockers = await Locker.countDocuments({
            status: "available"
        });

        const bookedLockers = await Locker.countDocuments({
            status: "booked"
        });

        const totalBookings = await Booking.countDocuments();

        const activeBookings = await Booking.countDocuments({
            status: "active"
        });

        const expiredBookings = await Booking.countDocuments({
            status: "expired"
        });

        const totalUsers = await User.countDocuments();

        res.json({
            totalLockers,
            availableLockers,
            bookedLockers,
            totalBookings,
            activeBookings,
            expiredBookings,
            totalUsers
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;