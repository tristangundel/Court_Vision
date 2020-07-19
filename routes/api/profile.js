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
    res.status(500).send("Server Error -- in /me get");
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
    const errors = validationResult(req);

    //check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      status,
      skills,
      team,
      location,
      youtube,
      twitter,
      instagram,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (status) profileFields.website = status;
    if (team) profileFields.team = team;
    if (location) profileFields.location = location;

    // We can use an array to save favorite players
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;

    // look for profile
    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error -- / post ");
    }
  }
);

module.exports = router;
