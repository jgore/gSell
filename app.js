var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var jwt = require('jsonwebtoken');
var cors = require('cors')
var router = express.Router();


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
app.use(cors());
app.disable('etag');

app.use((req, res, next) => {
  var token = req.cookies.token;
  if (token) {

    jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
        if (err) {
          res.clearCookie('token');
          return res.status(403).send("cannot parse token");
        }
        req.user_data = token_data;
        next();
      }
    );
  }
  else {
    next();
  }
});

var productRoutes = require('./api/routes/productRoutes'); //importing route
var authRoutes = require('./api/routes/authRoutes'); //importing route
productRoutes(router);
authRoutes(router);

app.use(router);

app.get('/', (req, res) => res.send('Hello World!'));

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
