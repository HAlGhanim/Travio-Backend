const express = require("express");
const { getAllTrips, createTrip, upadateTrip, deleteTrip } = require("./trip.controllers");
const Trip = require("../../models/Trip");
const uploader = require("../../middlewares/uploader");
const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
    try {
        const trip = await Trip.findById(tripId);
        if (!trip)
            return res.status(404).json({
                message: " no trip matches that ID!",
            });
        req.trip = trip;
        next();
    } catch (error) {
        next(error);
    }
});
router.get("/", getAllTrips);
router.post("/", uploader.single("tripImage"), createTrip);
router.put('/trips/:tripId', passport.authenticate('jwt', { session: false }), upadateTrip)
router.delete('/trips/:tripId', passport.authenticate('jwt', { session: false }), deleteTrip)



module.exports = router;
