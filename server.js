//require modules
const express = require('express');
const fs = require('fs');
const path = require('path'); 

//represents PORT to any route or directly to 3001
const PORT = process.env.PORT || 3009; 

//instantiate the server
const app = express(); 

// parse incoming string or array data
app.use(express.urlencoded ( { extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware for public files
app.use(express.static('public')); 
// app.use('/', express.static('public')); 

// request data 
const { notes } = require('./db/notes.json');


// function createNewNote (body, notesArray) {

//     // console.log(`I received body here of value: ${body}`);
//     // const notesFile  = fs.readFileSync(path.join(__dirname, './db/notes.json'))
//     // const notesArray = JSON.parse(notesFile)

//     const note = body; 
//     // TODO: noteArray DOES NOT HAVE CORRECT VALUE
//     notesArray.push(note); 
//     // const updatedNotesFile = JSON.stringify(notesArray)

//     fs.writeFileSync(
//         path.join(__dirname, './db/notes.json'), // updatedNotesFile
//         // converting JS array to JSON 
//         JSON.stringify({ notes : notesArray }, null, 2)
    
//     );
//     // return finished code to post route for response
//     console.log(note);
//     return note;

// }



// function createNewNote (body) {

//     console.log(`I received body here of value: ${body}`);
//     const notesFile  = fs.readFileSync(path.join(__dirname, './db/notes.json'))
//     const notesArray = JSON.parse(notesFile)

//     // const notesArray = []
//     const note = body; 
//     notesArray.push(note); 
//     const updatedNotesFile = JSON.stringify(notesArray)
//     fs.writeFileSync(
//         path.join(__dirname, './db/notes.json'),
//         // converting JS array to JSON 
//         // JSON.stringify({ notes : notesArray }, null, 2)
//         updatedNotesFile
    
//     );
//     // return finished code to post route for response
//     return note; 
// }


// function findById(id, animalsArray) {
//     const result = animalsArray.filter(animal => animal.id === id) [0];
//     return result; 
// }

//this kinda works
function createNewNote (body, notesArray) {
    const note = body; 
    notesArray.push(note); 

    // path to write file 
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({ notes : notesArray }, null, 2)
    );
    // return finished code to post route for response
    return note; 
};


//function to validate the notes
function validateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false; 
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;   
};





//get request to get all the notes and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json(notes); 
});

// //route - get requires two arguments 1. describes the route, 2. call back function that will execute every time it is accessed with a GET request 
// app.get('/notes', (req, res) => {
//     let results = notes; 
//     // req is request 
//     if (req.query) {
//         results = filterByQuery(req.query, results); 
//     }
//     // res is response to client 
//     res.json(results);
// });


// calling for specific note 
// app.get('/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.json(result); 
//     } else {
//         res.send(404); 
//     }
// });


//post request to server to accept data to be used or stored server-side
// app.post('/api/notes', (req, res) => {
//     // set id based on what the next index of the array will be 
//     console.log('i entered the route handler');
//     console.log(req.body)
//     console.log(' i just logged the body');

//     req.body.id = notes.length.toString(); 

//     // if any data in req.body is incorrect, send error
//     if (!validateNote(req.body)) {
//         res.status(400).send('The note is not properly formatted.'); 
//     } else {
//     // add note to json file and notes array in this function 
//     const note = createNewNote(req.body, notes); 
//     // const body = req.body
//     // notes.push(body)
//     // res.send(notes); 

//     res.json(note); 
//     }
// });


app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be 
    req.body.id = notes.length.toString(); 

    // if any data in req.body is incorrect, send error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.'); 
    
    } else {
        // add note to json file and animals array in this function 
        const note = createNewNote(req.body, notes); 

        res.json(note);
    }
});


//route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
}); 


//api call to delete the notes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    // let selectedItem;

    notes.map((selectedItem, index) => {
      if (selectedItem.id === id){
        // selectedItem = item
        notes.splice(index, 1)
        return res.json(selectedItem);
      } 
    
    })

    // path to write file 
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({ notes : notes }, null, 2)
        // JSON.stringify(notes)
    );
});





//route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/notes.html'));
}); 



//listener method to our servers 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});