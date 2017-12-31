const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const gcloudConfig = require('../../config/application.json').gcloud;

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
      const userId = `google+${profile.id}`;
      const user = await db.User.findOne({
        where: {
          googleId: userId,
        },
      });
      if (user) {
        return done(null, user);
      }

      const newUser = await db.User.create({
        name: profile.displayName,
        googleId: userId,
      });
      if (newUser) {
        return done(null, newUser);
      }

      return done('Error logging in');
    },
  ));

  return passport;
};
