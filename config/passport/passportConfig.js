const passport = require('passport');

const localStrategy = require('./passportStrategies/localStrategy');
const jwtStrategy = require('./passportStrategies/jwtStrategy')

passport.use('login', localStrategy.loginStrategyWithPassport);
passport.use('signup', localStrategy.signUpStrategyWithPassport);
passport.use('jwt', jwtStrategy);

module.exports = passport;
