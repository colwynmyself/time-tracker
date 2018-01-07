const jwt = require('../utils/jwt');
const logger = require('../utils/logger');

module.exports = (app, db, passport) => {
  app.get(
    '/auth/google',
    (req, res, next) => {
      req.session.redirectBase = req.query.redirect;
      next();
    },
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      const user = req.user;
      const [err, token] = jwt.generateToken(user);

      if (err) {
        logger.error(`Failed to generate jwt for user: ${user.id}`);
        return res.redirect('/error');
      }

      let redirectBase = '/';
      if (req.session.redirectBase) {
        redirectBase = req.session.redirectBase;
      }

      logger.info(`User logged in with Google and redirected to: ${redirectBase}`);
      return res.redirect(`${redirectBase}?jwt=${token}`);
    },
  );
};
