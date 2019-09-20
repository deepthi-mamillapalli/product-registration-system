var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Role = require('../models/role');

/* GET ALL ROLE */
router.get('/', function(req, res, next) {
  Role.find(function (err, role) {
    if (err) {
			return next(err);
    }
    res.json({"data":{"role_list":role}});
  });
});

/* GET SINGLE ROLE BY ID */
router.get('/:id', function(req, res, next) {
  Role.findById(req.params.id, function (err, role) {
    if (err) {
			return next(err);
    }
		res.json(role);
  });
});

/* NEW ROLE */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Role.create(req.body, function (err, role) {
    if (err) {
			return next(err);
    }
    res.json({ status: 'OK', role: role });
    //res.json(role);
  });
});

/* UPDATE ROLE */
router.put('/:id', function(req, res, next) {
  Role.findByIdAndUpdate(req.params.id, req.body, function (err, role) {
    if (err) {
			return next(err);
		}
    res.json(role);
  });
});

/* DELETE ROLE */
router.delete('/:id', function(req, res, next) {
  Role.findByIdAndRemove(req.params.id, req.body, function (err, role) {
    if (err) {
			return next(err);
    }
		res.json(role);
  });
});

module.exports = router;
