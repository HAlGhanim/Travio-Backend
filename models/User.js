const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default: "media/1690210343852cool-profile.jpeg",
    },
    bio: { type: String },

    // relations
    trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    // countries: [{ type: Schema.Types.ObjectId, ref: "Country" }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
