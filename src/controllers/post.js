const jwt = require("jsonwebtoken");

const Post = require("../models/post");

const createPost = async (req, res) => {

  const { title, content,token } = req.body;
  
  console.log(token);
  

  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = decoded.id;

    const post = await Post.create({
      title,
      content,
      createdBy: userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: post, 
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      limit: parseInt(imit),
      offset: (page - 1) * limit,
    });

    res.status(200).json({
      message: "Posts retrieved successfully",
      posts: posts.length > 0 ? posts : [],
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createPost,
  getPosts,
};
