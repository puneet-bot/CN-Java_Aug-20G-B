const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const passport  = require('passport');

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signup'}),function(req,res){
    console.log('success','Signed In Successfully');
    res.redirect('/')
});

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

router.post("/create-session",passport.authenticate(
  'local',
  {failureRedirect: '/users/signin'},
), function (req, res) {
  res.redirect('/')
});

router.get("/signin", function (req, res) {
  res.render("signin");
});

router.get('/profile',async function(req,res){
  try{
    console.log("Session User",req.user);
    let myUser=await userModel.findById(req.user.id);
    return res.render('profile', {
              user:myUser
          })
  }
  catch(err){
    console.log(err);
  }
//   User.findById(req.params.id,(err,myUser)=>{
//     return res.render('user_profiles', {
//         title: 'User Profile',
//         profile:myUser
//     })
// })
})

router.post('/signout',async function(req,res){
  req.logout(function(err) {
    if (err) {
        return next(err);
    }
    req.session.destroy(function(err) {
        if (err) {
            return next(err);
        }
        res.clearCookie('Jokes'); // use the name of the session cookie here
        res.redirect('/');
    });
});
  console.log('Signing Out');
})

module.exports = router;
