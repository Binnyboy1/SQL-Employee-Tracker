DROP DATABASE IF EXISTS members_db;
CREATE DATABASE members_db;

USE members_db;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,

  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL

  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,

  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL

  PRIMARY KEY (id)

  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);
