const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const gcloudConfig = require('../../config/application.json').gcloud;
const logger = require('./logger');

module.exports = (app, db) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findById(id).then(user => done(null, user));
  });

  passport.use(new GoogleStrategy(
    {
      clientID: gcloudConfig.CLIENT_ID,
      clientSecret: gcloudConfig.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const user = await db.User.findOne({
        where: {
          googleId,
        },
      });

      if (user) {
        logger.info(`User logged in with googleId: ${googleId}`);
        return done(null, user);
      }

      const newUser = await db.User.create({
        name: profile.displayName,
        googleId,
      });
      if (newUser) {
        logger.info(`New user created with googleId: ${googleId}`);
        return done(null, newUser);
      }

      logger.error(`User failed to be made for googleId: ${googleId}`);
      return done('Error logging in');
    },
  ));

  return passport;
};
