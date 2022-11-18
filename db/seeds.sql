INSERT INTO department_table (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role_table (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null);