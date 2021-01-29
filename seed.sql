INSERT INTO departament (name)
VALUES ("Management"), ("IT"), ("Sales");

INSERT INTO role (tile, salary, departament_id)
VALUES("Manager", "125000.00","1"), ("Senior Developer", "110000.00", "2"), ("System Administrator", "90000.00", "3"), ("Product Development", "65100.00", "1"), ("Junior Developer", "85000.00", "2"), ("Inter", "45000.00", "3");

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Douglas", "Crockford", "1"), ("Bill", "Murray", "2"), ("Jason", "ObjectNotation", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Peter", "Rabbit", "4", "1"), ("Bill", "Windows", "5", "2"), ("Steeve", "Apples", "6", "3");