const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/Users");

// @routeGET    GET api/profile/me
// @desc        get current users profile
// @access      private - needs token

// asnyc await used because we are using mongoos promise
router.get("/me", auth, async (req, res) => {
  try {
    // get the user from user profile
    profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name"
    );

    // next check to see if there is no profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    // if there is a profile we share that
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @routeGET    Post api/profile/me
// @desc        create or update a user profile
// @access      Private - needs token
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validtionResult(req);

    //check for errors
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (team) profileFields.team = team;
    if (status) profileFields.website = status;
    if (location) profileFields.location = location;
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;

    // We can use an array to save favorite players
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    console.log(skills);

    res.send("Hello");
  }
);

module.exports = router;
