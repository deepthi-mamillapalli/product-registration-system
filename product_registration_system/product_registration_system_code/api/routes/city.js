var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var City = require('../models/city');

/* GET ALL CITYS */
router.get('/', function(req, res, next) {
  City.find(function (err, city) {
    if (err) {
			return next(err);
    }
		res.json({"data":{"city_list":city}});
  });
});

/* GET SINGLE CITY BY ID */
router.get('/:id', function(req, res, next) {
  City.findById(req.params.id, function (err, city) {
    if (err) {
			return next(err);
    }
		res.json(city);
  });
});

/* NEW CITY */
router.post('/', function(req, res, next) {
  console.log(req.body);
  City.create(req.body, function (err, city) {
    if (err) {
			return next(err);
    }
    res.json({ status: 'OK', city: city });
  });
});

/* UPDATE CITY */
router.put('/:id', function(req, res, next) {
  City.findByIdAndUpdate(req.params.id, req.body, function (err, city) {
    if (err) {
			return next(err);
		}
    res.json(city);
  });
});

/* DELETE CITY */
router.delete('/:id', function(req, res, next) {
  City.findByIdAndRemove(req.params.id, req.body, function (err, city) {
    if (err) {
			return next(err);
    }
		res.json(city);
  });
});

module.exports = router;
