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

// @route       Post api/profile/me
// @desc        create or update a user profile
// @access      Private - needs token
router.post(
  "/",
  [auth, [check("status", "Status is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    //check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, team, location, youtube, twitter, instagram } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (status) profileFields.status = status;
    if (team) profileFields.team = team;
    if (location) profileFields.location = location;
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;

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

// @route       Get api/profile
// @desc        get all profiles
// @access      public
router.get("/", async (req, res) => {
  try {
    // Get users names, can add more here if want/need
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       Get api/profile/user/:user_id
// @desc        get profile by user ID
// @access      public
router.get("/user/:user_id", async (req, res) => {
  try {
    // Get users names, can add more here if want/need
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);

    // checks to make sure that their is profile for suer
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       Delete api/profile
// @desc        delete profile, user and post
// @access      private
router.delete("/", auth, async (req, res) => {
  try {
    // remove profile, auth needed because token is needed
    // TODO: add removing user posts
    await Profile.findOneAndRemove({ user: req.user.id });

    // removes user
    await User.findOneAndRemove({ _id: req.user.id });

    //Returns message
    res.json({ msg: "User has been removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
