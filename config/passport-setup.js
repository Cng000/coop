var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var model = require('../models/model');

passport.serializeUser(function(user,done){
    console.log('serialize user: '+ user.id);
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
  // model.Manager.findById(id).then(function(manager){
  //   done(null,manager);
  // });
  // model.Provider.findById(id).then(function(provider){
  //   done(null,provider);
  // });
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

  function Managergoogleid(id){
     var query = model.Manager.find({googleid:id}).exec();
     return query;
  }
  function Providergoogleid(id){
    var query = model.Provider.find({googleid:id}).exec();
    return query;
  }
  function Studentgoogleid(id){
    var query = model.Student.find({googleid:id}).exec();
    return query;
  }
  var Manager = Managergoogleid(profile.id);
  var Provider = Providergoogleid(profile.id);
  var Student = Studentgoogleid(profile.id);

  // if(Manager){
  //     return done(null,Manager);
  // }
  // if (Provider) {
  //     return done(null,Provider);
  // }
  // if(Student){
  //     console.log('current student');
  //     console.log(Student);
  //     return done(null,Student);
  // }
  // else{
  //         new model.Student({
  //           fname: profile.name.givenName,
  //           lname: profile.name.familyName,
  //           googleid: profile.id,
  //           age: "",
  //           dob: "",
  //           address: "",
  //           city: "",
  //           state: "",
  //           zipcode: "",
  //           phone: "",
  //           occupation: "",
  //           highest_education: "",
  //           salary: "",
  //           yr_income: "",
  //           ethnicity: "",
  //           email: profile.emails[0]['value'],
  //           password: "",
  //           complete: false,
  //         }).save().then(function(newStudent){
  //           console.log('new Student created');
  //           done(null,newStudent);
  //         });
  // }

  if(Student){
    Student.then(function(student){
      if(student){
        console.log('the query from outside: '+student);
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
                  done(null,newStudent);
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
  //     console.log('the query returns: '+currentStudent);
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
