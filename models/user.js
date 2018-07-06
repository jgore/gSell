var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/allegier');
var schema = new mongoose.Schema({
  username: String,
  password: String,
});

var User = mongoose.model('User', schema);

User.authenticate = function (req,next, cb) {
  User.findOne({username: req.body.username} ).exec( function(err, user){
    if( !user) return next(err);
    if(  user.password === req.body.password ){
      cb(user);
    }
  })
};

module.exports = User;