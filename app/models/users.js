'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var User = new Schema({
    
    local: {
       username: String,
       password : String
    },
   facebook: {
       id: String,
       token: String,
       name: String,
       email: String
   },
   strava: {
       id: String,
       token: String,
       email: String,
       details: Object


    },

   tips: Array,
   descriptions: Array,
   guideCity: String

});



//IN users.js underneath user model
User.pre('save', function(next){
    var user = this;

    //check if password isModified modified, else no need to do anything
    if (!user.isModified('password')) {
      console.log("password not modified")
       return next()
    }
    // OTHERWISE CHANGE PASSWORD
    user.local.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    console.log(user.local.password)
    next()
})





  //METHODS FOR LOCAL SIGNUP
   
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', User);

