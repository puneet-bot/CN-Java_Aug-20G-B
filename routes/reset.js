const express                       = require('express');
const router                        = express.Router();
const userModel                     = require('../models/user');
const Confirmation                  = require('../models/confirmation');
const crypto=require('crypto');
const queue = require('../config/kue');
const recoveryMailer = require('../mailers/recovery-email');
const commentEmailWorker = require('../workers/recover-email');


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
    let job = queue.create('reset', cp).save(function (err) {
        if (err) {
            console.log('Error in finding in err', err);
            return;
        }
        console.log('job enqueued', job.id);
        res.redirect('back');
    });
})

module.exports=router;