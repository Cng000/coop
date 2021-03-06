var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var model = require('../models/model');
var keys = require('./keys')

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

  var Manager = Managergoogleid(id);
  var Provider = Providergoogleid(id);
  var Student = Studentgoogleid(id);

  if(Manager){
    // console.log(Manager.lenght)
    Manager.then(function(manager){
      if(manager){
        console.log('deserializing manager');
        return done(null,manager);
      }
  });
}

  if(Provider){
    Provider.then(function(provider){
      if(provider){
        console.log('deserializing provider');
        return done(null,provider);
      }
    });
  }

  if(Student){
    Student.then(function(student){
      if(student){
        console.log('deserializing student');
        return done(null,student);
      }
      else{
        // console.log('student')
      }
    });
  }
});

//Authenticate function api call
passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
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
  var Manager = Managergoogleid(profile.id);
  var Provider = Providergoogleid(profile.id);
  var Student = Studentgoogleid(profile.id);

  // console.log('googleid is: '+profile.id);
  if(Manager){
        // Manager.exec(function(){
        Manager.then(function(manager){
            // console.log(manager.googleid);
            if(manager){
              console.log('found manager');
              return done(null,manager);
            }
        });
  }

  if (Provider) {
    Provider.then(function(provider){
      if(provider){
        console.log('found provider');
        return done(null,provider);
      }
    });
  }

  if(Student){
    Student.then(function(student){
      if(student){
        console.log('found student\n');
        // console.log(student.googleid);
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
