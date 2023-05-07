const mongoose      =require('mongoose');

const jokeSchema = new mongoose.Schema({
    joke_title: {
        type: String,
        required: true
    },
    joke_description:{
        type: String,
        required: true
    },
    joke_image:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
}, {
    timestamps: true
});

const Joke=mongoose.model('Joke',jokeSchema);
module.exports=Joke;