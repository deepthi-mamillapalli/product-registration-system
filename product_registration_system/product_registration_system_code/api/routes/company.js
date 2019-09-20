var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Company = require('../models/company');

/* GET ALL CITYS */
router.get('/', function(req, res, next) {
  Company.find(function (err, company) {
    if (err) {
			return next(err);
    }
		res.json({"data":{"company_list":company}});
  });
});

/* GET SINGLE CITY BY ID */
router.get('/:id', function(req, res, next) {
  Company.findById(req.params.id, function (err, company) {
    if (err) {
			return next(err);
    }
		res.json(company);
  });
});

/* NEW CITY */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Company.create(req.body, function (err, company) {
    if (err) {
			return next(err);
    }
    res.json({ status: 'OK', company: company });
  });
});

/* UPDATE CITY */
router.put('/:id', function(req, res, next) {
  Company.findByIdAndUpdate(req.params.id, req.body, function (err, company) {
    if (err) {
			return next(err);
		}
    res.json(company);
  });
});

/* DELETE CITY */
router.delete('/:id', function(req, res, next) {
  Company.findByIdAndRemove(req.params.id, req.body, function (err, company) {
    if (err) {
			return next(err);
    }
		res.json(company);
  });
});

module.exports = router;
