// http://localhost:8000/api/alpha/user
const User=require('../../../models/user');
const jwt =require('jsonwebtoken');
const express       =   require('express');
const router        =   express.Router();


router.post('/',async function(req,res){
    try{
        let users=await User.findOne({username:req.body.username});
        console.log('users: ',users);
        if(!users || users.password!=req.body.password){
            return res.json(422,{
                message:"Invalid Username or Password"
            })
        }
        return res.json(200,{
            message:"Sign in successfull, here is your token,Please Keep it safe.",
            data:{
                token:jwt.sign(users.toJSON(),'JokesApp',{expiresIn:'100000'})
            }
            //Format of token returned---- header.payload.signature
        })
    }catch(err){
        console.log(err,'hereeee');
        return res.JSON(500,{
            message:"Unauthorized."
        })
    }
});


module.exports=router;