
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Subscriber = require('../models/Subscriber'); 
const isProduction = process.env.NODE_ENV === "production";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: isProduction
        ? "https://api.ideasbangladesh.com/api/google/callback"
        : "http://localhost:5000/api/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const name = profile.displayName;
      const email = profile.emails[0].value;

      let subscriber = await Subscriber.findOne({ email });

      if (!subscriber) {
        subscriber = await Subscriber.create({ name, email });
      }

      return cb(null, subscriber);
    } catch (err) {
      return cb(err, null);
    }
  }
));
passport.serializeUser(function(subscriber, done) {
  done(null, subscriber.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await Subscriber.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});