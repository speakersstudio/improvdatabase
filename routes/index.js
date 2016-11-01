var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', {
       title: 'Improv Comedy Database',
       prod: process.env.NODE_ENV === 'production'
   });
});

module.exports = router;
