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

                db.query("SELECT * from employee_table", (err, data) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
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
                        res.status(500).json({ error: err.message });
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
                        res.status(500).json({ error: err.message });
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