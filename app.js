var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.applymagicsauce.com/like_ids?interpretations=true",
        "method": "POST",
        "headers": {
            "X-Auth-Token": "7nbe03d055jq8pp175b6amgsaa",
            "Content-type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "c84f786f-4009-4aa3-b9ac-d47e05efab98"
        },
        "data": "[\"302383559805193\", \"6049803276\", \"18510635068\", \"47923519017\", \"35649991492\", \"185019191542371\", \"313227042137369\", \"878737018959036\", \"523598997680162\", \"199617896754080\", \"117533210756\", \"112584912087017\", \"98102468683\"]"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        res.send(response);
    });
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
