const express = require("express");
const {
  login,
  register,
  forgotpassword,
  resetPassword,
} = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/forgot-password", forgotpassword);

router.post("/reset-password", resetPassword);

module.exports = router;
