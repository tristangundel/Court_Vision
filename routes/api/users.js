const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/Users");

// @routeGET    POST api/users
// @desc        Register user
// @access      Public
router.post(
  "/",
  [
    // Makes sure that information that user inputs is valid
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if errors are there
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // pulls from req.body so you wont have to do that everytime
    const { name, email, password } = req.body;

    try {
      // Search for user by email
      let user = await User.findOne({ email });

      // If user already exsists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists " }] });
      }

      // create instance of user, does not save it yet
      user = new User({
        name,
        email,
        password,
      });

      // Encrypt passowrd
      // 10 -- more you have more secure, but also can make slower
      // salt is what encrypts password
      const salt = await bcrypt.genSalt(10);

      // takes plaintext password and encrpyts it
      user.password = await bcrypt.hash(password, salt);

      // save user to database
      // await uses because of promise
      await user.save();

      // Return jsonwebtoken
      // this allows user to login in right away
      const payload = {
        user: {
          id: user.id,
        },
      };

      // implements jwtoken
      jwt.sign(
        payload,
        (process.env.JWT_SECRET || config.get('jwtSecret')),
        // expiration is optional, but recommended.
        // here it is set to long time because we are testing
        // before deploying we will change this
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      //You get here if there is a server error
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
