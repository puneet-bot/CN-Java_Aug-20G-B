const express                       = require('express');
const router                        = express.Router();


router.get('/',function(req,res){
    res.send('<h1>Hello Java Group!</h1>')
})

router.get('/puneet',function(req,res){
    res.send('<h1>Hello Puneet</h1>')
});


console.log('Router Loaded!');

module.exports=router;