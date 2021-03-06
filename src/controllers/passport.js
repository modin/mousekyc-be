const passport = require("passport");
const request = require("request");
const LocalStrategy = require("passport-local").Strategy;
const ModelConstants = require("../models/constants");
const AdminModel = require("../models/admin");
const UserModel = require("../models/user");
const UtilsModule = require("../modules/utils");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  "admin",
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    AdminModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Invalid email !` });
      }
      if (user.status != ModelConstants.ADMIN_STATUS_VERIFIED) return done(null, false, { msg: `Not verified user !` });

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid password !" });
      });
    });
  })
);

passport.use(
  "user",
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Invalid email !` });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid password !" });
      });
    });
  })
);
