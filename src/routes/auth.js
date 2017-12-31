module.exports = (app, db, passport) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/rip' }),
    (req, res) => {
      res.redirect('/');
    },
  );
};
