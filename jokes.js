// Jokes App main file
const express                       = require('express');
const app                           = express();
const port                          = 8000;



app.get('/',function(req,res){
    res.send('<h1>Hello Java Group!</h1>')
})


// app.listen(8000,function(req,res){
//     console.log('listening over port 8000');
// })

app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})

