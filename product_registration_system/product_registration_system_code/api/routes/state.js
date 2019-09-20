var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var State = require('../models/state');

/* GET ALL STATE */
router.get('/', function(req, res, next) {
  State.find(function (err, state) {
    if (err) {
			return next(err);
    }
    res.json({"data":{"state_list":state}});
  });
});

/* GET SINGLE STATE BY ID */
router.get('/:id', function(req, res, next) {
  State.findById(req.params.id, function (err, state) {
    if (err) {
			return next(err);
    }
		res.json(state);
  });
});

/* NEW STATE */
router.post('/', function(req, res, next) {
  console.log(req.body);
  State.create(req.body, function (err, state) {
    if (err) {
			return next(err);
    }
    res.json({ status: 'OK', state: state });
    //res.json(state);
  });
});

/* UPDATE STATE */
router.put('/:id', function(req, res, next) {
  State.findByIdAndUpdate(req.params.id, req.body, function (err, state) {
    if (err) {
			return next(err);
		}
    res.json(state);
  });
});

/* DELETE STATE */
router.delete('/:id', function(req, res, next) {
  State.findByIdAndRemove(req.params.id, req.body, function (err, state) {
    if (err) {
			return next(err);
    }
		res.json(state);
  });
});

module.exports = router;
