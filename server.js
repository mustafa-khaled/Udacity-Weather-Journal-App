// Setup empty JS object to act as endpoint for all routes
let projectData = {};


// Require Express to run server and routes
const express = require(`express`);

// Start up an instance of app
const app = express(); 

// Initialize the main project folder
app.use(express.static("website"));



const port = 5000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

const cors = require("cors");

app.use(cors());

app.listen(port , () => {
    console.log(`Server is running https://localhost:${port}`);
});

app.post(`/save-data`, (req, res) => {
    projectData = req.body;
    res.json({msg: `done`})
});


//GET route that returns the projectData object
app.get(`/get-data`, (req , res) => {
    res.json(projectData);
});
