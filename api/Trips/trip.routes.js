const express = require("express");
const {
  getAllTrips,
  createTrip,
  upadateTrip,
  deleteTrip,
  getTripById,
} = require("./trip.controllers");
const Trip = require("../../models/Trip");
const uploader = require("../../middlewares/uploader");
const passport = require("passport");
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

router.post(
  "/",
  uploader.single("tripImage"),
  passport.authenticate("jwt", { session: false }),
  createTrip
);

router.get("/:tripId", getTripById);
router.put(
  "/:tripId",
  uploader.single("tripImage"),
  passport.authenticate("jwt", { session: false }),
  upadateTrip
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);

module.exports = router;
