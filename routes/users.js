const express                       = require('express');
const router                        = express.Router();

router.get('/signup',function(req,res){
    console.log('signup')
    res.render('signup')
})

router.get('/signin',function(req,res){
    res.render('signin')
})

module.exports=router;