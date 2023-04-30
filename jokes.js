// Jokes App main file
const express                       = require('express');
const app                           = express();
const port                          = 8000;
const expressLayouts                = require('express-ejs-layouts');
const db                            = require('./config/mongoose');
const passport                      = require('passport');
const passportLocal                 = require('./config/passport');
const session                       = require('express-session');
const mongoStore                    = require('connect-mongo');
const cookieParser                  = require('cookie-parser');
const sassMiddleware                = require('node-sass-middleware');
const path                          = require('path');

app.use(express.urlencoded({extended:false}));
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'Assets', 'scss')
  , dest: path.join(__dirname, 'Assets', 'css')
  , debug: true
  , outputStyle: 'extended'
  , prefix:  '/css'
}));
app.use(cookieParser());

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


app.use(session({
    name: 'Jokes',
    // TODO change the secret before deployment in production mode
    secret: 'joke123456',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: mongoStore.create({
        mongoUrl: db._connectionString,
        autoRemove: 'disabled'
      })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

// http://localhost:8000
// http://localhost:8000/


// app.listen(8000,function(req,res){
//     console.log('listening over port 8000');
// })

app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})

