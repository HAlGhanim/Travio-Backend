const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        username: { type: String, unique: true },
        password: { type: String, required: true },
        userImage: {
            type: String,
            //  default: "/",
        },
        bio: { type: String, required: true },

        // relations
        trips: [{ type: Schema.Types.ObjectId, ref: "Trips" }],
        // countries: [{ type: Schema.Types.ObjectId, ref: "Country" }],
    },
    { timestamps: true }
);

module.exports = model("User", userSchema);
