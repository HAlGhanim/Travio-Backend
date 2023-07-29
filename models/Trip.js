const { model, Schema } = require("mongoose");

const TripSchema = new Schema({
  title: { type: String, unique: false, required: true },
  tripImage: { type: String, required: true },
  description: { type: String, unique: false, required: true },

  // locationName: { type: String },
  latitude: String,
  longitude: String,

  // create relations in here and in the other model
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Trip", TripSchema);
