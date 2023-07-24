const Trip = require("../../models/Trip");

exports.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.tripImage = `${req.file.path}`;
    }
    const existingTrip = await Trip.findOne({
      title: req.body.title,
    });

    if (existingTrip) {
      return res.status(400).json({ messge: "trip alredy exists" });
    }

    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};
