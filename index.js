var inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'members_db'
    },
    console.log(`Connected to the members_db database.`)
);

function init() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: [  "View All Employees",
                            "Add Employee",
                            "Update Employee Role",
                            "View All Roles",
                            "Add Role",
                            "View All Departments",
                            "Add Department",
                            "Quit"],
                name: 'start'
            }
        ])
        .then((answers) => {

            if (answers.start === "View All Employees") {

                /*
                const key_position_2 = "B.department_id";
                const key_2 = "C.id";
                const sql_2 = `
                SELECT B.id, B.title, C.dep_name, B.salary
                FROM role_table AS B
                JOIN department_table AS C
                ON ${key_position_2} = ${key_2}
                `;
                */
                const key_position = "A.role_id";
                const key = "B.id";
                const sql = `
                SELECT A.id, A.first_name, A.last_name, B.title, B.department_id, B.salary, A.manager_id
                FROM employee_table AS A
                JOIN role_table AS B
                ON ${key_position} = ${key}
                `;

                db.query(sql, (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    } else {
                        console.log('\n');
                        console.table(data);
                        init();
                    }
                });

            } else if (answers.start === "View All Roles") {

                const key_id = "role_table.department_id";
                const fill_id = "department_table.id";
                const sql = `
                SELECT role_table.id, role_table.title, role_table.salary, department_table.dep_name, ${fill_id}
                FROM department_table 
                JOIN role_table
                ON ${fill_id} = ${key_id}
                `;

                db.query(sql, (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    } else {
                        console.log('\n');
                        console.table(data);
                        init();
                    }
                });

            } else if (answers.start === "View All Departments") {

                db.query("SELECT * from department_table", (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    } else {
                        console.log('\n');
                        console.table(data);
                        init();
                    }
                });

            } else if (answers.start !== "Quit") {
                init();
            }
            // writeToFile(data.fileName, generate(data))
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

// input
// query
// choice

// Function call to initialize app
init();