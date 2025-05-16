const mysql = require("mysql2");
const { createTables } = require("./tablecreation");
const env = require("dotenv").config();

// local
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// aws EC2
// const connection = mysql.createConnection({
//   host: 'database-1.cx0yq6i0ksvv.eu-north-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'Uppilisrinivas',
//   port: 3306,
//   database: 'user_db'
// });

const connectMySQL = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL database:", err);
      return;
    }
    console.log("Connected to MySQL database");
    createTables(); // Call the function to create tables
    // You can also check if the tables exist and create them if they don't
  });
};

module.exports = {
  connection,
  connectMySQL,
};
