const Post = require("../models/post");
const User = require("../models/user");

const createTables = async () => {
  try {
    await User.sync({ alter: true, force: false });
    console.log("User table created successfully");
  } catch (error) {
    console.error("Error creating User table:", error);
  }

  try {
    await Post.sync({ alter: true, force: false });
    console.log("Post table created successfully");
  } catch (error) {
    console.error("Error creating Post table:", error);
  }
};

module.exports = {
  createTables,
};
