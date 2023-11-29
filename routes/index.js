const express = require('express');
const router = express.Router();

const authenticateRequest = require('../middlewares/authenticateRequest');

router.get('/', authenticateRequest, function(req, res, next) {
  res.render('index', { title: 'Members'});
});

module.exports = router;
