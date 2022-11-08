/*

const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
// >> Learned from: 11-Express -> 17-Ins_POST-Fetch
const uuid = require('./helpers/uuid');
// 2 Custom functions grabbed from previous lessons
// >> Learned from: 11-Express -> 21-Ins_Modular-Routing
const fsCmds = require('./helpers/fsCmds');

// const database = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage ✅-Working
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page ✅-Working
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route that will return the content of our `db.json` file ✅-Working
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function(err, data){
        if (err) {
            // Catch errors
            console.error(err);
        } else {
            // Display the file content
            res.status(201).json(JSON.parse(data));
        }
    });
});

// Post Route that will
//  * recieve a new note to save ✅-Working
//  * give new note a unique id ✅-Working
//  * add it to the db.json file ✅-Working
//  * return the new note to the client ✅-Working
app.post('/api/notes', (req, res) => {
    // Grabbing data
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuid()
    };

    // Write the string to a file
    fsCmds.readAndAppend(newNote, './db/db.json');

    // Create a response so we can show the user a confirmation
    const response = {
        status: 'success',
        body: newNote
    };

    // Output a response
    res.status(201).json(response);
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    console.log(path.join(__dirname, '/public/index.html'));
});

*/