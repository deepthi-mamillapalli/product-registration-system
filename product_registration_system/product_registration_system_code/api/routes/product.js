var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product.js');

/**
 * Code for Image Upload
 */
var multer = require('multer');
var mkdirp = require('mkdirp');
var storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    let originalFileName = (file.originalname).split(".");
    let extention = originalFileName.slice(-1)[0];
    var filename = "File_" + Date.now().toString().substring(0, 11) + "." + extention;
    cb(null, filename);
  }
});

var uploadFile = multer({ storage: storageFile }).single('product_image');


/**
 * Function for Getting all the products
 */
router.get('/', function (req, res, next) {
  console.log("GET - /products");

  return Product.find(function (err, products) {
    if (!err) {
      return res.send({ "product_list": products });
    } else {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    }
  });
});

/* GET SINGLE ROLE BY ID */
router.get('/:id', function (req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) {
      return next(err);
    }
    res.json({ "product_data": product });
  });
});

/* NEW CITY */
router.post('/', function (req, res, next) {
  uploadFile(req, res, function (err, data) {
    if (err) {
      return res.send({ error: 'Server error' + err });
    } else {
      console.log(res.req.file);
      req.body.product_image = res.req.file.filename;
      Product.create(req.body, function (err, product) {
        if (err) {
          return next(err);
        }
        res.json({ status: 'OK', product: product });
      });
    }
  });
});
/**
 * Function for Updating the Product Details 
 */
router.put('/:id', function (req, res, next) {
    uploadFile(req, res, function (err, data) {
      if (err) {
        return res.send({ error: 'Server error' + err });
      } else {
        if(typeof res.req.file != "undefined" && res.req.file) { 
          req.body.product_image = res.req.file.filename;
          console.log(res.req.file.filename);          
        } else {
          req.body.product_image = req.body.product_temp_image;
        }
        console.log(req.body);
        Product.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
          if (err) {
            return next(err);
          }
          res.json(product);
        });
      }
    });
});

/**
 * Function for Updating the Product Details 
 */
/* GET ALL CITYS */
router.post('/login', function (req, res, next) {
  Product.find({
    product_title: req.body.product_title,
    product_model_no: req.body.product_model_no
  }, function (err, product) {
    if (err) {
      return next(err);
    }
    if (Object.keys(product).length == 0) {
      res.status = 404;
      res.json({ status: 404, error: 'Invalid Productname and Password' });
    } else {
      res.json({ "status": 200, "message": "Login Successfully", "product_data": product[0] });
    }
  });
});

/* DELETE CITY */
router.delete('/:id', function (req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, product) {
    if (err) {
      return next(err);
    }
    res.json(product);
  });
});

module.exports = router;
