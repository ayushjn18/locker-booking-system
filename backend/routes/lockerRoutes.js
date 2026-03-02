const express = require("express");
const router = express.Router();
const Locker = require("../models/Locker");
const authMiddleware = require("../middleware/authMiddleware");

// Create 100 lockers (Seed Route)
router.post("/seed", authMiddleware, async (req, res) => {
    try {
        const existingLockers = await Locker.countDocuments();

        if (existingLockers > 0) {
            return res.json({ message: "Lockers already exist" });
        }

        const lockers = [];

        for (let i = 1; i <= 100; i++) {
            lockers.push({
                lockerNumber: i
            });
        }

        await Locker.insertMany(lockers);

        res.json({ message: "100 Lockers created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all lockers
router.get("/", authMiddleware, async (req, res) => {
    try {
        const lockers = await Locker.find().sort({ lockerNumber: 1 });
        res.json(lockers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;