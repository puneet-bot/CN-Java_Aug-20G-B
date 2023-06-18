// http://localhost:8000/api/alpha

const express                       = require('express');
const router                        = express.Router();

router.use('/jokes',require('./jokes'))

module.exports=router;

