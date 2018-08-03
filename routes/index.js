var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
  res.render('cover');
});

router.get('/interface',function(req, res){
  res.render('interface');
});

module.exports = router;
