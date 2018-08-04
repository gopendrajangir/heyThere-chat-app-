var express = require('express');
var router = express.Router();
var params = require('../server/server.js');

router.get('/',function(req, res){
  res.render('cover');
});

router.get('/join',function(req, res){
  res.render('join');
});

router.get('/interface',function(req, res, next){
  res.render('interface');
});



module.exports = router;
