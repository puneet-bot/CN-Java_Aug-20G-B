// http://localhost:8000/api/alpha

const express                       = require('express');
const router                        = express.Router();
const passport                      =require('passport')

router.use('/jokes',passport.authenticate('jwt',{session:false}),require('./jokes'))
router.use('/authenticate',require('./user'));

module.exports=router;

