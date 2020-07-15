// declare variables for dependencies
const express = require("express");
const connectDB = require("./config/db");
const config = require("config");
var bodyParser = require("body-parser");
const axios = require("axios");

// assign variables for port and application's server
const app = express();
const port = process.env.port || 5000;

connectDB();

// tells routes to use this
app.use(bodyParser.urlencoded({ extended: true }));

// init middleware
app.use(express.json({ extended: false }));

app.get("/", function (req, res) {
  res.send("Welcome to Court Vision");
});

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/players", require("./routes/api/players"));
app.use("/api/teams", require("./routes/api/teams"));

app.listen(port, function () {
  console.log("Server started: Listening on port " + port + ".");
});

app.get("/get-houston", (req, res) => {
  const axios = require("axios");

  axios({
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/teams/city/Houston",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key": config.get("RAPIDAPI_KEY"),
      useQueryString: true,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Below is the start for the API calls
// Currently it is commented out, when left in it makes calls to the API

var http = require("https");

var options = {
  method: "GET",
  hostname: "api-nba-v1.p.rapidapi.com",
  port: null,
  path: "/seasons/",
  headers: {
    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    "x-rapidapi-key": config.get("RAPIDAPI_KEY"),
    useQueryString: true,
  },
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();

var http = require("https");

var options = {
  method: "GET",
  hostname: "api-nba-v1.p.rapidapi.com",
  port: null,
  path: "/teams/city/Houston",
  headers: {
    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    "x-rapidapi-key": config.get("RAPIDAPI_KEY"),
    useQueryString: true,
  },
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
