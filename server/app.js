// declare variables for dependencies
const express = require("express");

// assign variables for port and application's server
const app = express();
const port = process.env.port || 5000;

app.get("/", function(req, res) {
    res.send("Welcome to Court Vision");
});

app.listen(port, function() {
    console.log("Server started: Listening on port " + port + ".");
})