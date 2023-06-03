const express                       = require('express');
const router                        = express.Router();
const userModel                     = require('../models/user');
const Confirmation                  = require('../models/confirmation');
const crypto=require('crypto');

router.get('/validate',function(req,res){
    res.render('validation')
})

router.post('/validate',async function(req,res){
    let user=await userModel.findOne({username:req.body.username});
    if (!user) {
        return res.redirect('back');
    }
    let cp=await Confirmation.create({
        email: req.body.username,
        accessToken: crypto.randomBytes(20).toString('hex'),
        isValid: true
    });
    console.log(cp);
})

module.exports=router;