const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const multer = require("multer");
const upload = multer({
  dest: './uploads'
})

const validateUserRegister = require('../helpers/validation').validateUserRegister;
const validateUserLogin = require('../helpers/validation').validateUserLogin;
const checkValidationErrors = require('../middlewares/checkValidationErrors');
const authenticateRequest = require('../middlewares/authenticateRequest');


router.get('/register', (req, res, next) =>{
  res.render('register', {title: 'Register'});
})

router.post('/register',
  upload.single('profileImage'),
  validateUserRegister(),
  checkValidationErrors,
  (req, res, next) => {
    passport.authenticate('signup', {session: false},
     async (err, user, info)=> {
      if(err) { res.render('register', {message: err.message})}
      res.redirect('/user/login');
    })(req, res, next)
  }
  )

router.get('/login', async (req, res, next) =>{
  res.render('login', {title: 'Login'});
})

router.post('/login',
  validateUserLogin(),
  checkValidationErrors,
  async(req, res, next) => {
    passport.authenticate('login', (err, user, info) => {

      try {
        if(err || !user) {
          throw err;
        }

        req.login(
          user,
          { session: false },
          async (err) => {
            if(err) return next(err);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({user: body}, process.env.JWT_SECRET);

            res.cookie('token', token);
            res.redirect('/');
          }
        );
      } catch(err) {
        return next(err);
      }
    })(req, res, next);
  }
);

router.get('/', authenticateRequest, (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/logout', authenticateRequest, async (req, res, next) => {
  console.log(req);
  res.clearCookie('token');
  res.redirect('/user/login');
});

module.exports = router;
