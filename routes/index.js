// main route to root
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');

/* GET home page. */
router.get('/', function(req, res) {
  // console.log('rendering home');
  res.render('mainproject', {user:req.user});
});

// router.get('/login',function (req,res){
//   res.render('login');
// });

router.get('/video',function (req,res){
  res.render('video');
});


module.exports = router;
