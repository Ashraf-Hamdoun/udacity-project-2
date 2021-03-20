/** Weather Journal app example */ 

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Start up an instance of app
/* Dependencies */
// parse our Data
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//How data will be dealt with => ISON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// tell the server and the browser talk to each other without any security interuptions
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/****************************************** */

// Setup Server

/* Listec port */
const port = 3030;

/* Spin up the server */
const server = app.listen(port, listening);
// Spin up the server and call it back to debug with arrow function
// const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

/* Callback to debug */
function listening(){
    console.log("Server running ..."); 
    console.log(`Running on localhost: ${port}`);
}

/****************************************** */

// Routes & Requests

/** GET route */
// Data whitch client requested it
app.get('/gets', sendData)
function sendData(request, response) {
    response.send(projectData);
}

/** POST route */
app.post('/add', addData)
function addData(request, response) {
    // Showing request in terminal
    console.log(request.body);
    // Data comes
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.userResponse = request.body.userResponse;
    // See it in the terminal
    console.log(projectData);
}
