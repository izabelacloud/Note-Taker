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


// listener method to our servers 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});