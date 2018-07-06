var Product = require('../models/product');
var path = require('path');
var join = path.join;

exports.list = function (req, res, next) {
  Product.find({}, function (err, products) {
    if (err) return next(err);
    res.render('index', {
      title: 'Products',
      product: products
    });
  });
};

exports.submit = function (dir) {
  return function (req, res, next) {
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;

    var img = req.files.img;
    var path = join(dir, img.name);
    img.mv(path, function (err) {
      if (err) return next(err);
    });

    Product.create({
      title: title,
      description: description,
      price: price,
      img: img.name
    }, function (err, product) {
      if (err) return next(err);
      if (req.is('application/json')) {
        res.send("product added successfully \n" + product.toString())
      }
      else {
        res.redirect("/")
      }

    });
  }

};