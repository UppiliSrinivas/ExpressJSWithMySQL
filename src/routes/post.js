const express = require("express");
const { createPost, getPosts } = require("../controllers/post");

const router = express.Router();

router.get("/", getPosts);

router.post("/create", createPost);

router.post("/update:id", createPost);

router.post("/delete:id", createPost);

module.exports = router;
