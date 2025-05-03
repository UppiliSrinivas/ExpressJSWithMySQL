const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const User = require("../models/user");

//login function
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: `${email} not found` });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser)
      return res.status(409).json({ message: `${email} already exists` });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const forgotpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: `${email} not found` });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "uppilisrinivasanecs@gmail.com",
        pass: "wxby zgiu jilf vpzs",
      },
    });

    const mailOptions = {
      from: "uppilisrinivasanecs@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: http://localhost:3031/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      message: "Password reset token sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    User.update({ password: hashedPassword }, { where: { id: decoded.id } });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  login,
  register,
  forgotpassword,
  resetPassword,
};
