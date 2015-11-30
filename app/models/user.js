// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema 
var userSchema = mongoose.Schema({
        google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});
module.exports = mongoose.model('User', userSchema);