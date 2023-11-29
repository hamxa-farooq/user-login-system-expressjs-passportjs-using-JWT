const passport = require('passport');

const authenticateRequest = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      if(err || !user) {
        return res.redirect('/user/login');
      }
      res.locals.user = user;
      next();
    }
  ) (req, res, next);
}

module.exports = authenticateRequest;
