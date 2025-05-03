const mysql = require("mysql2");
const { createTables } = require("./tablecreation");
const env = require("dotenv").config();

// local
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'user_db',
// });


// aws EC2
const connection = mysql.createConnection({
  host: 'database-1.cx0yq6i0ksvv.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Uppilisrinivas',
  port: 3306,
  database: 'user_db'
});

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
