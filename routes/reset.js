const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const Confirmation = require("../models/confirmation");
const crypto = require("crypto");
const queue = require("../config/kue");
const recoveryMailer = require("../mailers/recovery-email");
const commentEmailWorker = require("../workers/recover-email");

router.get("/validate", function (req, res) {
  res.render("validation");
});

router.post("/validate", async function (req, res) {
  let user = await userModel.findOne({ username: req.body.username });
  if (!user) {
    return res.redirect("back");
  }
  let cp = await Confirmation.create({
    email: req.body.username,
    accessToken: crypto.randomBytes(20).toString("hex"),
    isValid: true,
  });
  console.log(cp);
  let job = queue.create("reset", cp).save(function (err) {
    if (err) {
      console.log("Error in finding in err", err);
      return;
    }
    console.log("job enqueued", job.id);
    res.redirect("back");
  });
});

router.get("/recover",async  function (req, res) {
  let confirmation = await Confirmation.findOne({
    accessToken: req.query.access_token,
  });
  // function(err){
  // if(err){
  //     console.log(err);
  //     return;
  // }
  // console.log(req.query);
  if (confirmation) {
    res.render("reset", { title: "reset", token: req.query.access_token });
  }
  // })
});


router.post("/update",async function(req,res){
    if(req.body.password!=req.body.confirmPassword){
        res.redirect('/reset');
    }
    let token=await Confirmation.findOne({accessToken:req.body.token});
    // function(err,token){
        if(token){
            token.isValid=false;
            token.save();
            let user= await userModel.findOne({username:token.email});
            // function(err,user){
                user.password=req.body.password;
                user.save();
                res.redirect('/users/signin');
            // })
        }
        
        
    // })
    
});

module.exports = router;
