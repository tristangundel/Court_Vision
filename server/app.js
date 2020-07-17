// declare variables for dependencies
const express = require("express");
const connectDB = require("./config/db");
const config = require("config");

// assign variables for port and application's server
const app = express();
// const port = process.env.PORT || 5000;

connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.use(express.static('./utils'));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/players", require("./routes/api/players"));
app.use("/api/teams", require("./routes/api/teams"));

app.listen((process.env.PORT || 5000), function () {
  console.log("Server started: Listening on port " + (process.env.PORT || 5000)+ ".");
});
