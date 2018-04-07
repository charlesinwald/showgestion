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
app.get('/magic`', function (req, res) {
    var request = require("request");

    var options = { method: 'POST',
        url: 'https://api.applymagicsauce.com/like_ids',
        qs: { interpretations: 'true' },
        headers:
            { 'Postman-Token': '5493c7cb-612d-4560-ba88-dea48585aa48',
                'Cache-Control': 'no-cache',
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Auth-Token': '7nbe03d055jq8pp175b6amgsaa' },
        body: '["302383559805193", "6049803276", "18510635068", "47923519017", "35649991492", "185019191542371", "313227042137369", "878737018959036", "523598997680162", "199617896754080", "117533210756", "112584912087017", "98102468683"]' };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.send(body);
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
