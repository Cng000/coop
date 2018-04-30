var express = require('express');
var router = express.Router();
var model = require('../models/model');

// checks for user authentication
var authCheck = function(req, res,next){
  if(!req.user){
    console.log('couldnt authenticate: '+req.id);
    res.redirect('/auth/login');
  }
  else{
    next();
  }
};

router.get('/',authCheck,function (req,res){
    console.log('called profile.ejs');
    res.render('profile',{user:req.user});
});

router.post('/update',function (req,res) {
  // console.log('update');
  // console.log('the request is '+req.user.id);
  values = {
    // fname: req.body.name,
    // lname: req.body.last,
    age: req.body.age,
    dob: req.body.birthday,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    occupation: req.body.occupation,
    highest_education: req.body.education,
    salary: req.body.salary,
    yr_income: req.body.income,
    ethnicity: req.body.ethnicity,
    email: req.body.email,
    password: req.body.password,
    complete: true,
  };
  console.log(values);
  model.Student.findOneAndUpdate({_id:req.user.id}, values, {new: true}, function(err, Student){
    if(err){
      console.log("Something wrong when updating data!");
    }
    // console.log('it update: '+Student);
    res.redirect('/profile/')
});
});
module.exports = router;
