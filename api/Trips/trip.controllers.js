const Trip = require("../../models/Trip");

exports.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate("createdBy", "username");
    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    req.body.createdBy = req.user._id;
    // req.body.createdByUsername = req.user.username;

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

exports.getTripById = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId).populate("createdBy", "username");
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

exports.upadateTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    if (req.file) {
      req.body.tripImage = `${req.file.path}`;
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      res.status(404).json({ message: "trip not found" });
    } else {
      if (req.user._id.equals(trip.createdBy)) {
        await trip.updateOne(req.body);
        return res.status(200).json({ message: "trip is updated" });
      }
      return res
        .status(401)
        .json({ message: "you are not the creater of this trip" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    if (trip) {
      if (req.user._id.equals(trip.createdBy)) {
        await trip.deleteOne();
        return res.status(204).json({ message: "trip is deleted" });
      }
      return res
        .status(401)
        .json({ message: " you're not the creater of this trip" });
    }
  } catch (error) {
    next(error);
  }
};
