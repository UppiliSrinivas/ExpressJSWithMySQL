const express = require("express");

const cors = require('cors');

const env = require("dotenv").config();


const userRoutes = require("./src/routes/user");

const authRoutes = require("./src/routes/auth");

const postRoutes = require("./src/routes/post");

const { connectMySQL } = require("./src/config/dbconnection");

const app = express();

app.use(cors());  // Enables CORS for all routes

app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/post", postRoutes);

// Simple Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectMySQL();

app.listen(process.env.DB_PORT, () => {
  console.log(
    `Server is running on port ${process.env.DB_PORT} http://${process.env.DB_HOST}:${process.env.DB_PORT}`
  );
});
