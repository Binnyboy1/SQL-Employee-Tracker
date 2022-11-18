DROP DATABASE IF EXISTS members_db;
CREATE DATABASE members_db;

USE members_db;

CREATE TABLE department_table (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE role_table (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,

    FOREIGN KEY (department_id)
    REFERENCES department_table(id)
    ON DELETE SET null
);

CREATE TABLE employee_table (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,

    FOREIGN KEY (role_id)
    REFERENCES role_table(id)
    ON DELETE SET null,
    
    FOREIGN KEY (manager_id)
    REFERENCES employee_table(id)
    ON DELETE SET NULL
);