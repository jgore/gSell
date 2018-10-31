var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/gSell');
var schema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  price: Number,
  img: String
});
module.exports = mongoose.model('Product', schema);