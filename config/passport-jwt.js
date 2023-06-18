const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
// const env=require('./environment')


let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'JokesApp'
}

passport.use(new JWTStrategy(opts, async function(jwtPayload, done) {
    try {
        console.log("jwt: ",jwtPayload);
      const user = await User.findById(jwtPayload._id).exec();
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log(err);
      return done(err, false); // Pass the error object to indicate an error
    }
  }));
  


module.exports=passport;