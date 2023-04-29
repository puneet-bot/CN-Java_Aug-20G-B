const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.post("/create", async function (req, res) {
  try {
    console.log("posted data", req.body);
    let user = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.fname + " " + req.body.lname,
    };
    console.log(user);
    let newuser = await userModel.create(user);
    console.log(newuser);
    res.redirect('/users/signin')
  } catch(err){
    console.log(err);
    res.redirect('/users/signup')
  }
});

router.get("/signin", function (req, res) {
  res.render("signin");
});

module.exports = router;
