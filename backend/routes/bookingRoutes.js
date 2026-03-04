const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Locker = require("../models/Locker");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Book a locker
router.post("/", authMiddleware, upload.single("idImage"), async (req, res) => {
    try {
        const { lockerId, durationHours ,idType,idNumber} = req.body;

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

        const idImagePath = req.file ? req.file.path : null;

        // Create booking
        const booking = new Booking({
            user: req.user.id,
            locker: locker._id,
            startTime,
            endTime,
            accessCode,
            idType,
            idNumber,
            idImage: idImagePath
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

// Get user's bookings
router.get("/my-bookings", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("locker", "lockerNumber")
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Verify locker access code
router.post("/verify-access", async (req, res) => {
    try {
        const { lockerNumber, accessCode } = req.body;

        const booking = await Booking.findOne({
            accessCode: accessCode,
            status: "active"
        }).populate("locker");

        if (!booking) {
            return res.status(400).json({
                message: "Invalid access code or booking expired"
            });
        }

        if (booking.locker.lockerNumber !== lockerNumber) {
            return res.status(400).json({
                message: "Access code does not match this locker"
            });
        }

        res.json({
            message: "Locker opened successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;