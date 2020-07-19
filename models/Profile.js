const mongoose = require("mongoose");
//below gets rid of DeprecationWarning: Mongoose: `findOneAndUpdate()`
mongoose.set("useFindAndModify", false);

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
  // array of strings for skills
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: "String",
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
