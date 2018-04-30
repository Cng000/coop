var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var model = require('../models/model');

passport.serializeUser(function(user,done){
    console.log('serialize user: '+user.id);
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
  console.log('deserialize user: '+id);

  // if(model.Manager.findById(id).then(function(manager){
  //   done(null,manager);
  // }))
  // else if(model.Provider.findById(id).then(function(provider){
  //   done(null,provider);
  // });)
  //
  // else{
      model.Student.findById(id).then(function(student){
        done(null,student);
      });
    // }
});

passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
    clientID:"994955090565-6jj0jjuo9hfr2j38f5u3dsbjmqmjgkba.apps.googleusercontent.com",
    clientSecret:"8eQcMbcv2zWV7TKnDHA6i7rb"
},function(accessToken,refreshToken,profile,done){
      model.Student.findOne({googleid:profile.id}).then(function(currentStudent){
      if(currentStudent){
      console.log('current student');
      done(null,currentStudent);
    }
    else{
      new model.Student({
        fname: profile.name.givenName,
        lname: profile.name.familyName,
        googleid: profile.id,
        age: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        phone: "",
        occupation: "",
        highest_education: "",
        salary: "",
        yr_income: "",
        ethnicity: "",
        email: profile.emails[0]['value'],
        password: "",
        complete: false,
      }).save().then(function(newStudent){
        console.log('new Student created');
        done(null,newStudent);
      });
    }
  });
})
)
