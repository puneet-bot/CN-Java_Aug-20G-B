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
});

router.post('/editform/:id',async function(req,res){
    let joke=await jokeModel.findById(req.params.id);
    res.render('edit',{
        joke
    });

});

router.post('/edit',async function(req,res){
    const {joke_name,joke_desc}=req.body;
    updatedJoke={
        joke_title:joke_name,
        joke_description:joke_desc
    }
    let joke=await jokeModel.findByIdAndUpdate(req.body.id,updatedJoke);
    console.log(joke);
    res.redirect('/');
})

module.exports = router;
