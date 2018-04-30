//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating the schema for the student
var StudentSchema = new Schema({
  fname: String,
  lname: String,
  age: String,
  dob: String,
  address:String,
  city: String,
  state: String,
  zipcode:String,
  phone: String,
  occupation: String,
  highest_education: String,
  salary: String,
  yr_income: String,
  ethnicity: String,
  email : String,
  password : String,
  googleid: String,
  complete: Boolean
},{collection: 'student'});
var Student = mongoose.model('Student',StudentSchema);


//creating the schema for the manager
var ManagerSchema = new Schema({
  fname: String,
  lname: String,
  age: String,
  dob: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  phone: String,
  email : String,
  password : String,
  googleid: String,
  manager: Boolean
},{collection: 'manager'});
var Manager = mongoose.model('Manager',ManagerSchema);

//creating the schema for the provider
var ProviderSchema = new Schema({
  company: String,
  fnmae: String,
  lname: String,
  age: String,
  dob: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  phone: String,
  email : String,
  password : String,
  googleid: String
},{collection: 'provider'});
var Provider = mongoose.model('Provider',ProviderSchema);

module.exports = {
  Student : Student,
  Manager : Manager,
  Provider : Provider
};
