// Jokes App main file
const express                       = require('express');
const app                           = express();
const port                          = 8000;
const expressLayouts                = require('express-ejs-layouts');
const db                            = require('./config/mongoose');
const passport                      = require('passport');
const passportLocal                 = require('./config/passport');

// Set up Path to the static files
app.use(express.static('./Assets'));

// Layout Configuration
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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

