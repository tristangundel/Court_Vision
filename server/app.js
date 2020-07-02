// declare variables for dependencies
const express = require("express");
const connectDB = require("./config/db");

// assign variables for port and application's server
const app = express();
const port = process.env.port || 5000;

connectDB();

app.get("/", function (req, res) {
  res.send("Welcome to Court Vision");
});

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(port, function () {
  console.log("Server started: Listening on port " + port + ".");
});
