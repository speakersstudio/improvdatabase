var express = require('express');
var router = express.Router();
var config = require('../config')();

// AUTH
var auth = require('../auth');
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/refreshToken', auth.checkToken, auth.refresh);

router.post('/recoverPassword', auth.recoverPassword);
router.post('/checkPasswordToken', auth.checkPasswordToken);
router.post('/changePassword', auth.changePassword);

router.all('/api/*', auth.checkToken, auth.checkAuth);


// CHECKOUT PROCESS
var charge = require('./charge');
router.post('/signup', auth.checkToken, charge.signup);
router.post('/charge', auth.checkToken, charge.doCharge);

// CONTACT
let contactRoute = require('./contact');
router.use('/api/contact', contactRoute);

//CRUD
let api = require('./api');
router.use('/api', api);

// DOWNLOAD MATERIALS
let materialCtrl = require('./api/material-item.controller');
router.get('/download/:token', materialCtrl.download);


// MAIN HOME PAGE HTML
router.get('/*', function(req, res, next) {
  res.render('index', {
       title: 'improvplus',
       baseHref: '/',
       prod: process.env.NODE_ENV === 'production',
       stripeKey: config.stripe.publishable
   });
});

module.exports = router;
