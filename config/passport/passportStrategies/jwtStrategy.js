const JWTstrategy = require('passport-jwt').Strategy;
require('dotenv').config();

const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['token'];
  }
  return token;
};

const jwtStrategy = new JWTstrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: cookieExtractor,
  },
  async (token, done) => {
    try {
      return done(null, token.user)
    } catch(err) {
      done(err);
    }
  }
)

module.exports = jwtStrategy;
