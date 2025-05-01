const express = require("express");
const { createPost, getPosts } = require("../controllers/post");

const router = express.Router();

//register function
router.get("/", getPosts);

//login function
router.post("/create", createPost);

module.exports = router;
