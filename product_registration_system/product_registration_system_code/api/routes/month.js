var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Month = require('../models/month');

/* GET ALL monthS */
router.get('/', function(req, res, next) {
  Month.find(function (err, month) {
    if (err) {
			return next(err);
    }
		res.json({"data":{"month_list":month}});
  });
});

/* GET SINGLE month BY ID */
router.get('/:id', function(req, res, next) {
  Month.findById(req.params.id, function (err, month) {
    if (err) {
			return next(err);
    }
		res.json(month);
  });
});

/* NEW month */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Month.create(req.body, function (err, month) {
    if (err) {
			return next(err);
    }
    res.json({ status: 'OK', month: month });
  });
});

/* UPDATE month */
router.put('/:id', function(req, res, next) {
  Month.findByIdAndUpdate(req.params.id, req.body, function (err, month) {
    if (err) {
			return next(err);
		}
    res.json(month);
  });
});

/* DELETE month */
router.delete('/:id', function(req, res, next) {
  Month.findByIdAndRemove(req.params.id, req.body, function (err, month) {
    if (err) {
			return next(err);
    }
		res.json(month);
  });
});

module.exports = router;
