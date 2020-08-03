// declare variables for dependencies
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require("./config/db");

// assign variables for port and application's server
const app = express();
const port = process.env.PORT || 5000;

connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.use(express.static('./utils'));
app.use(bodyParser.urlencoded({extended: true}));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/players", require("./routes/api/players"));
app.use("/api/teams", require("./routes/api/teams"));
app.use("/api/leaders", require("./routes/api/leaders"));
app.use("/api/shots", require("./routes/api/shots"));

if (process.env.NODE_ENV === 'production') {
  // serve static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // handle react routing
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index/html'));
  });
}

app.listen(port, function () {
  console.log("Server started: Listening on port " + port + ".");
});
