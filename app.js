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
app.get('/magic', function (req, res) {
    var http = require("https");
    var options = {
        "method": "POST",
        "hostname": [
            "api",
            "applymagicsauce",
            "com"
        ],
        "path": [
            "like_ids"
        ],
        "headers": {
            "X-Auth-Token": "sn0ed1isvb0768t9u0koh5vm29",
            "Content-type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "66e8d55c-039a-42c0-a39a-f91772c31ebf"
        }
    };
    var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });
    req.write("[\"302383559805193\", \"6049803276\", \"18510635068\", \"47923519017\", \"35649991492\", \"185019191542371\", \"313227042137369\", \"878737018959036\", \"523598997680162\", \"199617896754080\", \"117533210756\", \"112584912087017\", \"98102468683\"]");
    req.end();
    res.send("hi!");
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
