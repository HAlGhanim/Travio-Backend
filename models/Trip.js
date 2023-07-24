const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const TripSchema = new Schema({
  title: { type: String, unique: true, required: true },
  tripImage: { type: String, required: true },
  description: { type: String, unique: false, required: true },

  // countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }]

  // create relations in here and in the other model
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Trip", TripSchema);
