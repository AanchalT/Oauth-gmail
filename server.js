var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'abcdefrgijklmno' }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./app/routes.js')(app, passport); 
app.listen(port);
console.log('The magic happens on port ' + port);
