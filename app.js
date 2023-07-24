const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const tripRoutes = require("./api/Trips/trip.routes");
const userRoutes = require("./api/Auth/auth.routes");
const config = require("./config/keys");
const passport = require("passport");
const path = require("path");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const connectDB = require("./database");

connectDB();

//declare var
const app = express();

//middlewares:
app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(morgan("dev"));

//passport
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

//routes
// app.use("/api/users", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);

//errorhandlers:
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});
