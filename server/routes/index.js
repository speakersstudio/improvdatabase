var express = require('express');
var router = express.Router();

// /* GET App */
// router.get('/app/*', function(req, res, next) {
//   res.render('app', {
//        title: 'improvplus',
//        baseHref: '/app/',
//        prod: process.env.NODE_ENV === 'production'
//    });
// });

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', {
       title: 'improvplus',
       baseHref: '/',
       prod: process.env.NODE_ENV === 'production'
   });
});

module.exports = router;
