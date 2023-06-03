const express = require("express");
const router = express.Router();
const joke=require('../models/joke');

router.post('/characters',async function(req,res){
    let objectCount=(Object.keys(req.body).length);
    // console.log(req.body);

    // const objectCount = 2; // Number of objects in req.body
    for (let i = 0; i < objectCount; i++) {
      let currentCharacter = `character-${i}`;
      console.log(currentCharacter, req.body[`character-${i}`]);
      await joke.characters.push(req.body[currentCharacter]);
    }
    
    console.log(joke.characters);
    // await charModel.characters.push("")
    res.redirect('/')

})


module.exports = router;
