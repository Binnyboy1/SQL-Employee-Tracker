var inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

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
            // console.log(answers.start);
            if (answers.start === "View All Employees") {
                db.query("SELECT * from employee_table", (err, data) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    } else {
                        const transformed = data.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
                        // learned from https://stackoverflow.com/questions/49618069/remove-index-from-console-table/53653088#53653088 
                        console.table(transformed);
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