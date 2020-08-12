const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const jwtSecret = (process.env.JWT_SECRET || require('config').get('jwtSecret'));
const { check, validationResult } = require("express-validator");

const User = require("../../models/Users");

// @route       GET api/auth
// @desc        Test route
// @access      Public

// adding the auth below makes this route protected
router.get("/", auth, async (req, res) => {
  try {
    // -password added to make sure password left off in data
    const user = await User.findById(req.user.id).select("-password");
    // send along user
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/auth
// @desc        authinticate user and get token
// @access      Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    // ensure it exsists
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if errors are there
    if (!errors.isEmpty()) {
      console.log("error array error");
      return res.status(400).json(errors.array());
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // See if user exsists
      if (!user) {
        return res
          .status(400)
          .json([{ status: 400, msg: "Invalid Credentials" }]);
      }

      // compare plain text with encrypted password
      const isMatch = await bcrypt.compare(password, user.password);

      // see if there is not a match
      if (!isMatch) {
        return res
          .status(400)
          .json([{ status: 400, msg: "Invalid Credentials" }]);
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtSecret,
        // expiration is optional, but recommended.
        // here it is set to long time because we are testing
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
