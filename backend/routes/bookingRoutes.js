const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Locker = require("../models/Locker");
const authMiddleware = require("../middleware/authMiddleware");

// Book a locker
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { lockerId, durationHours } = req.body;

        // Find locker
        const locker = await Locker.findOneAndUpdate(
        { _id: lockerId, status: "available" },
        { status: "booked" },
        { new: true }
        );

        if (!locker) {
        return res.status(400).json({ message: "Locker not available or already booked" });
        }

        // Generate 6 digit access code
        const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

        // Create booking
        const booking = new Booking({
            user: req.user.id,
            locker: locker._id,
            startTime,
            endTime,
            accessCode
        });

        await booking.save();

        // Update locker
        locker.status = "booked";
        locker.currentBooking = booking._id;
        await locker.save();

        res.status(201).json({
            message: "Locker booked successfully",
            accessCode,
            booking
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;