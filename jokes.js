// Jokes App main file
const express                       = require('express');
const app                           = express();
const port                          = 8000;

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/',require('./routes'));

// http://localhost:8000
// http://localhost:8000/


// app.listen(8000,function(req,res){
//     console.log('listening over port 8000');
// })

app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})

