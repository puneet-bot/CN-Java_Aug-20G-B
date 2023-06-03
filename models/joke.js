const mongoose      =require('mongoose');
const multer        =require('multer');
const path          =require('path');
const JOKES_PATH   =path.join('/uploads/jokes');

const jokeSchema = new mongoose.Schema({
    joke_title: {
        type: String,
        required: true
    },
    joke_description:{
        type: String,
        // required: true
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',JOKES_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  jokeSchema.statics.uploadedAvatar=multer({ storage: storage }).single('joke');
  jokeSchema.statics.characters=[];
  jokeSchema.statics.avatarPath=JOKES_PATH;
const Joke=mongoose.model('Joke',jokeSchema);
module.exports=Joke;