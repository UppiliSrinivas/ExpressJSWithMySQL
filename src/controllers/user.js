const jwt = require("jsonwebtoken");

const User = require("../models/user");

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    if (!users || users.length === 0)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const token = req.headers["authorization"];

  console.log("Token:", token, "ID:", id, "Name:", name);
  

  try {

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ name });

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user.id,
        name: user.name
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const token = req.headers["authorization"];

  try {

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  fetchAllUsers,
  updateUser,
  deleteUser,
};
