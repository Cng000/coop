// main route to root
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('rendering home');
  res.render('home', {user:req.user});
});

module.exports = router;
