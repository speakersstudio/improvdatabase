const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),

      PackageConfig = require('../models/packageconfig.model'),
      roles = require('../roles'),
      
      config = require('../config')();

// AUTH
var auth = require('../auth');
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/refreshToken', auth.checkToken, auth.refresh);

router.post('/recoverPassword', auth.recoverPassword);
router.post('/checkPasswordToken', auth.checkPasswordToken);
router.post('/changePassword', auth.changePassword);

router.all('/api/*', auth.checkToken, auth.checkAuth);

// APP CONFIG
router.get('/config', (req, res) => {
  // ConfigModel.find({}).exec()
  //   .then(c => {
      let data = {}; //c[0].toObject();
      data.version = require('../../package.json').version;

      data.stripe = config.stripe.publishable;
      
      res.json(data);
    // })
});

// CONFIG STUFF FOR SIGNUP PROCESS / SUBSCRIPTIONS
router.get('/packageconfig', (req, res) => {
  PackageConfig.find({}).exec()
    .then(c => {
      let data = c[0].toObject();

      data.role_facilitator = roles.ROLE_FACILITATOR;
      data.role_facilitator_team = roles.ROLE_FACILITATOR_TEAM;
      data.role_improviser = roles.ROLE_IMPROVISER;
      data.role_improviser_team = roles.ROLE_IMPROVISER_TEAM;

      res.json(data);
    });
});

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
let materialCtrl = require('./api/material-item.controller'),
    packageCtrl = require('./api/package.controller');
router.get('/download/:token', materialCtrl.download);
router.get('/downloadPackage/:token', packageCtrl.download);


// MAIN HOME PAGE HTML
router.get('/*', function(req, res, next) {
  let template = process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'qa' ? 'index-prod' : 'index-dev';

  console.log('RENDERING TEMPLATE ' + template);

  res.render(template, {
       title: 'improvplus',
       prod: process.env.NODE_ENV == 'production',
       baseHref: '/'
   });
});

module.exports = router;
