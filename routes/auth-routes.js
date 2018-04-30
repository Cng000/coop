// routing for path that starts with /auth/
var express = require('express');
var router = express.Router();
var passport= require('passport');

router.get('/login',function(req,res,next){
  res.render('login', {user:req.user});
});

router.get('/logout',function(req,res,next){
  //handle with passport
  req.logout();
  res.redirect('/');
})

router.get('/google',passport.authenticate('google',{
  scope:['email']
}));

//callback from google redirect to
router.get('/google/redirect',passport.authenticate('google'),function(req,res){
//  use for redirecting different users
  if(req.user.manager){
    console.log('manager true');
    res.redirect('/profile/');
  }
  else if (req.user.provider) {
    console.log('provider true');
    res.render('provider');
  }
  else if(req.user.complete){
    console.log('user true');
    res.redirect('/profile/');
  }
  else{
    console.log('called forms');
    // console.log('user id: '+req.user.id);
    res.render('forms',{user:req.user});
  }
});

module.exports = router;
