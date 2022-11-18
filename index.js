var inquirer = require('inquirer');

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
            // Use user feedback for... whatever!!
            console.log(answers.start);
            /*
            answers.confirm === answers.password
                ? console.log('Success!')
                : console.log('You forgot your password already?!')
            */
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