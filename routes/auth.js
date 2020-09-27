require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({
      error: "Please enter all the details",
    });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user already exist" });
      }
      bcrypt.hash(password, 10).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          pic: pic,
        });
        user
          .save()
          .then((user) => {
            res.status(200).json({
              message: "User Saved Successfully",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "Please enter valid Email and Password",
    });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({
          error: "Invalid Email or Password",
        });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { _id: savedUser._id },
              process.env.JWT_SECRET
            );
            const { _id, email, name, followers, following, pic } = savedUser;
            res.json({
              token,
              user: { _id, email, name, followers, following, pic },
            });
          } else {
            return res.status(422).json({
              error: "Invalid Email or Password",
            });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
