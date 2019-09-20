var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Type = require('../models/type');

/* GET ALL ROLE */
router.get('/', function(req, res, next) {
  Type.find(function (err, type) {
    if (err) {
			return next(err);
    }
    res.json({"data":{"type_list":type}});
  });
});

/* GET SINGLE ROLE BY ID */
router.get('/:id', function(req, res, next) {
  Type.findById(req.params.id, function (err, type) {
    if (err) {
			return next(err);
    }
		res.json(type);
  });
});

/* NEW ROLE */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Type.create(req.body, function (err, type) {
    if (err) {
			return next(err);
    }
    res.json({ status: 'OK', type: type });
    //res.json(type);
  });
});

/* UPDATE ROLE */
router.put('/:id', function(req, res, next) {
  Type.findByIdAndUpdate(req.params.id, req.body, function (err, type) {
    if (err) {
			return next(err);
		}
    res.json(type);
  });
});

/* DELETE ROLE */
router.delete('/:id', function(req, res, next) {
  Type.findByIdAndRemove(req.params.id, req.body, function (err, type) {
    if (err) {
			return next(err);
    }
		res.json(type);
  });
});

module.exports = router;
