const express = require("express");

const env = require("dotenv").config();

const userRoutes = require("./src/routes/user");

const authRoutes = require("./src/routes/auth");

const postRoutes = require("./src/routes/post");

const { connectMySQL } = require("./src/config/dbconnection");

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/post", postRoutes);

// Simple Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectMySQL();

app.listen(3306, () => {
  console.log(
    `Server is running on port 3306 http://localhost:3306`
  );
});
