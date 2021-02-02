const mysql = require("mysql");
const inquirer = require("inquirer");
// Adds console.table method for convenience
const cTable = require("console.table");
require("dotenv").config()

// DB connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // store this in .env file
    password: process.env.DB_PASSWORD,
    database: "employees_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    runSearch();
});

// Prompt the user for input using inquirer

function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Choose between the given choices",
        choices: [
            "View employees",
            "View roles",
            "View departments",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "Add department",
            "Remove department",
            "Add role",
            "Remove role",
            "Exit"
        ]

    })
        .then(function (answer) {
            switch (answer.action) {
                case "View employees":
                    var query = "SELECT * FROM employee";
                    connection.query(query, function (err, res) {
                        console.table(res);
                        runSearch();
                    });

                    break;

                case "View roles":
                    employeeRole();
                    break;


                case "View departments":
                    var query = "SELECT * FROM department";
                    connection.query(query, function (err, res) {
                        console.table(res)
                        runSearch();
                    });

                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Remove employee":
                    removeEmployee()
                    break;


                case "Update employee role":
                    updateEmployee();
                    break;


                case "Add department":
                    addDepartment();
                    break;


                case "Remove department":
                    removeDepartment();
                    break;


                case "Add role":
                    addRole();
                    break;


                case "Remove role":
                    removeRole();
                    break;


                case "Exit":
                    console.log("Ba bye!")
                    connection.end();

                    break;

            }
        });
}

function employeeRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        console.table(res)
        runSearch();
    });
}

function addEmployee() {
    inquirer.prompt([{
        name: "first_name",
        type: "input",
        message: "Enter first name"
    }, {
        name: "last_name",
        type: "input",
        message: "Enter last name"
    }, {
        name: "role_id",
        type: "number",
        message: "Enter role id number"
    }, {
        name: "manager_id",
        type: "input",
        message: "Enter manager id number"
    }])
        .then(function (answer) {
            var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
            var values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
            connection.query(query, values, function (err, res) {
                var check = "SELECT * FROM employee";
                connection.query(check, function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });
        });
};

function removeEmployee() {
    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, res) {
        if (err) throw error;
        const array1 = res.map(array => {
            var object = {
                name: `${array.first_name} ${array.last_name}`,
                value: array.id
            }
            return object
        });
        inquirer.prompt({
            name: "delete",
            type: "list",
            message: "Choose an employee to delete",
            choices: array1
        })
            .then(function (response) {
                connection.query("DELETE FROM employee WHERE id=?;", [response.delete], function (err, res) {
                    if (err) throw err;
                    runSearch();
                });

            });
    });
};

function updateEmployee() {
    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, res) {
        if (err) throw err;
        const array1 = res.map(array => {
            var object = {
                name: `${array.first_name} ${array.last_name}`,
                value: array.id
            }
            return object
        });
        inquirer.prompt({
            name: "update",
            type: "list",
            message: "Choose an employee to update",
            choices: array1
        })
            .then(function (response) {
                connection.query("SELECT id, title FROM role;", function (err, res) {
                    if (err) throw err;
                    const map2 = res.map(array => {
                        var object = {
                            name: array.title,
                            value: array.id
                        }
                        return object
                    });
                    inquirer.prompt({
                        name: "roleUpdate",
                        type: "list",
                        message: "What is the employee's new role?",
                        choices: map2
                    }).then(function (answer) {
                        let values = [answer.roleUpdate, response.update];
                        connection.query("UPDATE employee SET role_id = ? WHERE id=?", values, function (err, res) {
                            if (err) throw err;

                            connection.query("SELECT * FROM employee WHERE id=?", response.update, function (err, res) {
                                if (err) throw err;
                                console.table(res);
                                runSearch();
                            }
                            );
                        })
                    })
                })
            })
    });
};

function addDepartment() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Enter department name"
    }])
        .then(function (answer) {
            var query = `INSERT INTO department (name) VALUES (?)`;
            var values = [answer.name];
            connection.query(query, values, function (err, res) {
                var check = "SELECT * FROM department";
                connection.query(check, function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });
        })
};
function removeDepartment() {
    connection.query("SELECT id, name FROM department;", function (err, res) {
        if (err) throw err;
        const array1 = res.map(array => {
            var object = {
                name: `${array.name}`,
                value: array.id
            }
            return object
        });
        inquirer.prompt({
            name: "delete",
            type: "list",
            message: "Choose an department to delete",
            choices: array1
        })
            .then(function (response) {
                connection.query("DELETE FROM department WHERE id=?;", [response.delete], function (err, res) {
                    if (err) throw err;
                    runSearch();
                }
                );
            })
    })
};

function addRole() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "Enter role title"
    }, {
        name: "salary",
        type: "number",
        message: "Enter yearly salary amount"
    }, {
        name: "department_id",
        type: "number",
        message: "Enter department id number"
    }])
        .then(function (answer) {
            var query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
            var values = [answer.title, answer.salary, answer.department_id];
            connection.query(query, values, function (err, res) {
                var check = "SELECT * FROM role";
                connection.query(check, function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });
        })
};
function removeRole() {
    connection.query("SELECT id, title FROM role;", function (err, res) {
        if (err) throw err;
        const array1 = res.map(array => {
            var object = {
                name: `${array.title}`,
                value: array.id
            }
            return object
        });
        inquirer
            .prompt({
                name: "delete",
                type: "list",
                message: "Choose an department to delete",
                choices: array1
            })
            .then(function (response) {
                connection.query("DELETE FROM role WHERE id=?;", [response.delete], function (err, res) {
                    if (err) throw err;
                    runSearch();
                }
                );
            })
    })
};
