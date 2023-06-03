const express                       = require('express');
const router                        = express.Router();
const homeController                = require('../controllers/homecontroller');

router.get('/',homeController.home)

router.get('/puneet',homeController.puneet);

router.use('/users',require('./users'));

router.use('/func',require('./functionality'));

router.use('/create',require('./character'));

router.use('/reset',require('./reset'));

console.log('Router Loaded!');

module.exports=router;