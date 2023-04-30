const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.post("/create", async function (req, res) {
  try {
    // console.log("posted data", req.body);
    //Destructure the object
    let { password, cpassword, username } = req.body;
    if (password != cpassword) {
      return res.redirect("back");
    }

    let user = await userModel.findOne({ username });
    if (!user) {
      let users = {
        username: username,
        password: password,
        name: req.body.fname + " " + req.body.lname,
      };
      let newuser = await userModel.create(users);
      console.log(newuser);
    }
    res.redirect("/users/signin");
  } catch (err) {
    console.log(err);
    res.redirect("/users/signup");
  }
});

router.post("/create-session", function (req, res) {
  
  console.log(req.body);
});

router.get("/signin", function (req, res) {
  res.render("signin");
});

module.exports = router;
