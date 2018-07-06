var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/allegier');
var schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  img: String
});
module.exports = mongoose.model('Product', schema);