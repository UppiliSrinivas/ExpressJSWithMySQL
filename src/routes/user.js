const express = require("express");
const {
  login,
  register,
  fetchAllUsers,
  forgotpassword,
  resetPassword,
} = require("../controllers/user");

const router = express.Router();

//login function
router.post("/login", login);

//register function
router.post("/register", register);

//get all users function
router.get("/", fetchAllUsers);

router.post("/forgot-password", forgotpassword);

router.post("/reset-password", resetPassword);

module.exports = router;
