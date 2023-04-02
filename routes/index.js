const express                       = require('express');
const router                        = express.Router();
const homeController                = require('../controllers/homecontroller');

router.get('/',homeController.home)

router.get('/puneet',homeController.puneet);


console.log('Router Loaded!');

module.exports=router;