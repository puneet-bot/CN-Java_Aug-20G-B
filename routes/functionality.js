const express = require("express");
const router = express.Router();
const jokeModel = require('../models/joke');

router.post('/create',async function(req,res){
    jokeModel.uploadedAvatar(req,res,async function(err){
        const {joke_name,joke_desc,image}=req.body;
        if(err){
            return console.log('***MULTER Error',err);
        }
        if(req.file){
            // if(user.avatar){
            //   fs.unlinkSync(path.join(__dirname,'..',user.avatar))   
            // }
            let createdJoke=await jokeModel.create({
                joke_title:joke_name,
                joke_description:joke_desc,
                joke_image:jokeModel.avatarPath+'/'+req.file.filename
            });
        }
        return res.redirect('/');
    })
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
});

router.post('/delete',async function(req,res){
    // console.log('In delete',req.body);
    let deletedJoke= await jokeModel.findByIdAndDelete(req.body.joke_id);
    console.log(deletedJoke);
    res.redirect('/');
})

module.exports = router;
