const User = require("../../models/User");
const generateToken = require("../../utils/auth/generateToken");

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return next(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.signup = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.file.path.replace("\\", "/")}`;
    }
    console.log(req.body);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-__v -password -email");
    return res.status(200).json(users);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!req.user._id.equals(req.foundUser._id))
      return next({
        status: 400,
        message: "you dont have the permission to preform this task!",
      });

    const newUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    console.log({ newUser, old: req.user });
    console.log(req.body);
    return res.status(204).end();
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.user._id.equals(req.foundUser._id))
      return next({
        status: 400,
        message: "you dont have the permission to preform this task!",
      });
    await User.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};
exports.getProfile = async (req, res, next) => {
  try {
    console.log(req.foundUser);
    const profile = await User.findById(req.foundUser._id)
      .select("-__v -password")
      .populate("trips");
    console.log(profile);
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
