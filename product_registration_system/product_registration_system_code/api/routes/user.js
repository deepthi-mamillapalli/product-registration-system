var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

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

var uploadFile = multer({ storage: storageFile }).single('user_image');


/**
 * Function for Getting all the users
 */
router.get('/', function (req, res, next) {
  console.log("GET - /users");

  return User.find(function (err, users) {
    if (!err) {
      return res.send({ "user_list": users });
    } else {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    }
  });
});

/* GET SINGLE ROLE BY ID */
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }
    res.json({ "user_data": user });
  });
});

/* NEW CITY */
router.post('/', function (req, res, next) {
  uploadFile(req, res, function (err, data) {
    if (err) {
      return res.send({ error: 'Server error' + err });
    } else {
      console.log(res.req.file);
      req.body.user_image = res.req.file.filename;
      User.create(req.body, function (err, user) {
        if (err) {
          return next(err);
        }
        res.json({ status: 'OK', user: user });
      });
    }
  });
});
/**
 * Function for Updating the User Details 
 */
router.put('/:id', function (req, res, next) {
    uploadFile(req, res, function (err, data) {
      if (err) {
        return res.send({ error: 'Server error' + err });
      } else {
        if(typeof res.req.file != "undefined" && res.req.file) { 
          req.body.user_image = res.req.file.filename;
          console.log(res.req.file.filename);          
        } else {
          req.body.user_image = req.body.user_temp_image;
        }
        console.log(req.body);
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
          if (err) {
            return next(err);
          }
          res.json(user);
        });
      }
    });
});

/**
 * Function for Updating the User Details 
 */
/* GET ALL CITYS */
router.post('/login', function (req, res, next) {
  User.find({
    user_username: req.body.user_username,
    user_password: req.body.user_password
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (Object.keys(user).length == 0) {
      res.status = 404;
      res.json({ status: 404, error: 'Invalid Username and Password' });
    } else {
      res.json({ "status": 200, "message": "Login Successfully", "user_data": user[0] });
    }
  });
});

/* DELETE CITY */
router.delete('/:id', function (req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
});

module.exports = router;
