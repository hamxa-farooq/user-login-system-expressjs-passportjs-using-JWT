const { validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if(validationErrors.isEmpty()) {
    next();
  } else {
    console.log(validationErrors.array());
    if(req.originalUrl === '/user/register') {
      res.render('register', {errors: validationErrors.array()});
    }
    else {
      res.render('login', {errors: validationErrors.array()});
    }
  }
}

module.exports = checkValidationErrors;
