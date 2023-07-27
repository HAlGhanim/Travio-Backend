const mongoose = require("mongoose");
const config = require("./config/keys");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_DB_URL);
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error trying to connect to DB", error);
  }
};

module.exports = connectDB;
