var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const connection = mongoose.connect('mongodb+srv://hackathon:usedcars@cluster0-mjgea.mongodb.net/hackathon?retryWrites=true&w=majority');

// mongoose.connection.on('open', function () {
//   mongoose.connection.db.listCollections().toArray(function (err, names) {
//       console.log("Conected to MongoDB");
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('list of dbs##################',names);
//       }

//       mongoose.connection.close();
//     });
// });

mongoose    
  .connect('mongodb+srv://hackathon:usedcars@cluster0-mjgea.mongodb.net/hackathon?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log("Conected to MongoDB"))
  .catch(err => console.log("Error in connectin to MongoDB"));

// var MyModel = mongoose.model('cars-data');

// MyModel.find({},function(res,err){
//   if(res){
//     console.log('Data from cars-data@@@@@@@###',res);
//   } else{
//     console.log('error in getting data@@@@@@@',err);
//   }
// })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*");
  next();
});

app.use('/api', indexRouter);
app.use('/data', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
