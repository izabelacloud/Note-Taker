//require modules
const express = require('express');
const fs = require('fs');
const path = require('path'); 

//represents PORT to any route or directly to 3001
const PORT = process.env.PORT || 3001; 

//instantiate the server
const app = express(); 

// parse incoming string or array data
app.use(express.urlencoded ( { extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware for public files
app.use(express.static('public')); 

// request data 
const { notes } = require('./db/db.json');


function createNewNote (body, notesArray) {
    const note = body; 
    notesArray.push(note); 
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        // converting JS array to JSON 
        JSON.stringify({ notes : notesArray }, null, 2)
    
    );
    // return finished code to post route for response
    return note; 
}


//function to validate the notes
function validateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false; 
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    if (!note.id || typeof note.id !== "number") {
        return false;
      }

    return true;   
}




//get request to get all the notes and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json(notes);
    // console.log(notes)
});


//post request to server to accept data to be used or stored server-side
app.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be 
    req.body.id = notes.length.toString(); 

    // if any data in req.body is incorrect, send error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.'); 
    } else {
    // add note to json file and notes array in this function 
    const note = createNewNote(req.body, notes); 

    res.json(note); 
    }
});


//route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    });



//route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });



// listener method to our servers 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});