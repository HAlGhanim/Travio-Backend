const express = require("express");
const {
  updateUser,
  deleteUser,
  fetchUser,
  signin,
  signup,
  getUsers,
  getProfile,
  getMyProfile,
} = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const { hashing } = require("../../middlewares/password");
const {
  FieldValidation,
  inputValidator,
  passwordValidator,
  emailValidator,
} = require("../../middlewares/userValidation");
const upload = require("../../middlewares/uploader");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.foundUser = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getUsers);
router.get("/profile/:userId", getProfile);
// router.get(
//   "/me",
//   passport.authenticate("jwt", { session: false }),
//   getMyProfile
// );
router.post(
  "/signup",
  upload.single("image"),
  inputValidator([...emailValidator, ...passwordValidator], true),
  FieldValidation,
  hashing,
  signup
);

router.put(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  inputValidator([...emailValidator, ...passwordValidator], false),
  FieldValidation,
  upload.single("image"),

  updateUser
);
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
