# Employee-Database 


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

**👇Click for video**
[![Demo](https://img.youtube.com/vi/408mvE4vbhM/0.jpg)](https://youtu.be/408mvE4vbhM)

## Table of contents

- [About the project](#About-the-project)
- [Installation](#Installation)
- [Tests](#Tests)
- [Schema](#Schema)
- [Seed](#Seed)
- [License](#License)
- [Questions](#Questions)

## About the project

 A database built in **MySQL** using inquirer npm package, node for the user to manage the company's employees.

## Installation
Run the following command in your terminal 
`npm start`

## Tests
Run the following command in your terminal
* `mysql -u root -p`
    * Enter your password to your MySql Workbench
* `source schema.sql`
* `source seed.sql`
>To exit mysql environment just type
`exit`
## Schema

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

  ## Seed

  Seed data is data that you populate the database with at the time it is created. Seeding is used to provide initial values for lookup lists, for demo purposes, proof of concepts etc.

## License 

This application is covered under the **MIT License**

## Questions

For any questions, please reach out to [valnimirenco@gmail.com]()
[https://github.com/valiant87]()