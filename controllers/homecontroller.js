const jokeModel=require('../models/joke');

module.exports.puneet=function(req,res){
    res.render('puneet')
};

module.exports.home=async function(req,res){
    let jokes=await jokeModel.find({});
    res.render('home',{
        jokes,
        title:"Joke| Home"
    })
};