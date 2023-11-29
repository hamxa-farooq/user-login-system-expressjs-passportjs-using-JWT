const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../../../models/user');


const signUpStrategyWithPassport = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        profileImage: req.file.filename,
      });
      User.createUser(newUser);
      return done(null, newUser);
    } catch(err) {
      done(err);
    }
  }
)


const loginStrategyWithPassport = new LocalStrategy(async function verify(username, password, done) {

  try {
    const user = await User.findOne({username});
    if(!user) {
      return done(null, false, {message: 'Incorrect username or password'});
    }
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Incorrect username or password'});
    }

  } catch(err) {
    return done(err);
  }
});

module.exports = {
  loginStrategyWithPassport,
  signUpStrategyWithPassport,
}
