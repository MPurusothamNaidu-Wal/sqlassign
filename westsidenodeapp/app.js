//this line helps us create errors to report to users
var createError = require('http-errors');
//Including express in the application
var express = require('express');

// //we include mongoose in program using require
// const mongoose = require('mongoose');
// //--------------------------mongoose-----------------------//
// //We are defining a connection string to connect to the mongodb
// let mongoConnUrl = 'mongodb://localhost/westsidenode';
// //We are connecting the mongodb
// mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
// //We are getting the connection pointer
// var db = mongoose.connection;
// //We are now adding error event and it will run if there is any error in connecting to mongodb
// db.on('error', function (error) {
//   console.log('unable to connect');
//   console.log(error);
// });
// //We are adding open event and responding in the call back function if connection is successful
// db.on('open', function () {
//   console.log('we are connected to the mongodb server via mongoose');
// });
// //----------------------------mongoose------------------------//
//Including path module
var path = require('path');
//Including cookie parser module to read cookies.
var cookieParser = require('cookie-parser');
//we require a logger called morgan.
var logger = require('morgan');

//Created routes and we have included routes files here.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var forumRouter = require('./routes/forum');
var hobbyRouter = require('./routes/hobby');
var todoRouter = require('./routes/todos');
var twitterRouter = require('./routes/twitter');
var mysqlRoutter = require('./routes/mysql');
var AuthorRouter = require('./routes/author');
var TodosRoutter = require('./routes/todo');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mysql', mysqlRoutter);
app.use('/products', productsRouter);
app.use('/forum', forumRouter);
app.use('/hobby', hobbyRouter);
app.use('/todos', todoRouter);
app.use('/twitter', twitterRouter);

app.use('/todosql', TodosRoutter);
app.use('/authorsql', AuthorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
