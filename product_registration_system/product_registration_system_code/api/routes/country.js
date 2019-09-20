var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Country = require('../models/country');

/* GET ALL COUNTRYS */
router.get('/', function(req, res, next) {
  Country.find(function (err, country) {
    if (err) {
			return next(err);
    }
    res.json({"data":{"country_list":country}});
  });
});

/* GET SINGLE COUNTRY BY ID */
router.get('/:id', function(req, res, next) {
  Country.findById(req.params.id, function (err, country) {
    if (err) {
			return next(err);
    }
		res.json(country);
  });
});

/* NEW COUNTRY */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Country.create(req.body, function (err, country) {
    if (err) {
			return next(err);
    }
    res.json({ status: 'OK', country: country });
    //res.json(country);
  });
});

/* UPDATE COUNTRY */
router.put('/:id', function(req, res, next) {
  Country.findByIdAndUpdate(req.params.id, req.body, function (err, country) {
    if (err) {
			return next(err);
		}
    res.json(country);
  });
});

/* DELETE COUNTRY */
router.delete('/:id', function(req, res, next) {
  Country.findByIdAndRemove(req.params.id, req.body, function (err, country) {
    if (err) {
			return next(err);
    }
		res.json(country);
  });
});

module.exports = router;
