var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/home', require('./routes/index'));
app.use('/api/user', require('./routes/users'));
app.use('/api/employees', require('./routes/employees'));

module.exports = app;
