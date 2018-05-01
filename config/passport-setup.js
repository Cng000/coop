var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var model = require('../models/model');

//serialize
passport.serializeUser(function(user,done){
    console.log('serialize user: '+ user.id);
    done(null,user.id);
});

//deserialize
passport.deserializeUser(function(id,done){
  console.log('deserialize user: '+id);

  function Managergoogleid(id){
     var query = model.Manager.findById(id).exec();
     return query;
  }

  function Providergoogleid(id){
    var query = model.Provider.findById(id).exec();
    return query;
  }

  function Studentgoogleid(id){
    var query = model.Student.findById(id).exec();
    return query;
  }

  // var Manager = Managergoogleid(id);
  // var Provider = Providergoogleid(id);
  var Student = Studentgoogleid(id);

  // if(!Manager.lenght){
  //   // console.log(Manager.lenght)
  //   console.log('not manager deserialize');
  // }
  // else {
  //   console.log('manager deserialize');
  //   Manager.exec(function(manager){
  //     return done(null,manager);
  // });
  // }

  // if(!Provider.lenght){
  //   // console.log(Provider.lenght)
  //   console.log('not provider deserialize ');
  // }
  // else {
  //   console.log('provider deserialize ');
  //   Provider.exec(function(provider){
  //     return done(null,provider);
  //   });
  // }

  if(!Student){
    // console.log(Student);
    console.log('student deserialize');
    Student.then(function(student){
      return done(null,student);
    });
  }
  else {
    console.log('deserialize student');
    Student.then(function(student){
      return done(null,student);
    });
  }
});

//Authenticate function api call

passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
    clientID:"994955090565-6jj0jjuo9hfr2j38f5u3dsbjmqmjgkba.apps.googleusercontent.com",
    clientSecret:"8eQcMbcv2zWV7TKnDHA6i7rb"
},function(accessToken,refreshToken,profile,done){

  function Managergoogleid(id){
     var query = model.Manager.findOne({googleid:id}).exec();
     return query;
  }
  function Providergoogleid(id){
    var query = model.Provider.findOne({googleid:id}).exec();
    return query;
  }
  function Studentgoogleid(id){
    var query = model.Student.findOne({googleid:id}).exec();
    return query;
  }
  // var Manager = Managergoogleid(profile.id);
  // var Provider = Providergoogleid(profile.id);
  var Student = Studentgoogleid(profile.id);

  // console.log('googleid is: '+profile.id);

  // if(!Manager.lenght){
  //       // Manager.exec(function(){
  //         console.log('not manager');
  //     // });
  // }
  // else {
  //     Manager.then(function(manager){
  //     console.log('found manager');
  //       return done(null,manager);
  //   });
  // }
  // if (!Provider.length) {
  //     // Provider.exec(function(){
  //       console.log('not provider');
  //   // });
  // }
  // else {
  //     // console.log('provider null'+Provider);
  //     Provider.then(function(provider){
  //     console.log('found provider');
  //       return done(null,provider);
  //   });
  // }
  if(Student){
    Student.then(function(student){
      if(student){
        console.log('found student\n');
        return done(null,student);
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
                  return done(null,newStudent);
                });
      }
    });
  }
  //
  // var student = model.Student.findOne({googleid:profile.id});
  // console.log('the query from outside: '+ student);
  //
  // model.Student.findOne({googleid:profile.id}).then(function(currentStudent){
  //   if(currentStudent){
  //     console.log('found user: '+currentStudent);
  //     done(null,currentStudent)
  //   }
  //   else{
  //     new model.Student({
  //               fname: profile.name.givenName,
  //               lname: profile.name.familyName,
  //               googleid: profile.id,
  //               age: "",
  //               dob: "",
  //               address: "",
  //               city: "",
  //               state: "",
  //               zipcode: "",
  //               phone: "",
  //               occupation: "",
  //               highest_education: "",
  //               salary: "",
  //               yr_income: "",
  //               ethnicity: "",
  //               email: profile.emails[0]['value'],
  //               password: "",
  //               complete: false,
  //             }).save().then(function(newStudent){
  //               console.log('new Student created');
  //               done(null,newStudent);
  //             });
  //   }
  // });
})
)
