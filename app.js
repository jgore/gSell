var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var session = require('express-session')

var products = require('./routes/products');
var index = require('./routes/index');


var app = express();

// view engine setup

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('images', __dirname + '/public/images');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.isAuth = req.session.uid !== undefined;
  next();
});

app.get('/', products.list);
app.post('/', products.submit(app.get('images')));

app.post("/login", index.login);
app.post("/logout", index.logout);

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
