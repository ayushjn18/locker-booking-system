const cron = require("node-cron");
const Booking = require("../models/Booking");
const Locker = require("../models/Locker");

const startCronJobs = () => {
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();

            const expiredBookings = await Booking.find({
                endTime: { $lte: now },
                status: "active"
            });

            for (const booking of expiredBookings) {
                booking.status = "expired";
                await booking.save();

                await Locker.findByIdAndUpdate(
                    booking.locker,
                    {
                        status: "available",
                        currentBooking: null
                    }
                );

                console.log(`Locker ${booking.locker} unlocked due to expiry`);
            }

        } catch (error) {
            console.error("Cron job error:", error);
        }
    });
};

module.exports = startCronJobs;