// // http://localhost:8000/api
const express                       = require('express');
const router                        = express.Router();

router.use('/alpha',require('./alpha'))

module.exports=router;

