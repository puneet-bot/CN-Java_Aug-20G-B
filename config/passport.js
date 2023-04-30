const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      console.log("here in passport");
      User.findOne({ username: username })
        .then(function (user) {
          if (!user || user.password != password) {
            console.log("error", "Invalid Username/Password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(function (err) {
          if (err) {
            console.log("error", err);
          }
        });
      // User.findOne({ username: username }, function (err, user) {
      //     if (err) {
      //         console.log('error', err);
      //     }

      //     if (!user || user.password != password) {
      //         console.log('error', "Invalid Username/Password");
      //         return done(null, false);
      //     }
      //     return done(null, user);
      // });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try{
        let user=await User.findById(id);
        return done(null, user);
    }
    catch(err){
        console.log("Error in finding user --> Passport");
              return done(err);
    }
//   User.findById(id, function (err, user) {
//     if (err) {
//       console.log("Error in finding user --> Passport");
//       return done(err);
//     }

//     return done(null, user);
//   });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
