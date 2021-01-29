const mysql = require("mysql");
const inquirer = require("inquirer");
// This is a convenient for paiting the table in console for easier read
const cTable = require("console.table");

// DB connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    username: "root",
    // store this in .env file
    password: "password",
    database: "employees_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // run the start function after the connection is made to prompt the user
    runSearch();
});