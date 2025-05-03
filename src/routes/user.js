const express = require("express");

const {
  fetchAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/", fetchAllUsers);

router.post("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;
