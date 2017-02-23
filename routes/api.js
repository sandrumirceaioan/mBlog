"use strict";
var debug = require('debug')('Javandi:API');
var express = require('express');
var http = require('http');
var router = express.Router();
var users = require('../models/users.js');
var constants = require('../models/const.js');
var sidebar = require('../models/sidebar.js');
var multiparty = require('multiparty');
var async = require('async');
var underscore = require('underscore');
var _ = require('lodash');
var md5 = require('js-md5');

_.mixin({
  compactObject: function(o) {
    _.each(o, function(v, k) {
      if(v === null || v === undefined) {
        delete o[k];
      }
    });
    return o;
  }
});

//----------------------------------------------------------------------------------------------------
// Model Schema Errors
//----------------------------------------------------------------------------------------------------

function parseError(err) {
  var errorString = '';
  if (err.errors) {
    for (var key in err.errors) {
      if (err.errors[key].message) {
        if (err.errors[key].path) {
          errorString += err.errors[key].message.replace('`{PATH}`', err.errors[key].path) + ' ';
        } else {
          errorString += err.errors[key].message + ' ';
        }
      }
    }
    errorString = JSON.stringify(errorString);
  } else {
    errorString = JSON.stringify(err.message);
  }
  return errorString;
}

//-----------------------------------------------------------------------------------------------
// Register user
//-----------------------------------------------------------------------------------------------

router.post('/registerUser', function(req, res){

    users.findOne({"username":req.body.username}).exec(function(err){

        if (err) return res.send('{"success": false, "error":'+ JSON.stringify(err) +'}');

        // create super password
        var key="#sup3rp4ssw0rd!@!";
        var password = req.body.password + key;
        var hash = md5(password);

        // remove null/undefined values
        var savedata = _.compactObject(req.body);
            savedata.password = hash;

        // save user into database
        var user = new users(savedata);
        user.save(function(err, regUser){

            if (err) return res.send('{"success": false, "error": '+ JSON.stringify(err) +'}');

            res.send('{"success": true, "data":' + JSON.stringify(regUser) + '}');

        });

    });

});

//-----------------------------------------------------------------------------------------------
// Login user
//-----------------------------------------------------------------------------------------------

router.post('/login', function(req, res){

    var key="#sup3rp4ssw0rd!@!";
    var hash = md5(req.body.password + key);

    users.findOne({"username":req.body.username, "password":hash}).exec(function(err, oneUser){

        if (err) return res.send('{"success": false, "error":"Login QUERY went wrong!"}');

        if (!oneUser) return res.send('{"success": false, "error":"Wrong username or password!"}');

        return res.send('{"success": true, "data":'+ JSON.stringify(oneUser) +'}');

    });

});

//-----------------------------------------------------------------------------------------------
// Logged user
//-----------------------------------------------------------------------------------------------

router.post('/logged', function(req, res){

    users.findOne({"password":req.body.tkn}).exec(function(err, loggedUser){

        if (err) return res.send('{"success": false, "error":"Login QUERY went wrong!"}');

        if (!loggedUser) return res.send('{"success": false, "error":"Not Logged In!"}');

        return res.send('{"success": true, "data":'+ JSON.stringify(loggedUser) +'}');

    });

});
//-----------------------------------------------------------------------------------------------
// Get all users
//-----------------------------------------------------------------------------------------------

router.get('/getAllUsers', function (req, res) {
  users.find({}, function (err, allUsers) {
    if (err) {
      res.send('{"success": false, "error": ' + parseError(err) + '}');
    } else {
      res.send('{"success":true,"data":' + JSON.stringify(allUsers) + '}');
    }
  });
});

//-----------------------------------------------------------------------------------------------
// Get sidebar items depending on user logged
//-----------------------------------------------------------------------------------------------

router.post('/getItems', function (req, res) {

    var rank = req.body.rank || 3;

  sidebar.find({"itemRank": {$gte: rank}}).sort({itemOrder: 1}).exec(function (err, allItems) {
    if (err) {
      res.send('{"success": false, "error": ' + parseError(err) + '}');
    } else {
      res.send('{"success":true,"data":' + JSON.stringify(allItems) + '}');
    }
  });
});


//-----------------------------------------------------------------------------------------------
// Get constants
//-----------------------------------------------------------------------------------------------

router.post('/getConstants', function (req, res) {
  constants.findOne({}, function (err, allConst) {
    if (err) {
      res.send('{"success": false, "error": ' + parseError(err) + '}');
    } else {
      res.send('{"success":true,"data":' + JSON.stringify(allConst) + '}');
    }
  });
});




















module.exports = router;
