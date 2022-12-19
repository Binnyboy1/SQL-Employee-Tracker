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
                // learned from https://www.programiz.com/sql/inner-join 
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
                ON ${key_id} = ${fill_id}
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

            } else if (answers.start === "Add Employee") {

                db.query("SELECT * FROM role_table", (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    } else {
                        const data_role = data.map(function(item){return item.title;});
                        // learned from https://stackoverflow.com/questions/7172277/how-to-select-a-particular-field-from-javascript-array 

                        var dict = {};
                        for (var i = 0; i < data.length; i++) {
                            dict[data[i].title] = data[i].id;
                        }

                        db.query("SELECT CONCAT(A.first_name, ' ', A.last_name) AS full_name, A.id FROM employee_table AS A", (err, data2) => {
                            if (err) {
                                console.log(err.message);
                                return;
                            } else {
                                const data_manager = data2.map(function(item){return item.full_name;});

                                var dict2 = {};
                                for (var i = 0; i < data2.length; i++) {
                                    dict2[data2[i].full_name] = data2[i].id;
                                }

                                inquirer
                                    .prompt([
                                        {
                                            type: 'input',
                                            message: `What is the employee's first name?`,
                                            name: 'fName'
                                        },
                                        {
                                            type: 'input',
                                            message: `What is the employee's last name?`,
                                            name: 'lName'
                                        },
                                        {
                                            type: 'list',
                                            message: `What is the employee's role?`,
                                            choices: data_role,
                                            name: 'role'
                                        },
                                        {
                                            type: 'list',
                                            message: `Who is the employee's manager?`,
                                            choices: [ "None", ...data_manager ],
                                            name: 'manager'
                                        }
                                    ])
                                    .then((answers2) => {
                                        
                                        var manager_val = `${dict2[answers2.manager]}`;
                                        if (dict2[answers2.manager] === undefined) {
                                            manager_val = null;
                                        }

                                        const sql = `
                                        INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
                                        VALUES ("${answers2.fName}", "${answers2.lName}", "${dict[answers2.role]}", ${manager_val})
                                        `;
                                        
                                        db.query(sql, (err, data) => {
                                            if (err) {
                                                console.log(err.message);
                                                return;
                                            } else {
                                                console.log(`Added ${answers2.fName} ${answers2.lName} to the database`);
                                                init();
                                            }
                                        });

                                    })
                                    .catch((error) => {
                                        if (error.isTtyError) {
                                            console.error("Prompt couldn't be rendered in the current environment");
                                        } else {
                                            console.error("Something else went wrong");
                                        }
                                    });

                            }
                        });
                    }
                });

            } else if (answers.start === "Add Role") {

                db.query("SELECT * FROM department_table", (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    } else {
                        const data_dep = data.map(function(item){return item.dep_name;});

                        var dict = {};
                        for (var i = 0; i < data.length; i++) {
                            dict[data[i].dep_name] = data[i].id;
                        }
                        console.log(dict);

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    message: `What is the name of the role?`,
                                    name: 'role'
                                },
                                {
                                    type: 'input',
                                    message: `What is the salary of the role?`,
                                    name: 'salary'
                                },
                                {
                                    type: 'list',
                                    message: `What department does the role belong to?`,
                                    choices: data_dep,
                                    name: 'dep'
                                }
                            ])
                            .then((answers) => {

                                const sql = `
                                INSERT INTO role_table (title, salary, department_id)
                                VALUES ("${answers.role}", "${answers.salary}", "${dict[answers.dep]}")
                                `;
                                
                                db.query(sql, (err, data2) => {
                                    if (err) {
                                        console.log(err.message);
                                        return;
                                    } else {
                                        console.log(`Added ${answers.role} to the database`);
                                        init();
                                    }
                                });

                            })
                            .catch((error) => {
                                if (error.isTtyError) {
                                    console.error("Prompt couldn't be rendered in the current environment");
                                } else {
                                    console.error("Something else went wrong");
                                }
                            });
                    }
                });

            } else if (answers.start === "Add Department") {
                init();
            } else if (answers.start === "Update Employee Role") {
                init();
            } else if (answers.start !== "Quit") {
                init();
            }
            // writeToFile(data.fileName, generate(data))
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.error("Prompt couldn't be rendered in the current environment");
            } else {
                console.error("Something else went wrong");
            }
        });
}

// input
// query
// choice

// Function call to initialize app
init();