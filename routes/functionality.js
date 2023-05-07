const express = require("express");
const router = express.Router();
const jokeModel = require('../models/joke');

router.post('/create',async function(req,res){
    const {joke_name,joke_desc,image}=req.body;
    console.log('In post',req.body);
    let createdJoke=await jokeModel.create({
        joke_title:joke_name,
        joke_description:joke_desc,
        joke_image:image
    });
    console.log(createdJoke);
    res.redirect('/');
})

module.exports = router;
