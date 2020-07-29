const mongoose = require("mongoose");

// every profile will be associated with a user so we refrence that
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  team: {
    type: "String",
  },
  website: {
    type: "String",
  },
  location: {
    type: "String",
  },
  // dev, instructor, student etc.
  status: {
    type: "String",
    required: true,
  },
  bio: {
    type: "String",
  },
  youtube: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
